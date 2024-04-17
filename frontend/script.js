async function searchJokes() {
    const search = document.getElementById('search').value;
    const response = await fetch(`https://icanhazdadjoke.com/search?term=${search}`, {
      headers: { Accept: 'application/json' }
    });
    const data = await response.json();
    displayJokes(data.results);
}

function displayJokes(jokes) {
    const jokesElement = document.getElementById('jokes');
    jokesElement.innerHTML = '';
    jokes.forEach(joke => {
        const jokeElement = document.createElement('div');
        jokeElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p>${joke.joke}</p>
                    <button onclick="favouriteJoke('${joke.id}', '${joke.joke}')">Favourite</button>
                </div>
            </div>
        `;
        jokesElement.appendChild(jokeElement);
    });
}

async function favouriteJoke(id, text) {
    await fetch(`http://localhost:3000/favourites/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jokeText: text })
    });
}


