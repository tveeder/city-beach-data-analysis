// Function to determine marker size based on initialsize.  size corresponds to radius.  
function markerSize(initialsize) {
    return initialsize / 4000;
}

// An array containing all of the information needed to create beach markers
var locations = [{
        coordinates: [41.8935, -87.6129],
        beach: {
            name: "Ohio",
            initialsize: 15000,
            turbidity: 600000,
            temperature: 201000,
            waves: 150000,
            E_coli: 141000,
        },
    },

    {
        coordinates: [41.9663, -87.6372],
        beach: {
            name: "Montrose",
            initialsize: 15000,
            turbidity: 400000,
            temperature: 181000,
            waves: 200000,
            E_coli: 159000

        },

    },

    {
        coordinates: [41.7144, -87.5283],
        beach: {
            name: "Calumet Beach",
            initialsize: 15000,
            turbidity: 300000,
            temperature: 182000,
            waves: 150000,
            E_coli: 103000
        },

    },

    {
        coordinates: [41.986186, -87.651997],
        beach: {
            name: "Osterman",
            initialsize: 15000,
            turbidity: 800000,
            temperature: 183000,
            waves: 170000,
            E_coli: 158000
        },

    },

    {
        coordinates: [41.83946, -87.60622],
        beach: {
            name: "Margaret Burroughs",
            initialsize: 15000,
            turbidity: 200000,
            temperature: 202000,
            waves: 120000,
            E_coli: 230000
        },

    }
];

// Define arrays to hold created city and beach markers
var turbidityMarkers = [];
var waveMarkers = [];
var tempMarkers = [];
var E_coliMarkers = [];


for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the beach by passing initialsize into the markerSize function
    turbidityMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: true,
            fillOpacity: 0.75,
            color: "grey",
            fillColor: "grey",
            radius: markerSize(locations[i].beach.turbidity)
        })
    );
    tempMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: true,
            fillOpacity: 0.75,
            color: "yellow",
            fillColor: "yellow",
            radius: markerSize(locations[i].beach.temperature)
        })
    );
    E_coliMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: true,
            fillOpacity: 0.75,
            color: "red",
            fillColor: "red",
            radius: markerSize(locations[i].beach.E_coli)
        })
    );

    waveMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: true,
            fillOpacity: 0.75,
            color: "blue",
            fillColor: "blue",
            radius: markerSize(locations[i].beach.waves)
        })
    );
}

// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
});

// Create separate layer groups: turbidity,waves,temperature,E_coli
var turbidity = L.layerGroup(turbidityMarkers);
var waves = L.layerGroup(waveMarkers);
var temperature = L.layerGroup(tempMarkers);
var E_coli = L.layerGroup(E_coliMarkers);

// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
    "Turbidity": turbidity,
    "Wave Height": waves,
    "Temperature": temperature,
    "E_coli": E_coli
};

// Define a map object
var myMap = L.map("map", {
    center: [41.8781, -87.6298], //chicago coordinates
    zoom: 15,
    layers: [turbidity, waves, temperature, E_coli]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);