import React, { useState, useEffect } from "react";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [inCharacterSection, setInCharacterSection] = useState(false);

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

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setInCharacterSection(sectionId === "characterSection");
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>🖇️ The Office Verse</h1>
        <input
          type="text"
          placeholder="Search episodes..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={() => scrollToSection(inCharacterSection ? "searchSection" : "characterSection")}
          style={styles.button}
        >
          {inCharacterSection ? "Return to Episode Search" : "Know the Characters"}
        </button>
      </div>

      {/* Search Section */}
      <div id="searchSection" style={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map((episode, index) => (
            <div key={index} style={styles.resultItem}>
              <h2 style={styles.episodeTitle}>
                S{episode.season}E{episode.episode}: <span style={styles.name}>{episode.name}</span>
              </h2>
              <p style={styles.description}>{episode.description}</p>
              <p style={styles.rating}>⭐ {episode.rating}</p>
            </div>
          ))
        ) : (
          keyword && <p style={styles.noResults}>No results found.</p>
        )}
      </div>

      {/* Character Section */}
      <div id="characterSection" style={styles.characterContainer}>
        <h2 style={styles.characterTitle}>Know the Characters</h2>
        <div style={styles.characterGrid}>
          {/* Michael Scott */}
          <div style={styles.characterCard}>
            <img src="/images/michael.jpg" alt="Michael Scott" style={styles.characterImage} />
            <h3>Michael Scott</h3>
            <p>The World's Best Boss (or so he thinks). Hilarious yet awkward.</p>
            <a href="https://en.wikipedia.org/wiki/Michael_Scott_(The_Office)" target="_blank" rel="noopener noreferrer" style={styles.link}>
              Wikipedia
            </a>
          </div>

          {/* Dwight, Pam, Jim */}
          <div style={styles.row}>
            <div style={styles.characterCard}>
              <img src="/images/dwight.jpg" alt="Dwight Schrute" style={styles.characterImage} />
              <h3>Dwight Schrute</h3>
              <p>Beet farmer, assistant (to the) regional manager.</p>
              <a href="https://en.wikipedia.org/wiki/Dwight_Schrute" target="_blank"rel="noopener noreferrer" style={styles.link}>
                Wikipedia
              </a>
            </div>

            <div style={styles.characterCard}>
              <img src="/images/pam.jpg" alt="Pam Beesly" style={styles.characterImage} />
              <h3>Pam Beesly</h3>
              <p>The receptionist turned office administrator and artist.</p>
              <a href="https://en.wikipedia.org/wiki/Pam_Beesly" target="_blank" rel="noopener noreferrer" style={styles.link}>
                Wikipedia
              </a>
            </div>

            <div style={styles.characterCard}>
              <img src="/images/jim.jpg" alt="Jim Halpert" style={styles.characterImage} />
              <h3>Jim Halpert</h3>
              <p>Master of pranks, hopeless romantic, and salesman.</p>
              <a href="https://en.wikipedia.org/wiki/Jim_Halpert" target="_blank"rel="noopener noreferrer" style={styles.link}>
                Wikipedia
              </a>
            </div>
          </div>

          {/* Other Characters */}
          <div style={styles.characterCard}>
            <img src="/images/stanley.jpg" alt="Stanley Hudson" style={styles.characterImage} />
            <h3>Stanley Hudson</h3>
            <p>Crossword puzzle master and lover of Pretzel Day.</p>
            <a href="https://en.wikipedia.org/wiki/Stanley_Hudson" target="_blank" rel="noopener noreferrer" style={styles.link}>
              Wikipedia
            </a>
          </div>
          {/* Add more characters here */}
        </div>
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
    paddingTop: "90px", // Pushes content below navbar
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "80px", // Fixed navbar height
    background: "black",
    padding: "0 20px",
    zIndex: "100",
    borderBottom: "1px solid #444",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
  },
  resultsContainer: {
    width: "400px",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "fixed",
    top: "0",
    background: "black",
    padding: "20px",
    zIndex: "10",
    borderBottom: "1px solid #444",
  },

  logo: {
    fontSize: "24px",
    fontFamily: "OfficeFont, Arial, sans-serif",
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: "20px",
  },

  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "5px",
    outline: "none",
    border: "1px solid #555",
  },

  button: {
    background: "#FFD700",
    color: "#000",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    marginRight: "20px",
  },

 

  characterContainer: {
    padding: "50px 20px",
    textAlign: "center",
    marginTop: "100px",
  },

  characterTitle: {
    fontSize: "30px",
    fontFamily: "OfficeFont, Arial, sans-serif",
    marginBottom: "20px",
  },

  characterGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  characterCard: {
    background: "#222",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px",
    textAlign: "center",
    width: "200px",
  },

  characterImage: {
    width: "100%",
    borderRadius: "5px",
  },

  link: {
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default App;
