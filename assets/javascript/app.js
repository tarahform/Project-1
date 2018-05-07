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


// // connect to Charity API ----- For Charity//
function signupCharityAPI() {

    var API_KEY = "aca9cc829aaa6b9d9b3fd4f972f5acf0"; // Andrews Key //
    var EIN = document.getElementById('einModal'.value); // $("#einModal").val().trim();
    var queryURL = "http://data.orghunter.com/v1/charitybasic?user_key=" + API_KEY + "&ein=" + EIN;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#einModal").text(JSON.stringify(response));
        renderButtons();
    });

    console.log(einModal.value)
}
// // // end of API //
// // // -------------//


// // connect to Charity API ----- For Donors//
function searchCharityAPI() {

    var API_KEY = "aca9cc829aaa6b9d9b3fd4f972f5acf0"; // Andrews Key //
    var donorSearch = $("#categoryInput").val().trim();;
    var queryURL = "http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&searchTerm=" + donorSearch;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#categoryInput").text(JSON.stringify(response));
        renderButtons();
    });
    console.log(categoryInput.value)
}
// // // end of API //
// // // -------------//


// Put map on page //
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.5, lng: -98.35 },
        zoom: 8
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

    // ------sign up modal //
    $("#signUpBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("Clicked");
        $("#signUpModal").modal("show");
        var modal = document.getElementById("signUpModal");
        var btn = document.getElementById("signUpBtn");
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
    }); //end of modal -- beginning on submit click function //
    $("#signUpSubmitBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("SignUpSubmitBtn clicked")

        var firstNameInput = $("#firstNameModal").val().trim();
        var lastNameInput = $("#lastNameModal").val().trim();
        var emailInput = $("#emailInputModal").val().trim();
        var einInput = $("#einModal").val().trim();

        var newUser = {
            first: firstNameInput,
            last: lastNameInput,
            email: emailInput,
            ein: einInput
        }
        // console.log(newUser);
        database.ref().push(newUser);
        $("#signUpModal").modal("toggle");
    });
    // end of submit click btn //



    // ------search modal //
    $("#searchBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("Clicked");
        $("#searchModal").modal("show");
        var modal = document.getElementById("searchModal");
        var btn = document.getElementById("searchBtn");
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
    }); //end of modal -- beginning on submit click function //
    $("#searchSubmitBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("searchSubmitBtn clicked")
        var searchInput = $("#categoryInput").val().trim();
        // console.log(searchInput.value)
        database.ref().push(searchInput);
        $("#searchModal").modal("toggle");
    });
    // end of submit click btn //


    // End of Functionality //
    // -------------//
});