document.getElementById("search-btn").addEventListener("click", async () => {
    const keyword = document.getElementById("keyword").value.trim();
    const resultsDiv = document.getElementById("results");

    // Clear previous results
    resultsDiv.innerHTML = "";

    if (!keyword) {
        resultsDiv.innerHTML = "<p>Please enter a keyword to search.</p>";
        return;
    }

    try {
        // Fetch data from the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/search?keyword=${encodeURIComponent(keyword)}`);
        const episodes = await response.json();

        if (episodes.length > 0) {
            episodes.forEach((episode) => {
                const episodeDiv = document.createElement("div");
                episodeDiv.classList.add("episode");
                episodeDiv.innerHTML = `<strong>${episode.name}</strong>: ${episode.description}`;
                resultsDiv.appendChild(episodeDiv);
            });
        } else {
            resultsDiv.innerHTML = "<p>No matching episodes found.</p>";
        }
    } catch (error) {
        resultsDiv.innerHTML = "<p>Error fetching episodes. Please try again.</p>";
        console.error(error);
    }
});
