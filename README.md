# Office Episode Finder 🎥

A simple Python script that helps you find episodes of *The Office* based on keywords or themes. This tool uses fuzzy string matching to identify relevant episodes by comparing your keyword with episode names and descriptions.

---

## Features
- Search for episodes by keyword (e.g., "wedding", "diversity", "party").
- Returns a list of matching episode names and descriptions.
- Uses fuzzy string matching for flexible and accurate searches.

---

## Prerequisites
Before running the script, ensure you have the following installed:
1. Python 3.6 or higher
2. `fuzzywuzzy` library with the `python-Levenshtein` speedup module

Install the required library:
```bash
pip install fuzzywuzzy[speedup]
