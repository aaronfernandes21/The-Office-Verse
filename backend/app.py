from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzywuzzy import fuzz
import pandas as pd  # Import pandas to read CSV

app = Flask(__name__)
CORS(app)

# Function to load data from CSV file
def load_data():
    try:
        df = pd.read_csv("the_office.csv")  # Make sure your CSV has these columns
        # Selecting required columns and handling missing values
        df = df[["EpisodeTitle", "About", "Season", "Episode", "Ratings"]].dropna()

        # Convert column names to match our previous dataset structure
        return [
            {
                "name": row["EpisodeTitle"],
                "description": row["About"],
                "season": int(row["Season"]),  # Convert to integer
                "episode": int(row["Episode"]),  # Convert to integer
                "rating": float(row["Ratings"]),  # Convert to float for accurate rating display
            }
            for _, row in df.iterrows()
        ]
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return []  # Return an empty list if there's an error

# Load episodes from CSV when the server starts
episodes = load_data()

@app.route("/search")
def search_episodes():
    keyword = request.args.get("keyword", "").lower()
    print(f"🔍 Searching for: {keyword}")  # Debugging output

    # Search logic using fuzzy matching
    matches = [
        episode for episode in episodes
        if fuzz.partial_ratio(keyword, episode["name"].lower()) > 70
        or fuzz.partial_ratio(keyword, episode["description"].lower()) > 70
    ]

    print(f"✅ Matches found: {matches}")  # Debugging output
    return jsonify(matches)

if __name__ == "__main__":
    app.run(debug=True)
