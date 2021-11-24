import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as L from "leaflet";

import mapImg from "../assets/img/clamswap_navigation_map_tr.png";
import { HOME_ICONS } from "../constants/ui";

// Main Map Component
const Map = (props) => {
  const mapRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    addLeafletMap(mapRef.current, history);
  });

  const mapStyles = {
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "transparent", // '#3a4964'
  };

  return <div className="map" style={mapStyles} ref={mapRef}></div>;
};

// to convert image coordinates to lng lat
const yx = L.latLng;
const getLngLat = (x, y) => {
  // When doing getLngLat([x, y]);
  if (L.Util.isArray(x)) {
    return yx(x[1], x[0]);
  }
  // When doing getLngLat(x, y);
  return yx(y, x);
};

// Function addLeafletMap adds the map with the clickable icons
const addLeafletMap = (mapContainer, history) => {
  // clear leaflet map if it already exists
  const container = L.DomUtil.get(mapContainer);
  if (container != null) {
    container._leaflet_id = null;
  }

  // initialize the leaflet map
  const map = L.map(mapContainer, {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 2,
    zoomControl: false,
  });
  // map.dragging.disable();
  map.setView([560, 960]);

  // add the image and bounds
  const bounds = [
    [0, 0],
    [1080, 1920],
  ];
  const image = L.imageOverlay(mapImg, bounds).addTo(map);
  map.fitBounds(bounds);

  // Navigation Icon dimensions
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [100, 100],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    },
  });

  // add the navigation icons
  HOME_ICONS.forEach((k) => {
    const icon = new LeafIcon({
      iconUrl: require(`../assets/img/${k.src}`).default,
    });
    const marker = L.marker(getLngLat(k.location), { icon }).addTo(map);
    marker.addEventListener("click", () => history.push(k.url));
  });
};

export default Map;
