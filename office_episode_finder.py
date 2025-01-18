from fuzzywuzzy import fuzz
from fuzzywuzzy import process

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

def find_matching_episodes(keyword, episodes):
    """
    Finds episodes that match the given keyword.
    
    Args:
        keyword (str): Keyword to search for.
        episodes (list): List of episodes with names and descriptions.
        
    Returns:
        list: Matching episodes.
    """
    matches = []
    for episode in episodes:
        score_name = fuzz.partial_ratio(keyword.lower(), episode["name"].lower())
        score_desc = fuzz.partial_ratio(keyword.lower(), episode["description"].lower())
        if score_name > 70 or score_desc > 70:  # Match threshold
            matches.append(episode)
    return matches

def main():
    print("Welcome to 'The Office' Episode Finder!")
    keyword = input("Enter a keyword or genre to search for episodes: ").strip()
    
    # Find matches
    matches = find_matching_episodes(keyword, episodes)
    
    # Output results
    if matches:
        print("\nMatching Episodes:")
        for match in matches:
            print(f"- {match['name']}: {match['description']}")
    else:
        print("\nNo matching episodes found.")

if __name__ == "__main__":
    main()
