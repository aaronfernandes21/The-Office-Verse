from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Import CORS
from fuzzywuzzy import fuzz

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)  # Enable CORS for all routes

# Sample dataset: Episode names and descriptions
episodes = [
    {"name": "Diversity Day", "description": "Michael conducts a diversity training seminar."},
    {"name": "The Dundies", "description": "Michael hosts the annual office awards ceremony."},
    {"name": "Booze Cruise", "description": "The office goes on a cruise and chaos ensues."},
    {"name": "The Injury", "description": "Michael burns his foot on a George Foreman Grill."},
    {"name": "Casino Night", "description": "The office hosts a charity casino night."},
    {"name": "Gay Witch Hunt", "description": "Michael outs a coworker, leading to an awkward situation."},
    {"name": "Beach Games", "description": "The office competes in games at the beach for a promotion."},
    {"name": "Dinner Party", "description": "Michael and Jan host an uncomfortable dinner party."},
    {"name": "Stress Relief", "description": "Dwight's fire drill goes terribly wrong."},
    {"name": "Niagara", "description": "Jim and Pam's wedding."},
    {"name": "Scott's Tots", "description": "Michael faces his failed scholarship promise to students."},
    {"name": "Goodbye, Michael", "description": "Michael's farewell party as he leaves Dunder Mifflin."},
]

@app.route("/search")
def search_episodes():
    keyword = request.args.get("keyword", "").lower()
    print(f"🔍 Searching for: {keyword}")  # Debugging output

    matches = [
        episode for episode in episodes
        if fuzz.partial_ratio(keyword, episode["name"].lower()) > 70
        or fuzz.partial_ratio(keyword, episode["description"].lower()) > 70
    ]

    print(f"✅ Matches found: {matches}")  # Debugging output
    return jsonify(matches)

if __name__ == "__main__":
    app.run(debug=True)
