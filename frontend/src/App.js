import React, { useState, useEffect } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/search?keyword=${keyword}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [keyword]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = Math.round(rating); // Round to nearest integer
    return "⭐".repeat(stars) + " (" + rating + ")";
  };

  return (
    <div style={styles.container}>
      {/* Title & Search Bar in a flex container */}
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>🖇️ The Office Verse</h1>
        <input
          type="text"
          placeholder="Search episodes..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Results Container */}
      <div style={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map((episode, index) => (
            <div key={index} style={styles.resultItem}>
              <h2 style={styles.episodeTitle}>
                S{episode.season}E{episode.episode}:{" "}
                <span style={styles.name}>{episode.name}</span>
              </h2>
              <p style={styles.description}>{episode.description}</p>
              <p style={styles.rating}>Rating: {renderStars(episode.rating)}</p>
            </div>
          ))
        ) : (
          keyword && <p style={styles.noResults}>No results found.</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    background: "linear-gradient(135deg, #0f0f0f, #1b1b3a)", // Dark background
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "100px",
  },

  // Title and search bar container
  headerContainer: {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center align title & search bar
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    position: "fixed",
    top: "0",
    background: "black",
    padding: "20px 0",
    zIndex: "10",
    borderBottom: "1px solid #444",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow effect
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
    fontFamily: "OfficeFont, Arial, sans-serif",
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)", // Black glow
    backgroundColor: "black", // Black background
    padding: "10px 20px",
    borderRadius: "8px",
    display: "inline-block",
  },

  input: {
    padding: "12px",
    width: "300px",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "5px",
    outline: "none",
    boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.3)", // Soft neon glow effect
  },

  resultsContainer: {
    marginTop: "150px",
    width: "400px",
  },

  resultItem: {
    backgroundColor: "rgba(0, 0, 50, 0.7)", // Dark bluish with transparency
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "5px",
    width: "100%",
    boxShadow: "0px 2px 5px rgba(0, 255, 255, 0.3)", // Slight neon glow effect
    transition: "transform 0.2s ease-in-out",
  },

  episodeTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  name: {
    color: "#00ffff", // Cyan highlight for episode name
  },

  description: {
    fontSize: "14px",
    color: "#ddd",
  },

  rating: {
    fontSize: "14px",
    color: "#ffcc00", // Yellow for rating
    marginTop: "5px",
  },

  noResults: {
    color: "#888",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default App;
