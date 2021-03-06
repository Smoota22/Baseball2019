import csv
import mysql.connector

# File names

input_people_file = "../RAW-baseballdatabank-2019.2/core/People.csv"
output_players_file = "../AUG-baseballdata/AUG_Players.csv"

def format_birthday(birth_year, birth_month, birth_day):
    if (birth_month and birth_day):
        if (int(birth_month) < 10):
            birth_month = "0" + birth_month
        if (int(birth_day) < 10):
            birth_day = "0" + birth_day

        return (birth_year + "-" + birth_month + "-" + birth_day)
    else:
        return "1000-01-01"

def fix_empty(integer_value):
    if (not integer_value):
        integer_value = -1
    return integer_value

with open(input_people_file) as f1, open(output_players_file, "w") as output:
    people_reader = csv.reader(f1, delimiter=",")
    player_writer = csv.writer(output, delimiter=",", lineterminator='\n')

    i = 0
    for each_person in people_reader:
        if i == 0:
            i += 1
        else:
            ID = each_person[23]
            first_name = each_person[13]
            last_name = each_person[14]
            birthday = format_birthday(each_person[1], each_person[2], each_person[3])
            weight = fix_empty(each_person[16])
            height = fix_empty(each_person[17])
            bats = each_person[18]
            throws = each_person[19]

            if first_name == "":
                first_name = "{Unknown}"
            if last_name == "":
                last_name = "{Unknown}"
            full_name = first_name + " " + last_name;

            person = [ID, first_name, last_name, full_name, birthday, weight, height, bats, throws]
            player_writer.writerow(person)
