import csv
import mysql.connector

# File names

input_pitching_file = "../RAW-baseballdatabank-2019.2/core/Pitching.csv"
output_pitching_file = "../AUG-baseballdata/AUG_Pitching.csv"

def fix_empty(integer_value):
    if (not integer_value):
        integer_value = -1
    return integer_value

with open(input_pitching_file) as f1, open(output_pitching_file, "w") as output:
    pitching_reader = csv.reader(f1, delimiter=",")
    pitching_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_item in pitching_reader:
        if i == 0:
            i += 1
        else:
            player_ID = each_item[0]
            year_ID = each_item[1]
            team_ID = each_item[3]
            wins = fix_empty(each_item[5])
            losses = fix_empty(each_item[6])
            games = fix_empty(each_item[7])
            games_started = fix_empty(each_item[8])
            complete_games = fix_empty(each_item[9])
            shutouts = fix_empty(each_item[10])
            saves = fix_empty(each_item[11])
            total_outs = fix_empty(each_item[12])
            hits = fix_empty(each_item[13])
            earned_runs = fix_empty(each_item[14])
            homeruns = fix_empty(each_item[15])
            walks = fix_empty(each_item[16])
            strikeouts = fix_empty(each_item[17])
            opp_ba = fix_empty(each_item[18])
            earned_run_avg = fix_empty(each_item[19])
            intentional_walks = fix_empty(each_item[20])
            runs_allowed = fix_empty(each_item[26])
            batters_hit = fix_empty(each_item[22])
            balks = fix_empty(each_item[23])

            item = [player_ID,year_ID,team_ID,wins,losses,games,games_started,complete_games,shutouts,saves,total_outs,hits,earned_runs,homeruns,walks,strikeouts,opp_ba,earned_run_avg,intentional_walks,runs_allowed,batters_hit,balks]
            pitching_writer.writerow(item)
