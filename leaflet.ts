// Creation of geometrical shape on leaflet map by Leonardo Scrivere ** https://github.com/scrivereleonardo **

// Add to Style.css
@import "~leaflet/dist/leaflet.css";
@import "~leaflet-draw/dist/leaflet.draw.css";

// General Import in Controller
import * as leaflet from 'leaflet'
import 'leaflet-draw'

// Declarations variables
initMap(){

    // Init Map config
    this.drawnItems = new L.FeatureGroup();  // Crea un un contenitore
    this.map.addLayer(this.drawnItems) // Aggiungilo alla mappa
    this.drawControl = new leaflet.Control.Draw({ // Inizializza il controllo di disegno e le impostazioni
        draw: {
            rectangle: false,
            marker: false,
            circlemarker: false,
            polyline: false,
            polygon: {
                allowIntersection: false,
                shapeOptions: {
                    color: "#145DA0",
                    fillOpacity: 0.1,
                }
            },
            circle: {
                shapeOptions: {
                    color: "#145DA0",
                    fillOpacity: 0.1,
                }
            }
        },
        edit: {
            featureGroup: this.drawnItems
        }
    })

    this.map.addControl(this.drawControl); // Aggiungi Controllo alla mappa

    this.map.on(L.Draw.Event.CREATED, (e: any) => { // Esegui appena riceve l'evento di creazione sulla mappa

        this.drawingLayer = e.layer
        let layer = e.layer;

        this.drawnItems.addLayer(this.drawingLayer); // Il layer che hai appena creato aggiungilo al gruppo di disegni creato all' inizio

        // VVV Limiting Draw a single Shape Once
        if (Object.keys(this.drawnItems._layers).length > 1) {
            //Entra dentro l'oggetto e cicla il piccolo array rimuovendo sempre l'ultimo che hai creato
            Object.keys(this.drawnItems._layers).forEach((layerid, index) => {
                if (index > 0) return;
                const layer = this.drawnItems._layers[layerid];
                this.drawnItems.removeLayer(layer);
            })
        }
        // ^^^ Limiting Draw a single Shape Once

        console.log(this.drawnItems);

    });
}