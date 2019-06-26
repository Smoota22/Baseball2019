const RESET_TEAM_SUGGESTIONS = '<div id="team_suggestions"></div>';
const RESET_YEAR_SUGGESTIONS = '<div id="year_suggestions"></div>';
const MAX_SUGGESTIONS = 10;
const RESET_DISPLAY_TEAM_TABLES = '<div id="display_team_tables" class="container"> <div class="jumbotron" id="display_team_season"></div><div class="row"> <div class="col-md-4"> <table id="display_team_stats_general" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_team_stats_general_body"></tbody> </table> </div><div class="col-md-4"> <table id="display_team_stats_offense" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_team_stats_offense_body"></tbody> </table> </div><div class="col-md-4"> <table id="display_team_stats_defense" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_team_stats_defense_body"></tbody> </table> </div></div></div>';
const RESET_HIDE_TEAM_TABLES = '<div id="display_team_tables" class="container"></div>';
const TEAM_STAT_ATTRIBUTES_MYSQL = ["park", "attendance_total", "rank", "games", "home_games", "wins", "losses", "runs", "at_bats", "hits", "doubles", "triples", "homeruns", "walks", "stolen_bases", "caught_stealing", "batters_hit", "opponent_runs", "opponent_earned_runs", "complete_games", "shutouts", "saves", "outs_pitched", "hits_allowed", "homeruns_allowed", "walks_allowed", "errors", "double_plays"];
const TEAM_STAT_ATTRIBUTES_VERBOSE = ["Park Name", "Season Total Attendance", "Rank", "Games Played", "Home Games", "Wins", "Losses", "Runs Scored", "At-Bats", "Hits", "Doubles", "Triples", "Homeruns", "Walks", "Stolen Bases", "Caught Stealing", "Batters Hit", "Opponent Scored Runs", "Opponent Earned Runs", "Complete Games", "Shutouts", "Saves", "Outs Pitched", "Hits Allowed", "Homeruns Allowed", "Walks Allowed", "Errors", "Double Plays"];
const TEAM_STAT_GENERAL_START_INDEX = 0;
const TEAM_STAT_OFFENSE_START_INDEX = 7;
const TEAM_STAT_DEFENSE_START_INDEX = 17;

var curr_team_id;
var curr_team_name;
var curr_year;

function autofill_team_names() {
    var search_team_name = $("#search_team").val();
    if (search_team_name === "") {
        return;
    }
    var path = '/autofill_team_names/' + search_team_name;

    $("#search_team_year").val("");
    $("#search_team_year").prop("disabled", true);
    reset_html_element("#display_team_tables", RESET_HIDE_TEAM_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#team_suggestions", RESET_TEAM_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $team_suggestions = reset_html_element("#team_suggestions", RESET_TEAM_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            if (query_result_obj[i].team_name.toLowerCase() === $("#search_team").val().toLowerCase()) {
                lock_in_team_name(query_result_obj[i].team_name, query_result_obj[i].team_ID);
                return;
            }

            var team_name_id = query_result_obj[i].team_name + "*" + query_result_obj[i].team_ID;
            team_name_id = team_name_id.replace(/ /g, "_");

            var str = "<div class='team_name_item' id=" + team_name_id + "><p>" + query_result_obj[i].team_name + "</p></div>";
            var html = $.parseHTML(str);
            $team_suggestions.append(html);
        }
    });
}

function lock_in_team_name(locked_team_name, locked_team_ID) {
    reset_html_element("#team_suggestions", RESET_TEAM_SUGGESTIONS);
    $("#search_team").val(locked_team_name);
    curr_team_id = locked_team_ID;
    curr_team_name = locked_team_name;
    $("#search_team_year").prop("disabled", false);
}

function autofill_years() {
    var search_year = $("#search_team_year").val();
    var path = '/autofill_years/' + curr_team_id + '/' + curr_team_name + '/' + search_year;

    reset_html_element("#display_team_tables", RESET_HIDE_TEAM_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $year_suggestions = reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            if (query_result_obj[i].year_ID == $("#search_team_year").val()) {
                lock_in_team_year(curr_team_id, query_result_obj[i].year_ID);
                return;
            }

            var year_id = query_result_obj[i].year_ID;

            var str = "<div class='year_item' id=" + year_id + "><p>" + query_result_obj[i].year_ID + "</p></div>";
            var html = $.parseHTML(str);
            $year_suggestions.append(html);
        }
    });
}

function lock_in_team_year(locked_team_ID, locked_year_ID) {
    reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
    $("#search_team_year").val(locked_year_ID);
    curr_year = locked_year_ID;
    lock_in_season(curr_team_id, curr_year);
}

function lock_in_season(team_id, team_year) {
    var path = '/load_team_data/' + team_id + '/' + team_year;
    get(path)
    .then(function(json) {
        if (json === undefined) {
            alert("ERROR THIS SHOULD NOT HAPPEN!!!");
            return;
        }
        var query_result_obj = JSON.parse(json);
        // alert(query_result_obj[0]["games"]);
        display_stats(query_result_obj[0]);
    });
}

function display_stats(season) {
    //Reset table
    var $display_team_tables = reset_html_element("#display_team_tables", RESET_DISPLAY_TEAM_TABLES);

    //Display Team name and Season
    var $display_team_season = $("#display_team_season");
    var team_season = "<div><h1>" + season.team_name + "'s " + season.year_ID + " Season Statistics </h1></div>";
    $display_team_season.append($.parseHTML(team_season));

    //Display General Statistics
    var $display_team_stats_general_body = $("#display_team_stats_general_body");
    for (i = TEAM_STAT_GENERAL_START_INDEX; i < TEAM_STAT_OFFENSE_START_INDEX; i++) {
        var row = generate_table_row(TEAM_STAT_ATTRIBUTES_VERBOSE[i], TEAM_STAT_ATTRIBUTES_MYSQL[i], season[TEAM_STAT_ATTRIBUTES_MYSQL[i]]);
        var html = $.parseHTML(row);
        $display_team_stats_general_body.append(html);
    }

    //Display Offense Statistics
    var $display_team_stats_offense_body = $("#display_team_stats_offense_body");
    for (i = TEAM_STAT_OFFENSE_START_INDEX; i < TEAM_STAT_DEFENSE_START_INDEX; i++) {
        var row = generate_table_row(TEAM_STAT_ATTRIBUTES_VERBOSE[i], TEAM_STAT_ATTRIBUTES_MYSQL[i], season[TEAM_STAT_ATTRIBUTES_MYSQL[i]]);
        var html = $.parseHTML(row);
        $display_team_stats_offense_body.append(html);
    }

    //Display Defense Statistics
    var $display_team_stats_defense_body = $("#display_team_stats_defense_body");
    for (i = TEAM_STAT_DEFENSE_START_INDEX; i < TEAM_STAT_ATTRIBUTES_VERBOSE.length; i++) {
        var row = generate_table_row(TEAM_STAT_ATTRIBUTES_VERBOSE[i], TEAM_STAT_ATTRIBUTES_MYSQL[i], season[TEAM_STAT_ATTRIBUTES_MYSQL[i]]);
        var html = $.parseHTML(row);
        $display_team_stats_defense_body.append(html);
    }
}

function generate_table_row(item_verbose, item_attribute, item_stat) {
    if (item_stat === -1) {
        item_stat = "N/A";
    }

    var str = "<tr class=\"stat_item\" id=\"" + item_attribute + "*" + item_verbose + "\">";
    str += "<td>" + item_verbose + "</td>";
    str += "<td>" + item_stat + "</td>";
    str += "</tr>";
    return str;
}

$(document).ready(function () {
    curr_team_id = localStorage.getItem("curr_team_id");
    curr_year = localStorage.getItem("curr_year");
    curr_team_name = localStorage.getItem("curr_team_name");
    localStorage.removeItem("curr_team_id");
    localStorage.removeItem("curr_year");
    localStorage.removeItem("curr_team_name");
    if (curr_team_id != null && curr_year != null && curr_team_name != null) {
        $("#search_team").val(curr_team_name);
        $("#search_team_year").prop("disabled", false);
        $("#search_team_year").val(curr_year);
        lock_in_season(curr_team_id, curr_year);
    } else {
        $("#search_team").val("");
        $("#search_team_year").val("");
    }

    $(document).on("click", ".team_name_item", function(event) {
        var div_elem = event.target.parentNode.id;
        if (div_elem === "team_suggestions") {
            div_elem = event.target.id;
        }

        var div_elem = div_elem.replace(/_/g, " ");
        var param_arr = div_elem.split("*");
        var team_name = param_arr[0];
        var team_ID = param_arr[1];

        lock_in_team_name(team_name, team_ID);
    });

    $(document).on("click", ".year_item", function(event) {
        var div_elem = event.target.parentNode.id;
        if (div_elem === "year_suggestions") {
            div_elem = event.target.id;
        }

        var team_ID = curr_team_id;
        var year_ID = div_elem;

        lock_in_team_year(team_ID, year_ID);
    });

    $(document).on("click", ".stat_item", function(event) {
        var ranking_attribute_both = event.target.parentNode.id;
        var param_arr = ranking_attribute_both.split("*");
        var ranking_attribute_mysql = param_arr[0];
        var ranking_attribute_verbose = param_arr[1];
        localStorage.setItem("curr_team_id", curr_team_id);
        localStorage.setItem("curr_year", curr_year);
        localStorage.setItem("curr_team_name", curr_team_name);
        localStorage.setItem("ranking_attribute_mysql", ranking_attribute_mysql);
        localStorage.setItem("ranking_attribute_verbose", ranking_attribute_verbose);
        location.href = "ranking.html";
    });

    $("#search_team").focus(function() {
        reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
    });

    $("#search_team_year").focus(function() {
        reset_html_element("#team_suggestions", RESET_TEAM_SUGGESTIONS);
    });

    // $("#search_team").bind("keyup mouseenter", autofill_team_names); //for keyup AND mouse enter/hover
    $("#search_team").bind("keyup", autofill_team_names);
    // $("#search_team_year").bind("keyup mouseenter", autofill_years); //for keyup AND mouse enter/hover
    $("#search_team_year").bind("keyup", autofill_years);
});
