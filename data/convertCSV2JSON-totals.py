# ConvertCSV2JSONlist2
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

with open("newData/emissions-totals.csv", "r", encoding='utf-8-sig') as csvfile:

    jsonfile = open("newData/emissions-totals.json", "w")

    fieldnames = ("country", "id", "year", "emission")

    reader = csv.DictReader(csvfile, fieldnames, delimiter=";")
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
            "emission": row["emission"]
        }

    json.dump(dict, jsonfile, indent=4)

    csvfile.close()
    jsonfile.close()
