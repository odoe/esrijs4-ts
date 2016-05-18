import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Map from 'esri/Map';
import * as MapView from 'esri/views/MapView';
import * as VectorTileLayer from 'esri/layers/VectorTileLayer';
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
  zoom: 10,
  ui: {
    components: [
      "zoom",
      "attribution",
      "compass"
    ]
  }
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


