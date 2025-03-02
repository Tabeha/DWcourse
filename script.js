let movies = [];

async function loadMovies() {
    const response = await fetch('http://localhost:3000/movies');
    movies = await response.json();
    displayMovies(movies);
}

function displayMovies(data) {
    const tableBody = document.getElementById("movies-table");
    tableBody.innerHTML = "";

    data.forEach(movie => {
        const row = `<tr>
            <td>${movie.rank}</td>
            <td>${movie.year}</td>
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.gross}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function filterMovies() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(searchText));
    displayMovies(filtered);
}

function sortMovies(field) {
    movies.sort((a, b) => {
        if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]);
        } else {
            return a[field] - b[field];
        }
    });
    displayMovies(movies);
}

window.onload = loadMovies;
