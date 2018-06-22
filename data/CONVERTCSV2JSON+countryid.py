import csv
import pycountry
import json
from collections import OrderedDict

with open("newData/FAOSTAT_data_6-21-2018.csv", "r", encoding='utf-8-sig') as csvfile:

    jsonfile = open("newData/FAOSTAT_data_6-21-2018.json", "w")

    # the names of the columns in the csv
    fieldnames = ("country", "year", "item", "value")

    # divide the objects by ";"
    reader = csv.DictReader(csvfile, fieldnames, delimiter=";")

    # skip the first line
    next(reader)

    # make a dictionary of the json file
    dict = {}

    for row in reader:

        countryID = pycountry.countries.get(name = row["country"]).alpha_3

        bolivia = pycountry.countries.get(alpha_3='BOL')
        print(bolivia)

        data = OrderedDict()
        year = row["year"]

        if year not in dict:
            dict[year] = {}

        dict[year][countryID] = {
            "country": row["country"],
            "item": row["item"],
            "value": row["value"]
        }

    json.dump(dict, newcsvfile, indent=4)

    csvfile.close()
    newcsvfile.close()
