const apiKey = '86b63cf263msh1c330def25c8560p1b6822jsn8a8ed1e0ccb9';
const apiHost = 'free-to-play-games-database.p.rapidapi.com';

// Navbar scroll effect
const navbar = document.querySelector('.custom-navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

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

// Fetch game details by ID
const fetchGameDetails = async (gameId) => {
    const url = `https://${apiHost}/api/game?id=${gameId}`;
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
        const game = await response.json();
        displayGameDetails(game);
    } catch (error) {
        console.error('Error fetching game details:', error);
        document.getElementById('game-details-container').innerHTML = `
            <p class="text-danger">Failed to load game details. Please try again later.</p>`;
    }
};

// Display game details in the modal
const displayGameDetails = (game) => {
    const detailsContainer = document.getElementById('game-details-container');
    detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${game.thumbnail}" class="img-fluid rounded" alt="${game.title}">
            </div>
            <div class="col-md-8">
                <h5>${game.title}</h5>
                <p>${game.description}</p>
                <ul class="list-unstyled">
                    <li><strong>Genre:</strong> ${game.genre}</li>
                    <li><strong>Platform:</strong> ${game.platform}</li>
                    <li><strong>Publisher:</strong> ${game.publisher}</li>
                    <li><strong>Developer:</strong> ${game.developer}</li>
                    <li><strong>Release Date:</strong> ${game.release_date}</li>
                </ul>
                <a href="${game.game_url}" target="_blank" class="btn btn-primary btn-sm">Play Now</a>
            </div>
        </div>
    `;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('gameDetailsModal'));
    modal.show();
};

// Attach click event to game cards
const attachGameDetailsEvents = () => {
    document.querySelectorAll('.game-card').forEach((card) => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game-id');
            fetchGameDetails(gameId);
        });
    });
};

// Attach click event to nav links
document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const category = link.getAttribute('data-category'); // Get category from data attribute
        fetchGames(category); // Fetch games for selected category
    });
});

// Fetch default category on page load
fetchGames('mmorpg');
