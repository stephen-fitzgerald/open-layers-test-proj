// import './style.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 3
//   })
// });

//@ts-check-off
import './style.css';

// import Overlay from 'ol/Overlay';
// import TileJSON from 'ol/source/TileJSON';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import { Icon, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from "ol/proj";

let currentLocation = fromLonLat([-64.0556, 44.63]);
let currentZoom = 12;

let theView = new View({
  //  projection: 'EPSG:4326',
  center: currentLocation,
  zoom: currentZoom,
});

const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});

const osmLayer = new TileLayer({
  className: 'bw',
  source: new OSM()
});

const iconFeature = new Feature({
  geometry: new Point(currentLocation),
  name: 'Null Island',
  population: 4000,
  rainfall: 500,
});

const icon = new Icon({
  anchor: [0.5, 0],
  anchorXUnits: 'fraction',
  anchorYUnits: 'pixels',
  src: 'data/icon.png',
  scale: [0.1, 0.1],
  rotation: 292 * Math.PI/180,
});

const iconStyle = new Style({
  image: icon,
});

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// const vectorLayer = new VectorLayer({
//   background: '#1a2b39',
//   opacity: 0.2,
//   source: new VectorSource({
//     url: 'https://openlayers.org/data/vector/ecoregions.json',
//     format: new GeoJSON(),
//   }),
//   style: function (feature) {
//     const color = feature.get('COLOR') || '#eeeeee';
//     style.getFill().setColor(color);
//     return style;
//   },
// });

const map = new Map({
  layers: [osmLayer, vectorLayer],
  target: 'map',
  view: theView,
});

let currZoom = map.getView().getZoom();
console.log('zoom = ' + currZoom );
map.on('moveend', function(e) {
  var newZoom = map.getView().getZoom();
  if (currZoom != newZoom) {
    console.log('zoom end, new zoom: ' + newZoom);
    currZoom = newZoom;
  }
});

// const featureOverlay = new VectorLayer({
//   source: new VectorSource(),
//   map: map,
//   style: new Style({
//     stroke: new Stroke({
//       color: 'rgba(255, 255, 255, 0.7)',
//       width: 2,
//     }),
//   }),
// });

// let highlight;
// const displayFeatureInfo = function (pixel) {
//   const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
//     return feature;
//   });

//   const info = document.getElementById('info');
//   if (feature) {
//     info.innerHTML = feature.get('ECO_NAME') || '&nbsp;';
//   } else {
//     info.innerHTML = '&nbsp;';
//   }

//   if (feature !== highlight) {
//     if (highlight) {
//       featureOverlay.getSource().removeFeature(highlight);
//     }
//     if (feature) {
//       featureOverlay.getSource().addFeature(feature);
//     }
//     highlight = feature;
//   }
// };

// map.on('pointermove', function (evt) {
//   if (evt.dragging) {
//     return;
//   }
//   const pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });

// map.on('click', function (evt) {
//   displayFeatureInfo(evt.pixel);
// });