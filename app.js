/*Modal Toggle Logic
function toggleModal() {
    const modal = document.getElementById('helpModal');
    const isVisible = modal.style.display === 'block';
    modal.style.display = isVisible ? 'none' : 'block';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('helpModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Simple Search Filter
document.getElementById('searchBox').addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.species-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});*/
const grid = document.getElementById('speciesGrid');
const searchBox = document.getElementById('searchBox');

// GBIF API URL: India ke endangered mammals fetch karne ke liye
const GBIF_API_URL = "https://api.gbif.org/v1/occurrence/search?country=IN&threatStatus=CR&threatStatus=EN&limit=12";

async function fetchWildlifeData() {
    try {
        grid.innerHTML = "<p>Loading live data from Indian Wildlife Sources...</p>";
        
        const response = await fetch(GBIF_API_URL);
        const data = await response.json();
        
        // GBIF se milne wale results ko clean karna
        const speciesList = data.results.map(item => ({
            name: item.species || item.scientificName,
            status: item.threatStatus === 'CR' ? 'Critically Endangered' : 'Endangered',
            statusCode: item.threatStatus.toLowerCase(),
            region: item.stateProvince || "India (Various Regions)",
            image: "https://via.placeholder.com/300x200?text=No+Image+Available" 
        }));

        renderCards(speciesList);
    } catch (error) {
        console.error("API Fetch Error:", error);
        grid.innerHTML = "<p>Unable to connect to live database. Please check your internet.</p>";
    }
}

function renderCards(dataToRender) {
    grid.innerHTML = ''; 
    
    // Duplicate entries remove karne ke liye unique names filter
    const uniqueSpecies = Array.from(new Set(dataToRender.map(a => a.name)))
        .map(name => dataToRender.find(a => a.name === name));

    uniqueSpecies.forEach(animal => {
        const card = document.createElement('article');
        card.className = 'species-card';
        card.innerHTML = `
            <div class="status-badge ${animal.statusCode}">${animal.status}</div>
            <img src="${animal.image}" alt="${animal.name}">
            <div class="card-body">
                <h3>${animal.name}</h3>
                <p>📍 Region: <strong>${animal.region}</strong></p>
                <button class="btn-action">Learn More</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initial Call
fetchWildlifeData();