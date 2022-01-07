import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import { getUsers, getAreas } from "./services";
import Skeleton from "react-loading-skeleton";
import Card from "./components/Card";
import CardGroup from "./components/CardGroup";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import Legend from "./components/Legend";

function App() {
  const [mapData, setMapData] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers().then(({ users }) => {
      getAreas().then((areas) => {
        areas.features = areas?.features?.map((feature) => {
          const areaUsers = users.filter(
            (user) => user.area_id === feature.properties.area_id
          );

          const maleUsers = areaUsers.filter((user) => user.gender === "M");
          const femaleUsers = areaUsers.filter((user) => user.gender !== "M");
          const genderRatio = maleUsers.length + " : " + femaleUsers.length;

          const revenueUsers = areaUsers.filter((user) => user.is_pro_user);

          feature.properties = {
            ...feature.properties,
            totalUsers: areaUsers.length,
            revenue: revenueUsers.length,
            genderRatio,
          };
          return feature;
        });
        setMapData(areas);
      });
      setUsers({
        totalUsers: users?.length,
        totalMaleUsers: users?.filter((user) => user.gender === "M").length,
        totalFemaleUsers: users?.filter((user) => user.gender !== "M").length,
        totalRevenueUsers: users?.filter((user) => user.is_pro_user).length,
      });
    });
  }, []);

  const legendData = {
    name: "KYUPID Population",
    description: "Estimated kyupid users",
    property: "totalUsers",
    stops: [
      [0, "#f8d5cc"],
      [25, "#f4bfb6"],
      [50, "#f1a8a5"],
      [75, "#f1a8a5"],
      [100, "#ee8f9a"],
      [125, "#ec739b"],
      [150, "#ec739b"],
      [175, "#ec739b"],
      [200, "#dd5ca8"],
      [225, "#dd5ca8"],
      [250, "#c44cc0"],
      [275, "#dd5ca8"],
      [300, "#9f43d7"],
    ],
  };

  return (
    <div className="App">
      <CardGroup>
        <CardGroup column={true} spaceBetween={true}>
          <h1 className="text-center">Overview</h1>

          <CardGroup>
            <Card title="No of Users" value={users?.totalUsers} />
            <Card title="Total Male" value={users?.totalMaleUsers} />
          </CardGroup>
          <CardGroup>
            <Card title="Total Female" value={users?.totalFemaleUsers} />
            <Card
              title="Total Revenue Users"
              value={users?.totalRevenueUsers}
            />
          </CardGroup>
          <Legend data={legendData} stops={legendData.stops} />
        </CardGroup>
        <Card fluid={true}>
          {mapData ? (
            <Map source={mapData} legendData={legendData} />
          ) : (
            <Skeleton height="90vh" />
          )}
        </Card>
      </CardGroup>
    </div>
  );
}

export default App;
