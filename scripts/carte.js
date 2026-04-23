// Initialisation de la carte
const map = L.map('map').setView([46.603354, 1.888334], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Données initiales (ou chargées depuis un fichier JSON)
let destinations = [
    { id: 1, name: "Paris", lat: 48.8566, lng: 2.3522, activities: ["Visite culturelle", "Shopping"] },
    { id: 2, name: "Lyon", lat: 45.7640, lng: 4.8357, activities: ["Gastronomie", "Balade en ville"] }
];

// Variables globales
let currentDestinationId = null;
let markers = {};

// Fonction pour afficher les destinations dans la liste
function renderDestinationList() {
    const listElement = document.getElementById('destination-list');
    listElement.innerHTML = '';
    destinations.forEach(dest => {
        const item = document.createElement('div');
        item.className = 'destination-item';
        item.textContent = dest.name;
        item.onclick = () => loadDestination(dest.id);
        listElement.appendChild(item);
    });
}

// Fonction pour charger une destination dans le formulaire
function loadDestination(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;

    currentDestinationId = id;
    document.getElementById('destination-name').value = dest.name;
    document.getElementById('destination-lat').value = dest.lat;
    document.getElementById('destination-lng').value = dest.lng;

    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = '';
    dest.activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
            <span>${activity}</span>
            <button onclick="removeActivity('${activity}')">×</button>
        `;
        activitiesList.appendChild(activityElement);
    });

    // Centrer la carte sur la destination
    map.setView([dest.lat, dest.lng], 10);
}

// Fonction pour ajouter une activité
document.getElementById('add-activity').onclick = () => {
    const activityInput = document.getElementById('activity-input');
    const activity = activityInput.value.trim();
    if (!activity) return;

    const activitiesList = document.getElementById('activities-list');
    const activityElement = document.createElement('div');
    activityElement.className = 'activity-item';
    activityElement.innerHTML = `
        <span>${activity}</span>
        <button onclick="removeActivity('${activity}')">×</button>
    `;
    activitiesList.appendChild(activityElement);
    activityInput.value = '';
};

// Fonction pour supprimer une activité
function removeActivity(activity) {
    const activitiesList = document.getElementById('activities-list');
    const items = activitiesList.querySelectorAll('.activity-item');
    items.forEach(item => {
        if (item.querySelector('span').textContent === activity) {
            item.remove();
        }
    });
}

// Fonction pour enregistrer une destination
document.getElementById('save-destination').onclick = () => {
    const name = document.getElementById('destination-name').value.trim();
    const lat = parseFloat(document.getElementById('destination-lat').value.trim());
    const lng = parseFloat(document.getElementById('destination-lng').value.trim());
    const activitiesList = document.getElementById('activities-list');
    const activities = Array.from(activitiesList.querySelectorAll('span')).map(span => span.textContent);

    if (!name || isNaN(lat) || isNaN(lng)) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const newDestination = { name, lat, lng, activities };

    if (currentDestinationId !== null) {
        // Mise à jour d'une destination existante
        const index = destinations.findIndex(d => d.id === currentDestinationId);
        destinations[index] = { id: currentDestinationId, ...newDestination };
    } else {
        // Ajout d'une nouvelle destination
        const newId = destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1;
        destinations.push({ id: newId, ...newDestination });
    }

    // Mettre à jour la carte et la liste
    updateMap();
    renderDestinationList();
    resetForm();
};

// Fonction pour mettre à jour la carte avec les marqueurs
function updateMap() {
    // Supprimer les anciens marqueurs
    Object.values(markers).forEach(marker => map.removeLayer(marker));
    markers = {};

    // Ajouter les nouveaux marqueurs
    destinations.forEach(dest => {
        const marker = L.marker([dest.lat, dest.lng]).addTo(map);
        marker.bindPopup(`<b>${dest.name}</b><br>Activités : ${dest.activities.join(', ')}`);
        markers[dest.id] = marker;
    });
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('destination-name').value = '';
    document.getElementById('destination-lat').value = '';
    document.getElementById('destination-lng').value = '';
    document.getElementById('activities-list').innerHTML = '';
    currentDestinationId = null;
}

// Initialisation
renderDestinationList();
updateMap();
