const apiKey = '86b63cf263msh1c330def25c8560p1b6822jsn8a8ed1e0ccb9';
const apiHost = 'free-to-play-games-database.p.rapidapi.com';

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

export { attachGameDetailsEvents };
