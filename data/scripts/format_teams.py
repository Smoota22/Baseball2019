import csv
import mysql.connector

# File names

input_teams_file = "../RAW-baseballdatabank-2019.2/core/Teams.csv"
output_teams_file = "../AUG-baseballdata/AUG_Teams.csv"

def fix_empty(integer_value):
    if (not integer_value):
        integer_value = -1
    return integer_value

with open(input_teams_file) as f1, open(output_teams_file, "w") as output:
    team_reader = csv.reader(f1, delimiter=",")
    team_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_team in team_reader:
        if i == 0:
            i += 1
        else:
            team_ID = each_team[2]
            year_ID = each_team[0]
            team_name = each_team[40]
            rank = fix_empty(each_team[5])
            games = fix_empty(each_team[6])
            home_games = fix_empty(each_team[7])
            wins = fix_empty(each_team[8])
            losses = fix_empty(each_team[9])
            runs = fix_empty(each_team[14])
            at_bats = fix_empty(each_team[15])
            hits = fix_empty(each_team[16])
            doubles = fix_empty(each_team[17])
            triples = fix_empty(each_team[18])
            homeruns = fix_empty(each_team[19])
            walks = fix_empty(each_team[20])
            stolen_bases = fix_empty(each_team[22])
            caught_stealing = fix_empty(each_team[23])
            batters_hit = fix_empty(each_team[24])
            opponent_runs = fix_empty(each_team[26])
            opponent_earned_runs = fix_empty(each_team[27])
            complete_games = fix_empty(each_team[29])
            shutouts = fix_empty(each_team[30])
            saves = fix_empty(each_team[31])
            outs_pitched = fix_empty(each_team[32])
            hits_allowed = fix_empty(each_team[33])
            homeruns_allowed = fix_empty(each_team[34])
            walks_allowed = fix_empty(each_team[35])
            errors = fix_empty(each_team[37])
            double_plays = fix_empty(each_team[38])
            fielding_pct = fix_empty(each_team[39])
            park = each_team[41]
            attendance_total = fix_empty(each_team[42])

            team = [team_ID,year_ID,team_name,rank,games,home_games,wins,losses,runs,at_bats,hits,doubles,triples,homeruns,walks,stolen_bases,caught_stealing,batters_hit,opponent_runs,opponent_earned_runs,complete_games,shutouts,saves,outs_pitched,hits_allowed,homeruns_allowed,walks_allowed,errors,double_plays,fielding_pct,park,attendance_total]
            team_writer.writerow(team)
