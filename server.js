const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('./'));

// Mock API Data
const endangeredSpecies = [
    {
        id: 1,
        name: "Amur Leopard",
        status: "Critically Endangered",
        population: "~100",
        region: "Russia/China",
        img: "https://images.unsplash.com/photo-1547721064-362026e3ad7b?q=80&w=300"
    },
    {
        id: 2,
        name: "Javan Rhino",
        status: "Critically Endangered",
        population: "75",
        region: "Indonesia",
        img: "https://images.unsplash.com/photo-1534199026332-9599525c3886?q=80&w=300"
    },
    {
        id: 3,
        name: "Vaquita",
        status: "Critically Endangered",
        population: "< 10",
        region: "Gulf of California",
        img: "https://images.unsplash.com/photo-1518384401463-d3876163c195?q=80&w=300"
    }
];

// Endpoint to get species data
app.get('/api/species', (req, res) => {
    res.json(endangeredSpecies);
});

app.listen(PORT, () => {
    console.log(`SpeciesGuard Server running at http://localhost:${PORT}`);
});