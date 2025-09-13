// map.js
function initMap(lat, lon, locationName) {
    // Initialize map
    var map = L.map('map').setView([lat, lon], 12);

    // Add OSM tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add marker
    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>${locationName}</b><br>This is the exact location<br>`)
      .openPopup();
}
