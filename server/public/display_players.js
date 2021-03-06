const RESET_PLAYER_SUGGESTIONS = '<div id="player_suggestions"></div>';
const RESET_YEAR_SUGGESTIONS = '<div id="year_suggestions"></div>';
const RESET_STINT_SUGGESTIONS = '<div id="stint_suggestions"></div>';
const RESET_TEAMID_SUGGESTIONS = '<div id="teamID_suggestions"></div>';
const RESET_LEAGUEID_SUGGESTIONS = '<div id="leagueID_suggestions"></div>';
const MAX_SUGGESTIONS = 10;
const RESET_DISPLAY_PLAYER_TABLES = '<div id="display_player_tables" class="container"> <div class="jumbotron" id="display_player_season"></div><div class="container"> <h3>General</h3> <table id="display_player_stats_general" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_player_stats_general_body"></tbody> </table> </div><div class="row"> <div id="pitching_table_div" class="container"> <h3 id="pitching_label">Pitching</h3> <table id="display_player_stats_pitching" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_player_stats_pitching_body"></tbody> </table> </div><div id="batting_table_div" class="container"> <h3 id="batting_label">Batting</h3> <table id="display_player_stats_batting" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_player_stats_batting_body"></tbody> </table> </div><div id="fielding_table_div" class="container"> <h3 id="fielding_label">Fielding</h3> <table id="display_player_stats_fielding" class="table table-striped table-hover"> <tbody ng-repeat="e in data.events" id="display_player_stats_fielding_body"></tbody> </table> </div></div></div>';
const RESET_HIDE_PLAYER_TABLES = '<div id="display_player_tables" class="container"></div>';
const PLAYER_STAT_ATTRIBUTES_MYSQL = ["ID", "first_name", "last_name", "birthday", "weight", "height", "bats", "throws"];
const PITCHING_STAT_ATTRIBUTES_MYSQL = ["wins", "losses", "games", "games_started", "complete_games", "shutouts", "saves", "total_outs", "hits", "earned_runs", "homeruns", "walks", "strikeouts", "opp_ba", "earned_run_avg", "intentional_walks", "runs_allowed", "batters_hit", "balks"];
const BATTING_STAT_ATTRIBUTES_MYSQL = ["games", "at_bats", "runs", "hits", "doubles", "triples", "homeruns", "rbis", "stolen_bases", "caught_stealing", "strikeouts", "intentional_walks", "hit_by_pitch"];
const FIELDING_STAT_ATTRIBUTES_MYSQL = ["position", "games", "games_started", "putouts", "assists", "errors", "double_plays", "catcher_stolen", "catcher_caught"];
const ENTER_KEY_ASCII = 13;
const UP_KEY_ASCII = 38;
const DOWN_KEY_ASCII = 40;
const PLAYER_NAME_FUNC = 101;
const PLAYER_YEAR_FUNC = 102;
const PLAYER_STINT_FUNC = 103;
const PLAYER_TEAM_FUNC = 104;
const PLAYER_LEAGUE_FUNC = 105;
const HIGHLIGHTED_SELECTION_CLASS = "p-1 bg-primary text-white";

var curr_player_id;
var curr_player_name;
var curr_year;
var curr_stint;
var curr_teamID;
var curr_team_name;
var curr_leagueID;

var curr_suggestion_id = -1;
var curr_suggestion_index;
var curr_suggestion_object;


function autofill_player_names(event) {
    var pressed_key = event.which;
    if (pressed_key === ENTER_KEY_ASCII && curr_suggestion_id != -1) {
        lock_in_helper(PLAYER_NAME_FUNC, curr_suggestion_id);
        return;
    }

    if (pressed_key == UP_KEY_ASCII || pressed_key == DOWN_KEY_ASCII) {
        scroll_suggestions(PLAYER_NAME_FUNC, pressed_key);
        return;
    }

    var search_player_name = $("#search_player").val();
    if (search_player_name === "") {
        reset_html_element("#player_suggestions", RESET_PLAYER_SUGGESTIONS);
        update_curr_selection(-1);
        return;
    }
    var path = '/autofill_player_names/' + search_player_name;

    disable_inputs(4);
    reset_html_element("#display_player_tables", RESET_HIDE_PLAYER_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#player_suggestions", RESET_PLAYER_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $player_suggestions = reset_html_element("#player_suggestions", RESET_PLAYER_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            var itr_full_name = query_result_obj[i].full_name;
            var itr_full_name_id = create_id_helper(PLAYER_NAME_FUNC, query_result_obj[i]);

            if (itr_full_name.toLowerCase() === $("#search_player").val().toLowerCase()) {
                lock_in_helper(PLAYER_NAME_FUNC, itr_full_name_id);
                return;
            }

            var str = "<div class='full_name_item' id=" + itr_full_name_id + "><p>" + itr_full_name + "</p></div>";
            var html = $.parseHTML(str);
            $player_suggestions.append(html);

            if (i === 0) {
                $(".full_name_item").addClass(HIGHLIGHTED_SELECTION_CLASS);
                curr_suggestion_id = itr_full_name_id;
                curr_suggestion_index = 0;
                curr_suggestion_object = query_result_obj;
            }
        }
    });
}

function lock_in_full_name(locked_full_name, locked_player_ID) {
    reset_html_element("#player_suggestions", RESET_PLAYER_SUGGESTIONS);
    $("#search_player").val(locked_full_name);
    curr_player_id = locked_player_ID;
    curr_player_name = locked_full_name;
    $("#search_player_year").prop("disabled", false);
}

function autofill_player_years() {
    if (event.which === ENTER_KEY_ASCII && curr_suggestion_id != -1) {
        lock_in_helper(PLAYER_YEAR_FUNC, curr_suggestion_id);
        return;
    }

    var search_year = $("#search_player_year").val();
    if (search_year === "") {
        search_year = "NULL";
    }
    var path = '/autofill_player_years/' + curr_player_id + '/' + search_year;

    disable_inputs(3);
    reset_html_element("#display_player_tables", RESET_HIDE_PLAYER_TABLES);

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
            var itr_year_id = create_id_helper(PLAYER_YEAR_FUNC, query_result_obj[i]);

            if (itr_year_id == $("#search_player_year").val()) {
                lock_in_helper(PLAYER_YEAR_FUNC, itr_year_id);
                return;
            }

            var str = "<div class='year_item' id=" + itr_year_id + "><p>" + itr_year_id + "</p></div>";
            var html = $.parseHTML(str);
            $year_suggestions.append(html);

            if (i === 0) {
                $(".year_item").addClass(HIGHLIGHTED_SELECTION_CLASS);
                curr_suggestion_id = itr_year_id;
                curr_suggestion_index = 0;
                curr_suggestion_object = query_result_obj;
            }
        }
    });
}

function lock_in_player_year(locked_year_ID) {
    reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
    $("#search_player_year").val(locked_year_ID);
    curr_year = locked_year_ID;
    $("#search_player_stint").prop("disabled", false);
    autoset_player_stint();
}

function autoset_player_stint() {
    var path = '/autofill_player_stint/' + curr_player_id + '/' + curr_year + '/NULL';

    get(path)
    .then(function(json) {
        if (json === undefined) {
            return;
        }

        var query_result_obj = JSON.parse(json);
        if (query_result_obj.length == 1) {
            lock_in_player_stint(query_result_obj[0].stint);
        }
    });
}

function autofill_player_stint() {
    if (event.which === ENTER_KEY_ASCII && curr_suggestion_id != -1) {
        lock_in_helper(PLAYER_STINT_FUNC, curr_suggestion_id);
        return;
    }

    var search_stint = $("#search_player_stint").val();
    if (search_stint === "") {
        search_stint = "NULL"
    }
    var path = '/autofill_player_stint/' + curr_player_id + '/' + curr_year + '/' + search_stint;

    disable_inputs(2);
    reset_html_element("#display_player_tables", RESET_HIDE_PLAYER_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#stint_suggestions", RESET_STINT_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $stint_suggestions = reset_html_element("#stint_suggestions", RESET_STINT_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            var itr_stint = create_id_helper(PLAYER_STINT_FUNC, query_result_obj[i]);

            if (itr_stint == $("#search_player_stint").val()) {
                lock_in_helper(PLAYER_STINT_FUNC, itr_stint);
                return;
            }

            var str = "<div class='stint_item' id=" + itr_stint + "><p>" + itr_stint + "</p></div>";
            var html = $.parseHTML(str);
            $stint_suggestions.append(html);

            if (i === 0) {
                $(".stint_item").addClass(HIGHLIGHTED_SELECTION_CLASS);
                curr_suggestion_id = itr_stint;
                curr_suggestion_index = 0;
                curr_suggestion_object = query_result_obj;
            }
        }
    });
}

function lock_in_player_stint(locked_stint) {
    reset_html_element("#stint_suggestions", RESET_STINT_SUGGESTIONS);
    $("#search_player_stint").val(locked_stint);
    curr_stint = locked_stint;
    $("#search_player_teamID").prop("disabled", false);
    autoset_player_teamID();
}

function autoset_player_teamID() {
    var path = '/autofill_player_teamID/' + curr_player_id + '/' + curr_year + '/' + curr_stint + '/NULL';

    get(path)
    .then(function(json) {
        if (json === undefined) {
            return;
        }

        var query_result_obj = JSON.parse(json);
        if (query_result_obj.length == 1) {
            lock_in_player_teamID(query_result_obj[0].team_name, query_result_obj[0].team_ID);
        }
    });
}

function autofill_player_teamID() {
    if (event.which === ENTER_KEY_ASCII && curr_suggestion_id != -1) {
        lock_in_helper(PLAYER_TEAM_FUNC, curr_suggestion_id);
        return;
    }

    var search_teamID = $("#search_player_teamID").val();
    if (search_teamID === "") {
        search_teamID = "NULL"
    }
    var path = '/autofill_player_teamID/' + curr_player_id + '/' + curr_year + '/' + curr_stint + '/' + search_teamID;

    disable_inputs(1);
    reset_html_element("#display_player_tables", RESET_HIDE_PLAYER_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#teamID_suggestions", RESET_TEAMID_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $teamID_suggestions = reset_html_element("#teamID_suggestions", RESET_TEAMID_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            var itr_teamName = query_result_obj[i].full_name;
            var itr_team_name_id = create_id_helper(PLAYER_TEAM_FUNC, query_result_obj[i]);

            if (itr_teamName.toLowerCase() === $("#search_player_teamID").val().toLowerCase()) {
                lock_in_helper(PLAYER_TEAM_FUNC, itr_team_name_id);
                return;
            }

            var str = "<div class='teamID_item' id=" + itr_team_name_id + "><p>" + itr_teamName + "</p></div>";
            var html = $.parseHTML(str);
            $teamID_suggestions.append(html);

            if (i === 0) {
                $(".teamID_item").addClass(HIGHLIGHTED_SELECTION_CLASS);
                curr_suggestion_id = itr_team_name_id;
                curr_suggestion_index = 0;
                curr_suggestion_object = query_result_obj;
            }
        }
    });
}

function lock_in_player_teamID(locked_team_name, locked_teamID) {
    reset_html_element("#teamID_suggestions", RESET_TEAMID_SUGGESTIONS);
    $("#search_player_teamID").val(locked_team_name);
    curr_teamID = locked_teamID;
    curr_team_name = locked_team_name;
    $("#search_player_leagueID").prop("disabled", false);
    autoset_player_leagueID();
}

function autoset_player_leagueID() {
    var path = '/autofill_player_leagueID/' + curr_player_id + '/' + curr_year + '/' + curr_stint + '/' + curr_teamID + '/NULL';

    get(path)
    .then(function(json) {
        if (json === undefined) {
            return;
        }

        var query_result_obj = JSON.parse(json);
        if (query_result_obj.length == 1) {
            lock_in_player_leagueID(query_result_obj[0].league_ID);
        }
    });
}

function autofill_player_leagueID() {
    if (event.which === ENTER_KEY_ASCII && curr_suggestion_id != -1) {
        lock_in_helper(PLAYER_LEAGUE_FUNC, curr_suggestion_id);
        return;
    }

    var search_leagueID = $("#search_player_leagueID").val();
    if (search_leagueID === "") {
        search_leagueID = "NULL"
    }
    var path = '/autofill_player_leagueID/' + curr_player_id + '/' + curr_year + '/' + curr_stint + '/' + curr_teamID + '/' + search_leagueID;

    disable_inputs(0);
    reset_html_element("#display_player_tables", RESET_HIDE_PLAYER_TABLES);

    get(path)
    .then(function(json) {
        if (json === undefined) {
            reset_html_element("#leagueID_suggestions", RESET_LEAGUEID_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $leagueID_suggestions = reset_html_element("#leagueID_suggestions", RESET_LEAGUEID_SUGGESTIONS);

        var num_suggestions = Math.min(query_result_obj.length, MAX_SUGGESTIONS);
        for (i = 0; i < num_suggestions; i++) {
            var itr_leagueID = create_id_helper(PLAYER_LEAGUE_FUNC, query_result_obj[i]);

            if (itr_leagueID == $("#search_player_leagueID").val()) {
                lock_in_helper(PLAYER_LEAGUE_FUNC, itr_leagueID);
                return;
            }

            var str = "<div class='leagueID_item' id=" + itr_leagueID + "><p>" + itr_leagueID + "</p></div>";
            var html = $.parseHTML(str);
            $leagueID_suggestions.append(html);

            if (i === 0) {
                $(".leagueID_item").addClass(HIGHLIGHTED_SELECTION_CLASS);
                curr_suggestion_id = itr_leagueID;
                curr_suggestion_index = 0;
                curr_suggestion_object = query_result_obj;
            }
        }
    });
}

function lock_in_player_leagueID(locked_leagueID) {
    reset_html_element("#leagueID_suggestions", RESET_LEAGUEID_SUGGESTIONS);
    $("#search_player_leagueID").val(locked_leagueID);
    curr_leagueID = locked_leagueID;
    lock_in_season();
}

function disable_inputs(num) {
    update_curr_selection(-1);
    if (num == 0) {
        return;
    }
    $("#search_player_leagueID").val("");
    $("#search_player_leagueID").prop("disabled", true);
    reset_html_element("#leagueID_suggestions", RESET_LEAGUEID_SUGGESTIONS);
    num -= 1;

    if (num == 0) {
        return;
    }
    $("#search_player_teamID").val("");
    $("#search_player_teamID").prop("disabled", true);
    reset_html_element("#teamID_suggestions", RESET_TEAMID_SUGGESTIONS);
    num -= 1;

    if (num == 0) {
        return;
    }
    $("#search_player_stint").val("");
    $("#search_player_stint").prop("disabled", true);
    reset_html_element("#stint_suggestions", RESET_STINT_SUGGESTIONS);
    num -= 1;

    if (num == 0) {
        return;
    }
    $("#search_player_year").val("");
    $("#search_player_year").prop("disabled", true);
    reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
}

function lock_in_helper(func_const, item_stat) {
    if (func_const === PLAYER_NAME_FUNC) {
        handle_full_name_item(item_stat);
    } else if (func_const === PLAYER_YEAR_FUNC) {
        lock_in_player_year(item_stat);
    } else if (func_const === PLAYER_STINT_FUNC) {
        lock_in_player_stint(item_stat);
    } else if (func_const === PLAYER_TEAM_FUNC) {
        handle_team_item(item_stat);
    } else if (func_const === PLAYER_LEAGUE_FUNC) {
        lock_in_player_leagueID(item_stat);
    }

    update_curr_selection(-1);
}

function create_id_helper(func_const, curr_suggestion) {
    if (func_const === PLAYER_NAME_FUNC) {
        var itr_full_name = curr_suggestion.full_name;
        var itr_full_name_id = itr_full_name + "*" + curr_suggestion.ID;
        itr_full_name_id = itr_full_name_id.replace(/ /g, "_");
        return itr_full_name_id;
    } else if (func_const === PLAYER_YEAR_FUNC) {
        return curr_suggestion.year_ID;
    } else if (func_const === PLAYER_STINT_FUNC) {
        return curr_suggestion.stint;
    } else if (func_const === PLAYER_TEAM_FUNC) {
        var itr_teamName = curr_suggestion.team_name;
        var itr_team_name_id = itr_teamName + "*" + curr_suggestion.team_ID;
        itr_team_name_id = itr_team_name_id.replace(/ /g, "_");
        return itr_team_name_id;
    } else if (func_const === PLAYER_LEAGUE_FUNC) {
        return curr_suggestion.league_ID;
    }

    return -1;
}

function update_curr_selection(new_suggestion_id) {
    if (curr_suggestion_id != -1) {
        // alert(("PRE      #" + curr_suggestion_id));
        $(("#" + curr_suggestion_id)).removeClass(HIGHLIGHTED_SELECTION_CLASS);
        // $("#" + curr_suggestion_id).val("");
        // curr_suggestion_id = "#" + curr_suggestion_id;
        // alert($(curr_suggestion_id).val());
    }

    curr_suggestion_id = new_suggestion_id;

    if (curr_suggestion_id != -1) {
        // alert(("POST     #" + curr_suggestion_id));
        $(("#" + curr_suggestion_id)).addClass(HIGHLIGHTED_SELECTION_CLASS);
    }
}

function scroll_suggestions(curr_func, pressed_key) {
    if (pressed_key == UP_KEY_ASCII) {
        curr_suggestion_index = Math.max(curr_suggestion_index - 1, 0);
    } else {
        var num_suggestions = Math.min(curr_suggestion_object.length, MAX_SUGGESTIONS);
        curr_suggestion_index = Math.min(curr_suggestion_index + 1, num_suggestions - 1);
    }

    var new_suggestion_id = create_id_helper(curr_func, curr_suggestion_object[curr_suggestion_index]);
    update_curr_selection(new_suggestion_id);
}

async function lock_in_season() {
    var path = '/load_player_general_data/' + curr_player_id;
    var player = await get(path)
    .then(function(json) {
        if (json === undefined) {
            alert("ERROR THIS SHOULD NOT HAPPEN!!!");
            return;
        }
        return JSON.parse(json);
    });

    var pitching = await call_load_player_stats('pitching');
    var batting = await call_load_player_stats('batting');
    var fielding = await call_load_player_stats('fielding');

    display_stats(player, pitching, batting, fielding);
}

function call_load_player_stats(table) {
    var path = '/load_player_stats/' + table + '/' + curr_player_id + '/' + curr_year + '/' + curr_stint + '/' + curr_teamID + '/' + curr_leagueID;
    return get(path)
    .then(function(json) {
        if (json === undefined) {
            alert("ERROR THIS SHOULD NOT HAPPEN!!!");
            return -1;
        }

        return JSON.parse(json);
    });
}

function reconcile_tables(pitching_length, batting_length, fielding_length) {
    var sum_num = 12;
    var num_tables = pitching_length + batting_length + fielding_length;
    var multipliers = [0, 0, 0];
    var attributes = ["pitching", "batting", "fielding"];

    multipliers[0] = pitching_length;
    multipliers[1] = batting_length;
    multipliers[2] = fielding_length;

    for (i = 0; i < multipliers.length; i++) {
        var size = (sum_num / num_tables) * multipliers[i];

        var curr_id = "#" + attributes[i] + "_table_div";
        var curr_class = "col-md-" + size;
        var curr_label = "#" + attributes[i] + "_label";
        if (multipliers[i] == 0) {
            $(curr_label).hide();
        }

        $(curr_id).addClass(curr_class);
    }
}

function display_stats(player, pitching, batting, fielding) {
    var curr_player = player[0];

    //Reset table
    var $display_player_tables = reset_html_element("#display_player_tables", RESET_DISPLAY_PLAYER_TABLES);

    //Display Team name and Season
    var $display_player_season = $("#display_player_season");
    var player_season = "<div><h1>" + curr_player_name + "'s " + curr_year + " Season Statistics With The " + curr_team_name + "</h1><h2>Stint: " + curr_stint + "</h2><h2>League: " + curr_leagueID + "</h2></div>";
    $display_player_season.append($.parseHTML(player_season));

    //Display General Statistics
    var $display_player_stats_general_body = $("#display_player_stats_general_body");
    for (i = 0; i < PLAYER_STAT_ATTRIBUTES_MYSQL.length; i++) {
        var curr_attr = PLAYER_STAT_ATTRIBUTES_MYSQL[i];
        var row = generate_table_row(curr_attr, curr_player[curr_attr]);
        $display_player_stats_general_body.append($.parseHTML(row));
    }

    //Decide which tables are needed
    reconcile_tables(pitching.length, batting.length, batting.length);

    //Display Pitching Statistics
    if (pitching.length === 1) {
        var curr_pitching = pitching[0];
        var $display_player_stats_pitching_body = $("#display_player_stats_pitching_body");
        for (i = 0; i < PITCHING_STAT_ATTRIBUTES_MYSQL.length; i++) {
            var curr_attr = PITCHING_STAT_ATTRIBUTES_MYSQL[i];
            var row = generate_table_row(curr_attr, curr_pitching[curr_attr]);
            $display_player_stats_pitching_body.append($.parseHTML(row));
        }
    }

    //Display Batting Statistics
    if (batting.length === 1) {
        var curr_batting = batting[0];
        var $display_player_stats_batting_body = $("#display_player_stats_batting_body");
        for (i = 0; i < BATTING_STAT_ATTRIBUTES_MYSQL.length; i++) {
            var curr_attr = BATTING_STAT_ATTRIBUTES_MYSQL[i];
            var row = generate_table_row(curr_attr, curr_batting[curr_attr]);
            $display_player_stats_batting_body.append($.parseHTML(row));
        }
    }

    //Display Fielding Statistics
    if (fielding.length === 1) {
        var curr_fielding = fielding[0];
        var $display_player_stats_fielding_body = $("#display_player_stats_fielding_body");
        for (i = 0; i < FIELDING_STAT_ATTRIBUTES_MYSQL.length; i++) {
            var curr_attr = FIELDING_STAT_ATTRIBUTES_MYSQL[i];
            var row = generate_table_row(curr_attr, curr_fielding[curr_attr]);
            $display_player_stats_fielding_body.append($.parseHTML(row));
        }
    }

}

function generate_table_row(item_attribute, item_stat) {
    if (item_stat === -1 || item_stat === "" || item_stat === "1000-01-01") {
        item_stat = "N/A";
    }

    if (item_stat === "R") {
        item_stat = "Right";
    } else if (item_stat === "L") {
        item_stat = "Left";
    }

    if (item_attribute === "birthday") {
        var arr = item_stat.split("T");
        var date = arr[0].split("-");
        item_stat = date[1] + "-" + date[2] + "-" + date[0];
    }

    var item_verbose = mysql_dict[item_attribute];

    var str = "<tr class=\"stat_item\" id=\"" + item_attribute + "*" + item_verbose + "\">";
    str += "<td>" + item_verbose + "</td>";
    str += "<td>" + item_stat + "</td>";
    str += "</tr>";
    return str;
}

function handle_full_name_item(full_name_item) {
    full_name_item = full_name_item.replace(/_/g, " ");
    var param_arr = full_name_item.split("*");
    var full_name = param_arr[0];
    var player_ID = param_arr[1];

    lock_in_full_name(full_name, player_ID);
}

function handle_team_item(team_item) {
    team_item = team_item.replace(/_/g, " ");
    var param_arr = team_item.split("*");
    var team_name = param_arr[0];
    var team_ID = param_arr[1];

    lock_in_player_teamID(team_name, team_ID);
}

$(document).ready(function () {
    // mysql_dict = localStorage.getItem("mysql_dict");
    // sql_ranking_dict = localStorage.getItem("sql_ranking_dict");
    curr_player_id = localStorage.getItem("curr_player_id");
    curr_year = localStorage.getItem("curr_year");
    curr_player_name = localStorage.getItem("curr_player_name");
    localStorage.removeItem("curr_player_id");
    localStorage.removeItem("curr_year");
    localStorage.removeItem("curr_player_name");
    if (curr_player_id != null && curr_year != null && curr_player_name != null) {
        $("#search_player").val(curr_player_name);
        $("#search_player_year").prop("disabled", false);
        $("#search_player_year").val(curr_year);
        // lock_in_season(curr_player_id, curr_year);
    } else {
        $("#search_player").val("");
        $("#search_player_year").val("");
    }

    $(document).on("click", ".full_name_item", function(event) {
        var div_elem = event.target.parentNode.id;
        if (div_elem === "player_suggestions") {
            div_elem = event.target.id;
        }
        lock_in_helper(PLAYER_NAME_FUNC, div_elem);
    });

    $(document).on("click", ".year_item", function(event) {
        var year_ID = event.target.parentNode.id;
        if (year_ID === "year_suggestions") {
            year_ID = event.target.id;
        }
        lock_in_helper(PLAYER_YEAR_FUNC, year_ID);
    });

    $(document).on("click", ".stint_item", function(event) {
        var stint = event.target.parentNode.id;
        if (stint === "stint_suggestions") {
            stint = event.target.id;
        }
        lock_in_helper(PLAYER_STINT_FUNC, stint);
    });

    $(document).on("click", ".teamID_item", function(event) {
        var div_elem = event.target.parentNode.id;
        if (div_elem === "teamID_suggestions") {
            div_elem = event.target.id;
        }
        lock_in_helper(PLAYER_TEAM_FUNC, div_elem);
    });

    $(document).on("click", ".leagueID_item", function(event) {
        var leagueID = event.target.parentNode.id;
        if (leagueID === "stint_suggestions") {
            leagueID = event.target.id;
        }
        lock_in_helper(PLAYER_LEAGUE_FUNC, leagueID);
    });

    $(document).on("click", ".stat_item", function(event) {
        var ranking_attribute_both = event.target.parentNode.id;
        var param_arr = ranking_attribute_both.split("*");
        var ranking_attribute_mysql = param_arr[0];
        var ranking_attribute_verbose = param_arr[1];
        if (player_mysql_ranking_dict[ranking_attribute_mysql] === 0 ||
            pitching_mysql_ranking_dict[ranking_attribute_mysql] === 0 ||
            batting_mysql_ranking_dict[ranking_attribute_mysql] === 0 ||
            fielding_mysql_ranking_dict[ranking_attribute_mysql] === 0) {
            alert("NOT RANKABLE");
            return;
        }

        localStorage.setItem("curr_player_id", curr_player_id);
        localStorage.setItem("curr_player_name", curr_player_name);
        localStorage.setItem("curr_year", curr_year);
        localStorage.setItem("curr_stint", curr_stint);
        localStorage.setItem("curr_teamID", curr_teamID);
        localStorage.setItem("curr_team_name", curr_team_name);
        localStorage.setItem("curr_leagueID", curr_leagueID);
        localStorage.setItem("ranking_attribute_mysql", ranking_attribute_mysql);
        localStorage.setItem("ranking_attribute_verbose", ranking_attribute_verbose);
        location.href = "ranking.html";
    });

    $("#search_player").focus(function() {
        reset_html_element("#year_suggestions", RESET_YEAR_SUGGESTIONS);
    });

    $("#search_player_year").focus(function() {
        reset_html_element("#player_suggestions", RESET_PLAYER_SUGGESTIONS);
    });

    $("#search_player").bind("keyup click", autofill_player_names);
    $("#search_player_year").bind("keyup click", autofill_player_years);
    $("#search_player_stint").bind("keyup click", autofill_player_stint);
    $("#search_player_teamID").bind("keyup click", autofill_player_teamID);
    $("#search_player_leagueID").bind("keyup click", autofill_player_leagueID);
});
