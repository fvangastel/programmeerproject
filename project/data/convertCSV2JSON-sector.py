# ConvertCSV2JSON
# Converts data in csv to json.
#
# Name: Felicia van Gastel
# Student nr: 11096187
# Date: 27-04-2018
#
# Data Processing
# Week 3

import csv
import json
from collections import OrderedDict

with open("newData/emissions-by-sector-percentages.csv", "r", encoding='utf-8-sig') as csvfile:

    jsonfile = open("newData/emissions-by-sector-percentages.json", "w")

    # the names of the columns in the csv
    fieldnames = ("Country", "Id", "Year", "Energy", "Industry", "Agriculture", "Waste", "Bunker fuels")

    # divide the objects by ";"
    reader = csv.DictReader(csvfile, fieldnames, delimiter=";")

    # skip the first line
    next(reader)

    # make a dictionary of the json file
    dict = {}

    for row in reader:
        data = OrderedDict()
        countryID = row["Id"]
        year = row["Year"]

        if year not in dict:
            dict[year] = {}

        dict[year][countryID] = {
            "Country": row["Country"],
            "Energy": row["Energy"],
            "Industry": row["Industry"],
            "Agriculture": row["Agriculture"],
            "Waste": row["Waste"],
            "Bunker fuels": row["Bunker fuels"],
        }

    json.dump(dict, jsonfile, indent=4)

    csvfile.close()
    jsonfile.close()
