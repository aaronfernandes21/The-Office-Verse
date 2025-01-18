# The Office Episode Finder

The Office Episode Finder is a Python-based project that allows users to search for episodes of the TV series "The Office" based on specific keywords. By inputting a keyword, the script searches through a dataset of episodes and returns the names and descriptions of matching episodes.

## Features
- Search episodes by keywords in their titles or descriptions.
- Uses fuzzy string matching for flexible keyword searches.
- Simple and easy-to-use command-line interface.

## How It Works
The script:
1. Accepts a keyword from the user.
2. Compares the keyword with episode names and descriptions using fuzzy string matching.
3. Returns a list of episodes that closely match the keyword.

## Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/aaronfernandes21/The-Office-Verse
   cd (filename)
   ```
2. Install the required library:
   ```bash
   pip install fuzzywuzzy[speedup]
   ```

## Usage
1. Run the script:
   ```bash
   python office_episode_finder.py
   ```
2. Enter a keyword when prompted. For example:
   ```
   Enter a keyword or genre to search for episodes: wedding
   ```
3. The script will output matching episodes:
   ```
   Matching Episodes:
   - Niagara: Jim and Pam's wedding.
   - Casino Night: The office hosts a charity casino night.
   ```

## Dataset
The dataset is a predefined list of episodes with their names and short descriptions. You can extend it by adding more episodes in the script's `episodes` list.

## Example Dataset
Here are a few entries from the dataset:
- **Diversity Day**: Michael conducts a diversity training seminar.
- **The Dundies**: Michael hosts the annual office awards ceremony.
- **Beach Games**: The office competes in games at the beach for a promotion.


## Contributing
Contributions are welcome! If you have ideas or improvements, feel free to fork the repository and submit a pull request.



## Acknowledgments
- Inspired by the hilarious and iconic TV series, *The Office*.
- Uses the [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) library for string matching.

---

Enjoy finding your favorite episodes from *The Office*! 😄

