<template>
  <div>
    <h1>Random Trivia</h1>
    <button @click="fetchTrivia" class="trivia-button">Get Trivia</button>
    <p v-if="trivia" class="trivia-text">{{ trivia }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trivia: ""
    };
  },
  methods: {
    async fetchTrivia() {
      try {
        const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        this.trivia = response.data.text;
      } catch (error) {
        console.error("❌ Error fetching trivia:", error);
      }
    }
  }
};
</script>

<style>
.trivia-button {
  padding: 10px 20px;
  font-size: 16px;
  background: #ffcc00;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.trivia-button:hover {
  background: #e6b800;
}

.trivia-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  max-width: 60%;
  text-align: center;
  margin-top: 20px;
}
</style>
