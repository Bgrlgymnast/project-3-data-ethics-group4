# Import required packages

import pandas as pd

# Upload 1st CSV

file_name = "Provisional_COVID-19_Deaths_by_Sex_and_Age_20240708 (1)"
df = pd.read_excel(f"data/{file_name}.xlsx", nrows=None) # 30000

# Get rid of undesired columns

dropped_columns = [
    "Start Date",
    "End Date",
    "Year",
    "Month",
    "Pneumonia and COVID-19 Deaths",
    "Pneumonia, Influenza, or COVID-19 Deaths",
    "Footnote"
]
df = df.drop(columns=dropped_columns, axis=1)

# Clean data by filling NA rows with 0

df = df.fillna(0)

# Fix col type

int_cols = [
    "COVID-19 Deaths",
    "Total Deaths", 
    "Pneumonia Deaths", 
    "Influenza Deaths"
]
df[int_cols] = df[int_cols].astype(int)

# Rename columns

rename_dict1 = {
    "Group": "Totals By"
}
df = df.rename(columns=rename_dict1)

# Only keep totals

# df = df[df['Group'] == "By Total"]

# Upload 2nd CSV

file_name2 = "estimated_us population"
df2 = pd.read_excel(f"data/{file_name2}.xlsx", header=3, nrows=58)

# Rename columns 

rename_dict2 = {
    "Unnamed: 0": "State", # Geographic Area
    "Unnamed: 1": "april_1_2020"
}
df2 = df2.rename(columns=rename_dict2)

# Handle missing values by dropping them

df2 = df2.dropna()

# Fix incorrect types

int_cols2 = [
    "april_1_2020",
    2020,
    2021,
    2022,
    2023
]
df2[int_cols2] = df2[int_cols2].astype(int)

# Strip out unnecessary characters

df2["State"] = df2["State"].str.replace(".","")

# Start at row 5

df2 = df2.drop(index=[0,1,2,3,4])

# Rename indices

df.index.name = "id"
df2.index.name = "id"

# Convert to CSVs and JSON

df.to_csv("data/covid.csv", encoding="utf8")
df2.to_csv("data/us_pop_info.csv")

df.to_json("data/covid.json")
df2.to_json("data/us_pop_info.json")