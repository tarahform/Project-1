// AOS //
AOS.init();
// end of AOS //
// -------------//

// // connect to FireBase//
var config = {
    apiKey: "AIzaSyDw2fGubKChCX3algyFvj918R6YxYsd6KU",
    authDomain: "succor-ecff7.firebaseapp.com",
    databaseURL: "https://succor-ecff7.firebaseio.com",
    projectId: "succor-ecff7",
    storageBucket: "succor-ecff7.appspot.com",
    messagingSenderId: "721484511221"
};
firebase.initializeApp(config);
var database = firebase.database();
// end of FireBase //
// -------------//


// // connect to Charity API //
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
// // // end of API //
// // // -------------//


// Put map on page //
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.5, lng: -98.35 },
        zoom: 3
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};
// end of map on page //
// // -------------//


$(document).ready(function () {
    // Functionality //

    // ------modal //
    $("#signUpBtn").on("click", function () {
        // console.log("Clicked");
        $("#modal").modal("show");
        var modal = document.getElementById("modal");
        var btn = document.getElementById("submitbtn");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function () {
            modal.style.display = "block";
        }

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    });
    // -------end of modal//


    // End of Functionality //
    // -------------//
});