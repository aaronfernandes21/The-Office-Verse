<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">The Office Verse</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Episodes</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    
    <!-- Trivia Section -->
    <div class="trivia-section">
      <button @click="fetchTrivia" class="trivia-button">Get Trivia</button>
      <p v-if="trivia" class="trivia-text">{{ trivia }}</p>
    </div>

    <div class="container">
      <h1>The Office Episode Finder</h1>

      <div class="search-container">
        <input 
          v-model="keyword" 
          @input="searchEpisodes" 
          placeholder="Search for an episode..." 
          class="search-bar"
        />
        <div class="image-placeholder"></div>
      </div>

      <div class="results-container">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      keyword: "",
      episodes: [],
      trivia: ""
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
    },
    async fetchTrivia() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/trivia");
        this.trivia = response.data.trivia;
      } catch (error) {
        console.error("❌ Error fetching trivia:", error);
      }
    }
  }
};
</script>

<style>
/* Navbar Styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #292929;
  padding: 10px 20px;
  border-bottom: 2px solid #444;
}

.logo {
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  font-size: 16px;
}

/* Trivia Section */
.trivia-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background: #333;
  margin-top: 10px;
}

.trivia-button {
  padding: 10px 20px;
  font-size: 16px;
  background:rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.trivia-button:hover {
  background: #e6b800;
}

.trivia-text {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  max-width: 60%;
  text-align: center;
}

/* Search Container */
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.search-bar {
  width: 70%;
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

.image-placeholder {
  width: 50px;
  height: 50px;
  background: gray;
  margin-left: 10px;
  border-radius: 5px;
}
</style>
