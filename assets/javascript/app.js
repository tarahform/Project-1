// connect to Charity API //
function charityAPI() {

    var API_KEY = "aca9cc829aaa6b9d9b3fd4f972f5acf0"; // Andrews Key //
    var EIN /* = insert userinput here*/;
    var queryURL = "http://data.orghunter.com/v1/charitybasic?user_key=" + API_KEY + "&ein=" + EIN;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#").text(JSON.stringify(response));
        renderButtons();
    });
}
// end of API //
// -------------//


// connect to HERE API //
var platform = new H.service.Platform({
    app_id: "neyYi3GisiDC0ArbzBzM",
    app_code: "tsCL6k0QbcmLexowXF3zzw",
});

var maptypes = platform.createDefaultLayers(); // Obtain the default map types from the platform object //

var map = new H.Map( // Instantiate (and display) a map object: //
    document.getElementById('mapContainer'),
    maptypes.normal.map, {
        zoom: 10,
        center: { lng: 13.4, lat: 52.51 }
    });
// end of API //
// -------------//


// connect to FireBase//
var config = {
    apiKey: "AIzaSyDw2fGubKChCX3algyFvj918R6YxYsd6KU",
    authDomain: "succor-ecff7.firebaseapp.com",
    databaseURL: "https://succor-ecff7.firebaseio.com",
    projectId: "succor-ecff7",
    storageBucket: "succor-ecff7.appspot.com",
    messagingSenderId: "721484511221"
};
firebase.initializeApp(config);
// end of FireBase //
// -------------//


// Global Variables //

//End of GLobal Variables //
// -------------//


// Functionality //

// End of Functionality //
// -------------//

