# Import required packages

import dotenv
import os
import pandas as pd
from pymongo import MongoClient
import sqlite3

# Function to create database

def create_sql_database():

    # Define connection path to the SQLite database file
    
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()

    # Drop tables if they already exist (safer to check existence before dropping)
    
    cur.execute("DROP TABLE IF EXISTS us_pop;")
    cur.execute("DROP TABLE IF EXISTS covid;")
    cur.execute("DROP TABLE IF EXISTS statetotals;")
    cur.execute("DROP TABLE IF EXISTS txtotals;")
    cur.execute("DROP TABLE IF EXISTS ussextotals;")
    cur.execute("DROP TABLE IF EXISTS ustotals;")
    conn.commit()

    # Read data from CSV files

    covid_data = pd.read_csv("data/covid.csv")
    us_pop_data = pd.read_csv("data/us_pop_info.csv")
    state_data = pd.read_csv("data/state_totals.csv")
    sex_data = pd.read_csv("data/us_sex_totals.csv")
    tx_data = pd.read_csv("data/tx_totals.csv")
    us_total_data = pd.read_csv("data/us_totals.csv")

    # Define SQL statements to create tables

    create_us_pop_table = """
    CREATE TABLE us_pop (
        id INTEGER PRIMARY KEY,
        State VARCHAR(50),
        April_1_2020 INTEGER,
        "2020" INTEGER,
        "2021" INTEGER,
        "2022" INTEGER,
        "2023" INTEGER
    );
    """
    
    create_covid_table = """
    CREATE TABLE covid (
        id INTEGER,
        "Data As Of" DATE,
        "Totals By" VARCHAR(50),
        State VARCHAR(50),
        Sex VARCHAR(20),
        "Age Group" VARCHAR(50),
        "COVID-19 Deaths" INTEGER,
        "Total Deaths" INTEGER,
        "Pneumonia Deaths" INTEGER,
        "Influenza Deaths" INTEGER
    );
    """

    create_state_table = """
    CREATE TABLE statetotals (
        id INTEGER,
        "Data As Of" DATE ,
        "Totals By" Varchar(20),
        State Varchar(50),
        Sex Varchar(20),
        "Age Group" Varchar(50),
        "COVID-19 Deaths" int,
        "Total Deaths" int,
        "Pneumonia Deaths" int,
        "Influenza Deaths" int
    );
    """

    create_tx_table = """
    CREATE TABLE txtotals (
        id INTEGER,
        "Data As Of" DATE ,
        "Totals By" Varchar(20),
        State Varchar(50),
        Sex Varchar(20),
        "Age Group" Varchar(50),
        "COVID-19 Deaths" int,
        "Total Deaths" int,
        "Pneumonia Deaths" int,
        "Influenza Deaths" int
    );
    """

    create_sex_table = """
    CREATE TABLE ussextotals (
        id INTEGER,
        "Data As Of" DATE ,
        "Totals By" Varchar(20),
        State Varchar(50),
        Sex Varchar(20),
        "Age Group" Varchar(50),
        "COVID-19 Deaths" int,
        "Total Deaths" int,
        "Pneumonia Deaths" int,
        "Influenza Deaths" int
    );
    """

    create_us_total_table = """
    CREATE TABLE ustotals (
        id INTEGER,
        "Data As Of" DATE ,
        "Totals By" Varchar(20),
        State Varchar(50),
        Sex Varchar(20),
        "Age Group" Varchar(50),
        "COVID-19 Deaths" int,
        "Total Deaths" int,
        "Pneumonia Deaths" int,
        "Influenza Deaths" int
    );
    """

    # Execute the table creation statements

    cur.execute(create_covid_table)
    cur.execute(create_us_pop_table)
    cur.execute(create_state_table)
    cur.execute(create_tx_table)
    cur.execute(create_sex_table)
    cur.execute(create_us_total_table)
    conn.commit()

    # Load data from pandas DataFrames to tables

    for index, row in us_pop_data.iterrows():
        sql = """
        INSERT INTO us_pop (id, State, April_1_2020, "2020", "2021", "2022", "2023")
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    for index, row in covid_data.iterrows():
        sql = """
        INSERT INTO covid (id, "Data As Of", "Totals By", State, Sex, "Age Group", "COVID-19 Deaths", "Total Deaths", "Pneumonia Deaths", "Influenza Deaths")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    for index, row in state_data.iterrows():
        sql = """
        INSERT INTO statetotals (id, "Data As Of", "Totals By", State, Sex, "Age Group", "COVID-19 Deaths", "Total Deaths", "Pneumonia Deaths", "Influenza Deaths")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    for index, row in tx_data.iterrows():
        sql = """
        INSERT INTO txtotals (id, "Data As Of", "Totals By", State, Sex, "Age Group", "COVID-19 Deaths", "Total Deaths", "Pneumonia Deaths", "Influenza Deaths")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    for index, row in sex_data.iterrows():
        sql = """
        INSERT INTO ussextotals (id, "Data As Of", "Totals By", State, Sex, "Age Group", "COVID-19 Deaths", "Total Deaths", "Pneumonia Deaths", "Influenza Deaths")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    for index, row in us_total_data.iterrows():
        sql = """
        INSERT INTO ustotals (id, "Data As Of", "Totals By", State, Sex, "Age Group", "COVID-19 Deaths", "Total Deaths", "Pneumonia Deaths", "Influenza Deaths")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cur.execute(sql, tuple(row))

    conn.commit()

    # Close the connection
    
    cur.close()
    conn.close()

    print("Successfully created SQL database")

    return ""

def connect_mongo(db_name="covid"):
    if ".env" in os.listdir():
        env = dotenv.load_dotenv(".env")
    address = os.getenv("MONGO_ADDRESS")
    if not address:
        return None
    if db_name not in address:
        address += f"{db_name}?retryWrites=true&w=majority"
    client = MongoClient(address)
    db = client.get_database(db_name)
    return db

def create_nosql_database():
    db = connect_mongo()
    if db is None:
        print("No MongoDB connection string specified...failed to create noSQL database")
        return ""
    collection_names = db.list_collection_names()
    if "covid" not in collection_names:
        json_data = pd.read_json("data/covid.json").to_dict("records")
        db.get_collection("covid").insert_many(documents=json_data)
    if "us_pop" not in collection_names:
        json_data = pd.read_json("data/us_pop_info.json").to_dict("records")
        db.get_collection("us_pop").insert_many(documents=json_data)
    print("Successfully created noSQL database")
    return db

if "database.db" not in os.listdir():
    create_sql_database()
    create_nosql_database()