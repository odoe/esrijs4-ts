import React = require('react');
import ReactDOM = require('react-dom');
import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import VectorTileLayer = require('esri/layers/VectorTileLayer');
// react component
import Recenter from './components/Recenter';

const map = new Map();

const tileLyr = new VectorTileLayer({
  url: "https://www.arcgis.com/sharing/rest/content/items/f96366254a564adda1dc468b447ed956/resources/styles/root.json"
});
map.add(tileLyr);

const view = new MapView({
  container: 'viewDiv',
  map,
  center: [-100.33, 25.69],
  zoom: 10
});

view.then(() => {
  ReactDOM.render(
    <div>
      <Recenter view={view} initialCenter={[-100.33, 25.69]} />
    </div>,
    document.getElementById('appDiv')
  );
}, (err: Error) => {
  console.warn('Error: ', err);
});


