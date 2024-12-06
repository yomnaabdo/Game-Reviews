import { attachGameDetailsEvents } from './gameDetails.js';

const apiKey = '86b63cf263msh1c330def25c8560p1b6822jsn8a8ed1e0ccb9';
const apiHost = 'free-to-play-games-database.p.rapidapi.com';

// Display loading spinner
const displayLoading = () => {
    const container = document.getElementById('games-container');
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
};

// Fetch games by category
const fetchGames = async (category) => {
    displayLoading(); // Show loading spinner
    const url = `https://${apiHost}/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const games = await response.json();
        displayGames(games, category);
    } catch (error) {
        console.error('Error fetching games:', error);
        document.getElementById('games-container').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load games. Please try again later.</p>
            </div>`;
    }
};

// Display games in the container
const displayGames = (games, category) => {
    const container = document.getElementById('games-container');
    const title = document.getElementById('category-title');

    // Update the title
    title.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Games`;

    // Clear existing content
    container.innerHTML = '';

    // Populate with new games
    games.forEach((game) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'col-md-4 mb-4 game-card';
        gameCard.setAttribute('data-game-id', game.id); // Add game ID for modal

        // Generate the game card
        gameCard.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">${game.short_description}</p>
                    <ul class="list-unstyled d-flex justify-content-between">
                        <li><strong>Category:</strong> ${game.genre}</li>
                        <li><strong>Platform:</strong> ${game.platform}</li>
                        <li class="free fs-6 bg-primary-subtle rounded-2 p-2">Free</li>
                    </ul>
                </div>
            </div>
        `;
        
        container.appendChild(gameCard);
    });

    // Attach click events for game details
    attachGameDetailsEvents();
};

export { fetchGames };
