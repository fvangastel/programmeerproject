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

with open("greenhouse-gas-emissions-by-gas.csv", "r", encoding='utf-8-sig') as csvfile:

    jsonfile = open("greenhouse-gas-emissions-by-gas.json", "w")

    # the names of the columns in the csv
    fieldnames = ("name", "id", "year", "SF6", "PFC", "HFC", "N2O", "CH4", "CO2")

    # divide the objects by ";"
    reader = csv.DictReader(csvfile, fieldnames, delimiter=";")

    # skip the first line
    next(reader)

    # make a list of the json file
    list = []

    for row in reader:
        data = OrderedDict()
        data["name"] = row["name"]
        data["id"] = row["id"]

        # make a nested list of values
        values = []
        for year in fieldnames[2:]:
            values.append({
                "year": int(row["year"]),
                "SF6": float(row["SF6"]),
                "PFC": float(row["PFC"]),
                "HFC": float(row["HFC"]),
                "N2O": float(row["N2O"]),
                "CH4": float(row["CH4"]),
                "CO2": float(row["CO2"])
                })
            data["values"] = values
            list.append(data)

    json.dump(list, jsonfile, indent=4)

    csvfile.close()
    jsonfile.close()
