// AOS //
AOS.init();
// end of AOS //
// -------------//

// helps the charity API//
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
// helps the charity API//

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

    // console.log(einModal.value)
}
// // // end of API //
// // // -------------//


// // connect to Charity API ----- For Donors//
function searchCharityAPI() {

    var API_KEY = "aca9cc829aaa6b9d9b3fd4f972f5acf0"; // Andrews Key //
    var donorSearch = $("#categoryInput").val().trim();
    var queryURL = "http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&rows=10&searchTerm=" + donorSearch;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#categoryInput").text(JSON.stringify(response));
        renderButtons(response.data);
    });
    // console.log(categoryInput.value)
} // end of API //
$("#charityTable").hide();
function renderButtons(charityList) {
    $("#charityList").empty();
    for (var i = 0; i < charityList.length; i++) {
        var charity = charityList[i];

        $("#charityTable").show();
        var row = "<tr><td>" + charity.category + "<td><a href='" + charity.url + "'>" + charity.charityName + "</a></td></tr>";
        $("#charityList").append(row);
    }
}
// // // -------------//

// // connect to Charity API ----- For Donors Search location//
function locationCharityAPI(lat, lng) {
    // console.log('AUTO CHARITIY RUNNING')
    // console.log('Lat and Lng is: ' + lat + ', ' + lng)

    var API_KEY = "aca9cc829aaa6b9d9b3fd4f972f5acf0"; // Andrews Key //
    var queryURL = "http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&rows=10&latitude=" + lat + "&longitude=" + lng;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#categoryInput").text(JSON.stringify(response));
        renderButtons(response.data);
    });
    // console.log(categoryInput.value)
} // end of API //

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
            // console.log("POSITION: " + JSON.stringify(position));
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            locationCharityAPI(pos.lat, pos.lng)
            // console.log('POS: ' + JSON.stringify(pos));

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
}; // end of map on page //
// // -------------//


// Functionality //
$(document).ready(function () {
    // ------sign up modal //
    var loggedIn = false;
    var modal = document.getElementById("signUpModal");

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("signed in: " + user.email);
            loggedIn = true;
            // User is signed in.
        } else {
            // No user is signed in.
            console.log("User has been signed out")
            loggedIn = false;
        }
    });
    $("#signUpBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("Clicked");
        var user = firebase.auth().currentUser;
        if (loggedIn === true) {
            logout();
        } else {
            $("#signUpModal").modal("show");
        }
    }); //end of modal -- beginning on submit click function //

    $("#signInSubmitBtn").on("click", function (event) {
        event.preventDefault()
        // console.log("SignUpSubmitBtn clicked")
        signin();

    })
    function signin() {
        var emailInput = $("#emailInputModal").val().trim();
        var passwordInput = $("#passwordInputModal").val().trim();
        console.log("Before signin", emailInput);
        firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput)
            .then(function (user) {
                $("#signUpModal").modal("toggle");
                console.log(user);
                $("#loginLogout").text("Welcome");
                $("#loginLogoutMessage").text(emailInput);
                $("#signUpBtn").text("Sign Out");
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                // console.log("error: " + errorMessage);
            });
    }
    function logout() {
        firebase.auth().signOut().then(function () {
            $("#loginLogout").text("Login")

        }).catch(function (error) {

        });
    }
});
// end of submit click btn //



// ------search modal //
$("#searchBtn").on("click", function (event) {
    event.preventDefault()
    // console.log("Clicked");
    $("#searchModal").modal("show");
    var modal = document.getElementById("searchModal");
    var btn = document.getElementById("searchBtn");

    btn.onclick = function () {
        modal.style.display = "block";
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
    // database.ref().push(searchInput);
    $("#searchModal").modal("toggle");
    searchCharityAPI()
}); // end of submit click btn //



    // End of Functionality //
    // -------------//