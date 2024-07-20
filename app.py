# Import required packages

from dbs import *
from flask import Flask, render_template, request, url_for
import pandas as pd
import sqlite3

# Create app

app = Flask(__name__)

# Define map page

@app.route('/map')
def map():

    return render_template("map.html", path = request.path)

# Define home page

@app.route('/')
def home():

    # Import data from CSVs and merge

    # df1 = pd.read_csv("data/covid.csv")
    # df2 = pd.read_csv("data/us_pop_info.csv")
    # df = pd.merge(left=df1, right=df2, how="inner", on="State")

    # Import data from MongoDB and merge

    # mongo = connect_mongo()
    # df1 = pd.DataFrame(data=list(mongo.get_collection("covid").find({})))
    # df2 = pd.DataFrame(data=list(mongo.get_collection("us_pop").find({})))
    # df = pd.merge(left=df1, right=df2, how="inner", on="State")

    # # Import data from SQL databases and merge

    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    query1 = """
        SELECT * FROM covid
        WHERE "Totals By" = 'By Total' AND State NOT IN ('United States', 'Puerto Rico')
        LIMIT 3000
    """
    cur.execute(query1)
    rows1 = cur.fetchall()
    cur.execute('PRAGMA table_info(covid)')
    columns1 = [column[1] for column in cur.fetchall()]
    df1 = pd.DataFrame(data=rows1, columns=columns1)

    query2 = """
        SELECT * FROM us_pop
    """
    cur.execute(query2)
    rows2 = cur.fetchall()
    cur.execute('PRAGMA table_info(us_pop)')
    columns2 = [column[1] for column in cur.fetchall()]
    df2 = pd.DataFrame(data=rows2, columns=columns2)
    df = pd.merge(left=df1, right=df2, how="inner", on="State")

    # Clean df

    unwanted_columns = [
        "Unnamed: 0", 
        "id",
        "id_x",
        "id_y",
        "Geographic Area",
        "geographic_area",
        "Unnamed: 0_x",
        "Unnamed: 0_y",
        "April 1, 2020",
        "April_1_2020",
        "april_1_2020",
        "apr_1_2020",
        "2020",
        "2021",
        "2022",
        "year_2020",
        "year_2021",
        "year_2022",
    ]
    all_cols = list(df.columns)
    cols_to_remove = []
    for col in unwanted_columns:
        if col in all_cols:
            cols_to_remove.append(col)
    df = df.drop(columns=cols_to_remove)
    rename_cols = {
        "year_2023": "population_2023",
        "2023": "Population (2023)"
    }
    df = df.rename(columns=rename_cols)

    # Convert dataframe to HTML so it can display on the frontend

    table_data = df.to_html(index=False, table_id="covid", classes="table table-striped")

    # Send this table data to the home page

    return render_template("home.html", table_data = table_data, path = request.path)

# Run app

if __name__ == "__main__":
    app.run(debug=True)