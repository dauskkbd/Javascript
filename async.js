async function fetchLyrics() {
  const url =
    "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=3976759";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e11d6ddee1msh87daf3039ed9454p1b449djsn6cd66e49f5b3",
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const lyricsHtml = result.lyrics.lyrics.body.html;

    const lyricsElement = document.createElement("p");
    lyricsElement.innerHTML = lyricsHtml;

    const contentArea = document.querySelector(".content-area");

    contentArea.innerHTML = "";

    contentArea.appendChild(lyricsElement);
  } catch (error) {
    console.error(error);
  }
}

async function fetchOtherAlbums() {
  const url =
    "https://spotify23.p.rapidapi.com/search/?q=100%20miles%20and%20running&type=multi&offset=0&limit=10&numberOfTopResults=5";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e11d6ddee1msh87daf3039ed9454p1b449djsn6cd66e49f5b3",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    const contentArea = document.querySelector(".content-area");
    contentArea.innerHTML = ""; //Clear previous content

    result.albums.items.forEach((item) => {
      const imageUrl = item.data.coverArt.sources[0].url;
      const albumName = item.data.name; // Get the album name
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;

      //Create a paragraph element for the album name
      const albumNameElement = document.createElement("span");
      albumNameElement.textContent = albumName;

      // Create a container for both the image and the album name
      const container = document.createElement("div");
      container.appendChild(imgElement);
      container.appendChild(albumNameElement);

      // Append the container to the content area
      contentArea.appendChild(container);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchArtists() {
  const url =
    "https://spotify23.p.rapidapi.com/artist_related/?id=4xRYI6VqpkE3UwrDrAZL8L";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e11d6ddee1msh87daf3039ed9454p1b449djsn6cd66e49f5b3",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const relatedArtists = result.artists;

    const contentArea = document.querySelector(".content-area");

    contentArea.innerHTML = "";

    relatedArtists.forEach((artist) => {
      if (artist.images && artist.images.length > 0 && artist.name) {
        const artistContainer = document.createElement("div");

        const imgElement = document.createElement("img");
        imgElement.src = artist.images[0].url;

        const nameElement = document.createElement("span");
        nameElement.textContent = artist.name;

        artistContainer.appendChild(imgElement);
        artistContainer.appendChild(nameElement);

        contentArea.appendChild(artistContainer);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  fetchLyrics();
  document
    .querySelector('[type="button"][data-action="lyrics"]')
    .addEventListener("click", fetchLyrics);

  document
    .querySelector('[type="button"][data-action="other-albums"]')
    .addEventListener("click", fetchOtherAlbums);

  document
    .querySelector('[type="button"][data-action="related-artists"]')
    .addEventListener("click", fetchArtists);
});
