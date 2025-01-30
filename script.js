const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  return fetch(url).then((response) => response.json());
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
    return;
  }

  requestApi(searchTerm).then((result) => {
    // Filtrar os resultados com base no termo de pesquisa
    const filteredResults = result.filter((element) =>
      element.name.toLowerCase().includes(searchTerm)
    );

    // Atualizar o DOM com os resultados filtrados
    if (filteredResults.length > 0) {
      resultPlaylist.classList.add("hidden");
      const artistName = document.getElementById("artist-name");
      const artistImage = document.getElementById("artist-img");

      filteredResults.forEach((element) => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
      });

      resultArtist.classList.remove("hidden");
    } else {
      resultPlaylist.classList.add("hidden");
      resultArtist.classList.add("hidden");
    }
  });
});
