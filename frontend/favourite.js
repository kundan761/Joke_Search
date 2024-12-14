async function fetchFavourites() {
    try {
        const response = await fetch('http://localhost:3000/favourites');
        if (!response.ok) {
            throw new Error('Failed to fetch favourite jokes.');
        }
        const data = await response.json();
        displayFavourites(data);
    } catch (error) {
        console.error('Error fetching favourites:', error);
        const favouritesContainer = document.getElementById('favourites');
        favouritesContainer.innerHTML = `<div class="alert alert-danger" role="alert">
            Could not fetch favourite jokes. Please try again later.
        </div>`;
    }
}

function displayFavourites(jokes) {
    const favouritesContainer = document.getElementById('favourites');
    favouritesContainer.innerHTML = ''; // Clear the container

    if (jokes.length === 0) {
        favouritesContainer.innerHTML = `<div class="alert alert-warning" role="alert">
            No favourite jokes found.
        </div>`;
        return;
    }

    jokes.forEach(joke => {
        const jokeCard = document.createElement('div');
        jokeCard.className = 'card mb-3';
        jokeCard.innerHTML = `
            <div class="card-body">
                <p>${joke.joke_text}</p>
            </div>
        `;
        favouritesContainer.appendChild(jokeCard);
    });
}

// Fetch favourites when the page loads
fetchFavourites();
