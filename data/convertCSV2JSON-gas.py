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

with open("newData/emissions-by-gas.csv", "r", encoding='utf-8-sig') as csvfile:

    jsonfile = open("newData/emissions-by-gas.json", "w")

    # the names of the columns in the csv
    fieldnames = ("country", "id", "year", "CO2", "CH4", "N2O", "F-GAS")

    # divide the objects by ";"
    reader = csv.DictReader(csvfile, fieldnames, delimiter=";")

    # skip the first line
    next(reader)

    # make a dictionary of the json file
    dict = {}

    for row in reader:
        data = OrderedDict()
        countryID = row["id"]
        year = row["year"]

        if year not in dict:
            dict[year] = {}

        dict[year][countryID] = {
            "country": row["country"],
            "CO2": row["CO2"],
            "CH4": row["CH4"],
            "N2O": row["N2O"],
            "F-GAS": row["F-GAS"]
        }

    json.dump(dict, jsonfile, indent=4)

    csvfile.close()
    jsonfile.close()
