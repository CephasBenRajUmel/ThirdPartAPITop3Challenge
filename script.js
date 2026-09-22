const amt = 12;

console.log("SCRIPT.JS LOADED");

async function search(searchTerm = "", genre = "") {

const resultsPage =
    document.getElementById("results");

resultsPage.innerHTML =
    "<p>Loading games...</p>";


try {

    let url = "/.netlify/functions/api";

    const params = new URLSearchParams();

    params.append("page_size", amt);

    if (searchTerm.trim() !== "") {
        params.append("search", searchTerm.trim());
    }

    if (genre.trim() !== "") {
        params.append("genre", genre.trim());
    }

    url += "?" + params.toString();

    console.log("Requesting:", url);



    console.log("Requesting:", url);


    const response = await fetch(url);


    if (!response.ok) {

        throw new Error(
            `Server returned ${response.status}`
        );

    }


    const data = await response.json();


    resultsPage.innerHTML = "";


    if (
        !data.results ||
        data.results.length === 0
    ) {

        resultsPage.innerHTML =
            "<p>No games found.</p>";

        return;
    }


    data.results.forEach(game => {

        createGameCard(game);

    });


} catch (error) {

    console.error("Search error:", error);

    resultsPage.innerHTML =
        "<p>Could not load games.</p>";
}


}

function createGameCard(game) {

const resultsPage =
    document.getElementById("results");


const card =
    document.createElement("div");


card.classList.add("game-card");


const genres =
    game.genres?.length
        ? game.genres
            .map(genre => genre.name)
            .join(", ")
        : "Unknown";


const platforms =
    game.platforms?.length
        ? game.platforms
            .slice(0, 3)
            .map(platform =>
                platform.platform.name
            )
            .join(", ")
        : "Unknown";


card.innerHTML = `

    <img
        class="game-image"
        src="${game.background_image || ""}"
        alt="${game.name}"
    >

    <div class="game-info">

        <h2>${game.name}</h2>

        <p class="rating">
            ⭐ ${game.rating || "N/A"}
        </p>

        <p>
            <strong>Released:</strong>
            ${game.released || "Unknown"}
        </p>

        <p>
            <strong>Genres:</strong>
            ${genres}
        </p>

        <p>
            <strong>Platforms:</strong>
            ${platforms}
        </p>

        <p>
            <strong>Metacritic:</strong>
            ${game.metacritic || "N/A"}
        </p>

    </div>

`;

resultsPage.appendChild(card);


}

window.search = search;

search();