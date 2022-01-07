import React, { useEffect, useState, useRef } from "react";
import { getUsers, getAreas } from "../../services";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Tooltip from "../Tooltip";
import Legend from "../Legend";

import "./style.css";

mapboxgl.accessToken = `pk.eyJ1IjoiYmFnYXZhdGgtc3VidSIsImEiOiJja3kzNGs3ZHkwbjhwMnVsancxcnIwMHhxIn0.HJQQFOMGYLa4sXVWWnIRbA`;
function Map({ source, legendData }) {
  const mapContainer = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const map = useRef(null);

  const [lng, setLng] = useState(77.6);
  const [lat, setLat] = useState(13.0);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // Add a data source containing GeoJSON data.

      map.current.addSource("kyupid", {
        type: "geojson",
        data: source,
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "kyupid",
        type: "fill",
        source: "kyupid", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      });

      // Add a black outline around the polygon.
      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "kyupid",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });

      map.current.setPaintProperty("kyupid", "fill-color", {
        property: legendData.property,
        stops: legendData.stops,
      });
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.current.on("mouseenter", (e) => {
      if (e.features.length) {
        map.current.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.current.on("mouseleave", () => {
      map.current.getCanvas().style.cursor = "";
    });

    // add tooltip when users mouse move over a point
    map.current.on("mousemove", (e) => {
      const features = map.current.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];
        if (feature.source !== "kyupid") return;

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map.current);
      }
    });

    return () => map.current.remove();
  }, []);

  return (
    <div className="map">
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
