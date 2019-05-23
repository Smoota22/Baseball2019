import csv
import mysql.connector

# File names

input_people_file = "../RAW-baseballdatabank-2019.2/core/People.csv"
output_players_file = "../AUG-baseballdata/AUG_Players.csv"

players = {}

def format_birthday(birth_year, birth_month, birth_day):
    if (birth_month and birth_day):
        if (int(birth_month) < 10):
            birth_month = "0" + birth_month
        if (int(birth_day) < 10):
            birth_day = "0" + birth_day

        return (birth_year + "-" + birth_month + "-" + birth_day)
    else:
        return ""


with open(input_people_file) as f1, open(output_players_file, "w") as output:
    people_reader = csv.reader(f1, delimiter=",")
    player_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_person in people_reader:
        if i == 0:
            i += 1
        else:
            ID = 0
            first_name = each_person[13]
            last_name = each_person[14]
            birthday = format_birthday(each_person[1], each_person[2], each_person[3])
            weight = each_person[16]
            height = each_person[17]
            bats = each_person[18]
            throws = each_person[19]
            person = [ID, first_name, last_name, birthday, weight, height, bats, throws]
            player_writer.writerow(person)
