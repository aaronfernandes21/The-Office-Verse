<template>
  <div class="container">
    <h1>The Office Episode Finder</h1>

    <div class="search-container">
      <input 
        v-model="keyword" 
        @input="searchEpisodes" 
        placeholder="Search for an episode..." 
        class="search-bar"
      />
    </div>

    <div v-if="episodes.length" class="results">
      <div v-for="episode in episodes" :key="episode.name" class="episode-card">
        <h3>{{ episode.name }}</h3>
        <p>{{ episode.description }}</p>
      </div>
    </div>

    <div v-else-if="keyword" class="no-results">
      <p>No episodes found. Try another search!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      keyword: "",
      episodes: []
    };
  },
  methods: {
    async searchEpisodes() {
      if (this.keyword.trim() === "") {
        this.episodes = [];
        return;
      }
      try {
        const response = await axios.get(`http://127.0.0.1:5000/search?keyword=${this.keyword}`);
        this.episodes = response.data;
      } catch (error) {
        console.error("❌ Error fetching episodes:", error);
      }
    }
  }
};
</script>

<style>
/* Background inspired by The Office */
body {
  background-color: #1c1c1c;
  color: #f4f4f4;
  font-family: "Helvetica", Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

/* Container */
.container {
  width: 600px;
  text-align: center;
  background: #292929;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* Title */
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
}

/* Search Container */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Dark Minimalist Search Bar */
.search-bar {
  width: 80%;
  max-width: 400px;
  padding: 12px;
  font-size: 16px;
  background: #333;
  color: white;
  border: none;
  border-bottom: 2px solid #555;
  outline: none;
  transition: 0.3s;
  text-align: center;
}

.search-bar::placeholder {
  color: #bbb;
}

.search-bar:focus {
  border-bottom: 2px solid #0073e6;
}

/* Episode Results */
.results {
  margin-top: 20px;
}

.episode-card {
  background: #222;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: none;
  text-align: left;
}

.episode-card h3 {
  color: #f4f4f4;
  margin: 0;
  font-size: 18px;
}

.episode-card p {
  font-size: 14px;
  color: #aaa;
}

/* No Results Message */
.no-results {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
