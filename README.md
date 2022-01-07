# Front End Engineer - Hiring Task

**Kyupid** is a new dating app/service based on Bangalore. The app matches the users based on their gender with other users from the nearest area and has users across Bangalore in a wide demographic. The company has shared the data with us to understand their users better and gain insights. Given the sample GeoJSON file containing the area boundary of Bangalore city via our API. Use our APIs which provides Data of the users within Bangalore for **Kyupid**. Create a web application which can help the Kyupid team to better understand their business by plotting this data in a meaningful way on a map by matching the user location to areas in Bangalore.

Your Application should be able to visualize these queries.

- Revenue per area (users who have opted in/paid for Pro features)
- Number of users per area
- Males/Female user Ratio
- Bonus if you could answer any other relevant questions that you can think about based on the data provided.

### API Details

```jsx
API_URL: https://kyupid-api.vercel.app/api
```

The sample GeoJSON data for areas in Bangalore

```jsx
ENDPOINT: /areas
METHOD: GET
```

```jsx
{
    "type": "FeatureCollection",
    "features": [
        ...
        {
            "type": "Feature",
            "properties": {
                "area_id": 124,
                "name": "Koramangala",
		   "pincode": 12345
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [] // coordinates for the polygon
            }
        }
        ...
    ]
}
```

Sample API response for the users

```jsx
ENDPOINT: /users
METHOD: GET
```

```jsx
{
    "users": [
        {
            "user_id": 1,
            "area_id": 124, // represents the area user belongs to
            "age": 23,
            "gender": M, // M -> Male, F -> Female
            "is_pro_user": true,
            "total_matches": 5,
        }
    ]
}
```

Technical details

- Create tooltips/popups on hover to display any relevant data on the map
- Color Code the areas based on the data/metric you are displaying
- Show any important information or details of the given data

## Helpful Links

- Learn more about [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format
- [Mapbox Maps](https://mapbox.com) or [LeafletJS](https://leafletjs.com/) for rendering maps
- Visualizing GeoJson data in [Leaflet](https://leafletjs.com/examples/geojson/) or [Mapbpx](https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/)
- You can use any of your favorite visualization library to visualize the data on the map

## Brownie Points for

- Good UI and UX
- Alalytical insights
- Actionability and understandability of the dashboard for any users

## How to submit

There are no limitations on which web framework or library you can use to work on this project. You can create a GitHub Repository and Push your code, deploy the project to any static hosting services like [vercel](https://vercel.com) or [Netlify](https://netlify.com). Reply to your onboarding/task email with the deployment link and your repository link. We would highly recommend you to make sure the code/project you share is working and able to run with a minimal effort.

Ps: DONOT SUBMIT YOUR PROJECTS HERE IN THE COMMENTS
