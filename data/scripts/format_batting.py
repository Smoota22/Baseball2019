import csv
import mysql.connector

# File names

input_batting_file = "../RAW-baseballdatabank-2019.2/core/Pitching.csv"
output_batting_file = "../AUG-baseballdata/AUG_Pitching.csv"

def fix_empty(integer_value):
    if (not integer_value):
        integer_value = -1
    return integer_value

with open(input_batting_file) as f1, open(output_batting_file, "w") as output:
    batting_reader = csv.reader(f1, delimiter=",")
    batting_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_item in batting_reader:
        if i == 0:
            i += 1
        else:
            player_ID = each_item[0]
            year_ID = each_item[1]
            stint = each_item[2]
            team_ID = each_item[3]
            league_ID = each_item[4]
            games = fix_empty(each_item[5])
            at_bats = fix_empty(each_item[6])
            runs = fix_empty(each_item[7])
            hits = fix_empty(each_item[8])
            doubles = fix_empty(each_item[9])
            triples = fix_empty(each_item[10])
            homeruns = fix_empty(each_item[11])
            rbis = fix_empty(each_item[12])
            stolen_bases = fix_empty(each_item[13])
            caught_stealing = fix_empty(each_item[14])
            strikeouts = fix_empty(each_item[16])
            intentional_walks = fix_empty(each_item[17])
            hit_by_pitch = fix_empty(each_item[18])

            item = [player_ID,year_ID,stint,team_ID,league_ID,games,at_bats,runs,hits,doubles,triples,homeruns,rbis,stolen_bases,caught_stealing,strikeouts,intentional_walks,hit_by_pitch]
            batting_writer.writerow(item)
