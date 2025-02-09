const firebaseConfig = {
    apiKey: "AIzaSyBnpuJ2R5AyBE4rHatTKKwwHcc9Y2u1Ato",
    authDomain: "bus-tracking-701391.firebaseapp.com",
    projectId: "bus-tracking-701391",
    storageBucket: "bus-tracking-701391.firebasestorage.app",
    messagingSenderId: "857597036355",
    appId: "1:857597036355:web:4bc90621309e63416791f6",
    measurementId: "G-MMFCGR0LXC"
  };

// ✅ Initialize Firebase (Only If Not Already Initialized)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ✅ Initialize Firestore Database
const db = firebase.firestore();

let map;
let marker;

// ✅ Function to Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 17.3850, lng: 78.4867 }, // Default to Hyderabad
        zoom: 12
    });

    marker = new google.maps.Marker({
        position: { lat: 17.3850, lng: 78.4867 },
        map: map,
        title: "Bus Location"
    });
}

// ✅ Function to Track Bus Location
function trackBus() {
    const busNumber = document.getElementById("busNumber").value;

    if (!busNumber) {
        alert("❌ Please enter a bus number!");
        return;
    }

    const busRef = db.collection("buses").doc(busNumber);

    busRef.onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const lat = data.lat;
            const lng = data.lng;

            if (marker) {
                marker.setPosition({ lat: lat, lng: lng }); // ✅ Correct way to update marker
                map.setCenter({ lat: lat, lng: lng });
            } else {
                console.error("❌ Marker not initialized yet!");
            }

            console.log(`📍 Bus ${busNumber} Location Updated: (${lat}, ${lng})`);
        } else {
            alert("❌ No bus found with this number!");
        }
    });
}
