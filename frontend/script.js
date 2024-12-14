// Track favorite jokes
const favoriteJokes = new Set();

async function searchJokes() {
    const search = document.getElementById('search').value.trim();
    if (!search) {
        showNotification('Please enter a search term!', 'red');
        return;
    }

    try {
        const response = await fetch(`https://icanhazdadjoke.com/search?term=${search}`, {
            headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch jokes');
        }

        const data = await response.json();
        displayJokes(data.results);

        if (data.results.length === 0) {
            showNotification('No jokes found!', 'orange');
        } else {
            showNotification(`${data.results.length} jokes found!`, 'green');
        }
    } catch (error) {
        console.error('Error fetching jokes:', error);
        showNotification('Error fetching jokes. Please try again later.', 'red');
    }
}

function displayJokes(jokes) {
    const jokesElement = document.getElementById('jokes');
    jokesElement.innerHTML = ''; // Clear previous results
    jokes.forEach(joke => {
        const jokeElement = document.createElement('div');
        jokeElement.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <p>${joke.joke}</p>
                    <button class="btn btn-primary" onclick="favouriteJoke('${joke.id}', '${joke.joke.replace(/'/g, "\\'")}')">
                        Favourite
                    </button>
                </div>
            </div>
        `;
        jokesElement.appendChild(jokeElement);
    });
}

async function favouriteJoke(id, text) {
    if (favoriteJokes.has(id)) {
        showNotification('Joke is already in favorites!', 'orange');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/favourites/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jokeText: text })
        });

        if (!response.ok) {
            throw new Error('Failed to add to favorites');
        }

        favoriteJokes.add(id); // Add to local tracking
        showNotification('Joke added to favorites!', 'green');
    } catch (error) {
        console.error('Error adding to favorites:', error);
        showNotification('Failed to add joke to favorites!', 'red');
    }
}

function showNotification(message, color) {
    const notificationElement = document.getElementById('notification');
    notificationElement.textContent = message;
    notificationElement.style.backgroundColor = color;
    notificationElement.style.color = 'white'; // Ensures the text is readable on any background
    notificationElement.style.display = 'block';

    // Clear the notification after 1 seconds
    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 1000);
}
