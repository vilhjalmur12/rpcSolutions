var setMarker;
    
mapboxgl.accessToken = 'pk.eyJ1IjoidmlsbGkiLCJhIjoiY2lpb3h1c24yMDFoYnRya24xNmU4bjMyMCJ9.E-HMCovFdMRW8jioK56Rrg';
          
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/villi/cj362gtcj00032rmycedy63qi', //hosted style id
    center: [-21.860, 64.131], // starting position
    zoom: 10 // starting zoom
});
      
// addar locate user button
map.addControl(new mapboxgl.GeolocateControl());
     
/******       Map on load function     ******/

// On load: þegar map loadar þá gerist eitthvað
map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("markers", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "geojson/features.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    //cluster iconið (hringur)
    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "markers",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, "#51bbd6"],
                    [100, "#f1f075"],
                    [750, "#f28cb1"],
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
                ]
            }
        }
    });
        
    // Texti eða annað inní clustera
    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "markers",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });
        
    markers.features.forEach(function(feature) {
        var symbol = feature.properties['icon'];
        var layerID = symbol + '-15';
            
        // if(!map.getLayer(layerID)) {
        map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "markers",
            filter: ["!has", "point_count"],
            "layout": {
                "icon-image": symbol + "-15",
                "icon-allow-overlap": true,
            }
        });
        //}
    });
        
    /*
    map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "markers",
        filter: ["!has", "point_count"],
        "layout": {
            "icon-image": "{bar}-15",
            "icon-allow-overlap": true,
            "icon-size": 1.5,
        }
        */
});
        
/******       Clusters END    ******/
        
// Pop up info
map.on('click', 'unclustered-point', function(e) {
    new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(
            "<h1 class='bar-popup-name'>"
            + e.features[0].properties.name 
            + "</h1>")
        .addTo(map);
            
    console.log(e.features[0]);
            
});
        
map.on('mouseenter', 'unclustered-point', function(e) {
    map.getCanvas().style.cursor = 'pointer'; 
});
        
map.on('mouseleave', 'unclustered-point', function(e) {
    map.getCanvas().style.cursor = ''; 
});
});
/******       On load END    ******/