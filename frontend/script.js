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
                    <button onclick="favouriteJoke('${joke.id}')">Favourite</button>
                </div>
            </div>
        `;
        jokesElement.appendChild(jokeElement);
    });
}

async function favouriteJoke(id) {
    await fetch(`/favourite/${id}`, { method: 'POST' });
}
