import csv
import mysql.connector

# File names

input_fielding_file = "../RAW-baseballdatabank-2019.2/core/Fielding.csv"
output_fielding_file = "../AUG-baseballdata/AUG_Fielding.csv"

def fix_empty(integer_value):
    if (not integer_value):
        integer_value = -1
    return integer_value

with open(input_fielding_file) as f1, open(output_fielding_file, "w") as output:
    fielding_reader = csv.reader(f1, delimiter=",")
    fielding_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_item in fielding_reader:
        if i == 0:
            i += 1
        else:
            player_ID = each_item[0]
            year_ID = each_item[1]
            stint = each_item[2]
            team_ID = each_item[3]
            league_ID = each_item[4]
            position = each_item[5]
            games = fix_empty(each_item[6])
            games_started = fix_empty(each_item[7])
            putouts = fix_empty(each_item[9])
            assists = fix_empty(each_item[10])
            errors = fix_empty(each_item[11])
            double_plays = fix_empty(each_item[12])
            catcher_stolen = fix_empty(each_item[15])
            catcher_caught = fix_empty(each_item[16])

            item = [player_ID,year_ID,stint,team_ID,league_ID,position,games,games_started,putouts,assists,errors,double_plays,catcher_stolen,catcher_caught]
            fielding_writer.writerow(item)
