import pandas as pd
import json

# LOAD CSV
df = pd.read_csv("data.csv")

# CLEANING
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)

# TOP SONGS
top_songs = df.sort_values(by="popularity", ascending=False).head(10)

# TOP ARTISTS
top_artists = df['artist'].value_counts().head(10)

# POPULARITY DISTRIBUTION
bins = [0, 20, 40, 60, 80, 100]
labels = ["0-20", "20-40", "40-60", "60-80", "80-100"]

df['pop_range'] = pd.cut(df['popularity'], bins=bins, labels=labels)
pop_dist = df['pop_range'].value_counts()

# YEAR TREND (fixed)
year_trend = df.groupby('year')['popularity'].mean()

# JSON SAFE FORMAT
result = {
    "top_songs": top_songs.to_dict(orient="records"),
    "top_artists": {str(k): int(v) for k, v in top_artists.items()},
    "pop_dist": {str(k): int(v) for k, v in pop_dist.items()},
    "year_trend": {str(k): float(v) for k, v in year_trend.items()}
}

explicit_dist = df['is_explicit'].value_counts()
result["explicit_dist"] = {str(k): int(v) for k, v in explicit_dist.items()}

# SAVE JSON
with open("data.json", "w") as f:
    json.dump(result, f, indent=4)

print("✅ Done")