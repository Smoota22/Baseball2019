// Loading team data from inputted team ID and year
// const LoadTeamData = document.querySelector('.LoadTeamData')
// LoadTeamData.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const teamID = LoadTeamData.querySelector('.txt_teamID').value
//   const yearID = LoadTeamData.querySelector('.txt_yearID').value
//   post('/load_team_data/submit_team', {teamID, yearID})
// })

// var team_dict = {
//     "Arizona Diamondbacks" : "ARI",
//     "Atlanta Braves" : "ATL",
//     "Baltimore Orioles" : "BAL",
//     "Boston Red Sox" : "BOS",
//     "Chicago Cubs" : "CHN",
//     "Chicago White Sox" : "CHA",
//     "Cincinnati Reds" : "CIN",
//     "Cleveland Indians" : "CLE",
//     "Colorado Rockies" : "COL",
//     "Detroit Tigers" : "DET",
//     "Houston Astros" : "HOU",
//     "Kansas City Royals" : "KCA",
//     "Los Angeles Angels" : "LAA",
//     "Los Angeles Dodgers" : "LAN",
//     "Miami Marlins" : "MIA",
//     "Milwaukee Brewers" : "MIL",
//     "Minnesota Twins" : "MIN",
//     "New York Mets" : "NYN",
//     "New York Yankees" : "NYA",
//     "Oakland Athletics" : "OAK",
//     "Philadelphia Phillies" : "PHI",
//     "Pittsburgh Pirates" : "PIT",
//     "San Diego Padres" : "SDN",
//     "Seattle Mariners" : "SEA",
//     "San Francisco Giants" : "SFN",
//     "St. Louis Cardinals" : "SLN",
//     "Tampa Bay Rays" : "TBA",
//     "Texas Rangers" : "TEX",
//     "Toronto Blue Jays" : "TOR",
//     "Washington Nationals" : "WAS",
// };
const RESET_TEAM_SUGGESTIONS = '<div id="team_suggestions"></div>';
const RESET_YEAR_SUGGESTIONS = '<div id="year_suggestions"></div>';
const MAX_SUGGESTIONS = 10;
const RESET_DISPLAY_TEAM_TABLES = '<div id="display_team_tables" class="container"> <div class="jumbotron" id="display_team_season"></div><div class="row"> <div class="col-md-4"> <table id="display_team_stats_general" class="table table-striped"></table> </div><div class="col-md-4"> <table id="display_team_stats_offense" class="table table-striped"></table> </div><div class="col-md-4"> <table id="display_team_stats_defense" class="table table-striped"></table> </div></div></div>';
const TEAM_STAT_ATTRIBUTES_MYSQL = ["park", "attendance_total", "rank", "games", "home_games", "wins", "losses", "runs", "at_bats", "hits", "doubles", "triples", "homeruns", "walks", "stolen_bases", "caught_stealing", "batters_hit", "opponent_runs", "opponent_earned_runs", "complete games", "shutouts", "saves", "outs_pitched", "hits_allowed", "homeruns_allowed", "walks_allowed", "errors", "double_plays"];
const TEAM_STAT_ATTRIBUTES_VERBOSE = ["Park Name", "Season Total Attendance", "Rank", "Games Played", "Home Games", "Wins", "Losses", "Runs Scored", "At-Bats", "Hits", "Doubles", "Triples", "Homeruns", "Walks", "Stolen Bases", "Caught Stealing", "Batters Hit", "Opponent Scored Runs", "Opponent Earned Runs", "Complete Games", "Shutouts", "Saves", "Outs Pitched", "Hits Allowed", "Homeruns Allowed", "Walks Allowed", "Errors", "Double Plays"];
const TEAM_STAT_GENERAL_START_INDEX = 0;
const TEAM_STAT_OFFENSE_START_INDEX = 7;
const TEAM_STAT_DEFENSE_START_INDEX = 17;

function autofill_team_names() {
    var search_team_name = $("#search_team").val();
    var path = '/autofill_team_names/' + search_team_name;
    get(path)
    .then(function(json) {
        // alert(json);
        $("#search_team_year").val("");
        $("#search_team_year").prop("disabled", true);
        if (json === undefined) {
            $("#team_suggestions").replaceWith(RESET_TEAM_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        // alert(query_result_obj.length);
        var $team_suggestions = $("#team_suggestions");
        // console.log($team_suggestions);
        $team_suggestions.replaceWith(RESET_TEAM_SUGGESTIONS);
        $team_suggestions = $("#team_suggestions");

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

            // var nodeNames = [];
            // // Gather the parsed HTML's node names
            // $.each( html, function( i, el ) {
            //   nodeNames[ i ] = "<li>" + el.nodeName + "</li>";
            // });
            //
            // // Insert the node names
            // $team_suggestions.append( "<h3>Node Names:</h3>" );
            // $( "<ol></ol>" )
            //   .append( nodeNames.join( "" ) )
            //   .appendTo( $team_suggestions );
        }
    });
}

function lock_in_team_name(locked_team_name, locked_team_ID) {
    $("#team_suggestions").replaceWith(RESET_TEAM_SUGGESTIONS);
    $("#search_team").val(locked_team_name);
    curr_team_id = locked_team_ID;
    $("#search_team_year").prop("disabled", false);
}

function autofill_years() {
    var search_year = $("#search_team_year").val();
    var path = '/autofill_years/' + curr_team_id + '/' + search_year;
    get(path)
    .then(function(json) {
        if (json === undefined) {
            $("#year_suggestions").replaceWith(RESET_YEAR_SUGGESTIONS);
            return;
        }
        var query_result_obj = JSON.parse(json);
        var $year_suggestions = $("#year_suggestions");
        $year_suggestions.replaceWith(RESET_YEAR_SUGGESTIONS);
        $year_suggestions = $("#year_suggestions");

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
    $("#year_suggestions").replaceWith(RESET_YEAR_SUGGESTIONS);
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
        alert(query_result_obj[0]["games"]);
        display_stats(query_result_obj[0]);
    });
}

function display_stats(season) {
    //Reset table
    var $display_team_tables = $("#display_team_tables");
    $display_team_tables.replaceWith(RESET_DISPLAY_TEAM_TABLES);
    $display_team_tables = $("#display_team_tables");

    //Display Team name and Season
    var $display_team_season = $("#display_team_season");
    var team_season = "<h1>" + season.team_name + "'s " + season.year_ID + " Season Statistics </h1>";
    display_team_season.append(team_season);

    //Display General Statistics
    var $display_team_stats_general = $("#display_team_stats_general");
    for (i = TEAM_STAT_GENERAL_START_INDEX; i < TEAM_STAT_OFFENSE_START_INDEX; i++) {
        var row = generate_table_row(TEAM_STAT_ATTRIBUTES_VERBOSE[i], season[TEAM_STAT_ATTRIBUTES_MYSQL[i]]);
        var html = $.parseHTML(row);
        display_team_stats_general.append(html);
    }
}

function generate_table_row(item_verbose, item_stat) {
    str = "<tr>";
    str += "<th>" + item_verbose + "</th>";
    str += "<th>" + item_stat + "</th>";
    str += "</tr>";
    return str;
}

$(document).ready(function () {
    $(document).on("click", ".team_name_item", function(event) {
        div_elem = event.target.parentNode.id;
        if (div_elem === "team_suggestions") {
            div_elem = event.target.id;
        }

        div_elem = div_elem.replace(/_/g, " ");
        param_arr = div_elem.split("*");
        team_name = param_arr[0];
        team_ID = param_arr[1];

        lock_in_team_name(team_name, team_ID);
    });

    $(document).on("click", ".year_item", function(event) {
        div_elem = event.target.parentNode.id;
        if (div_elem === "year_suggestions") {
            div_elem = event.target.id;
        }

        team_ID = curr_team_id;
        year_ID = div_elem;

        lock_in_team_year(team_ID, year_ID);
    });

    $("#search_team").focus(function() {
        $("#year_suggestions").replaceWith(RESET_YEAR_SUGGESTIONS);
    });

    $("#search_team_year").focus(function() {
        $("#team_suggestions").replaceWith(RESET_TEAM_SUGGESTIONS);
    });

    $("#search_team").bind("keyup mouseenter", autofill_team_names);
    $("#search_team_year").bind("keyup mouseenter", autofill_years);


  //Selecting Team From Dropdown
//   $('#team-menu li').click(function() {
//       curr_team_id = team_dict[$(this).text()];
//       if (curr_year != "") {
//           alert(curr_team_id + curr_year);
//           post('/load_team_data/submit', {curr_team_id, curr_year})
//             .then(function(json) {
//               var query_result_obj = JSON.parse(json);
//               display_team(query_result_obj);
//           })
//       }
//   });
//
//   $('#year-menu li').click(function() {
//       curr_year = $(this).text();
//       if (curr_team_id != "") {
//           alert(curr_team_id + curr_year);
//           post('/load_team_data/submit', {curr_team_id, curr_year})
//             .then(function(json) {
//               var query_result_obj = JSON.parse(json);
//               display_team(query_result_obj);
//           })
//       }
//   });
});

//TODO: display all the returned data into nice looking HTML structures.
// function display_team(jsquery_result_obj) {
//     alert(jsquery_result_obj[0].games)
// }

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(function(response) {
    if (response.ok) {
        return response.text();  //To retrieve raw response data
    }
})
// .then(function(json) {
//     var query_result_obj = JSON.parse(json);
//     alert(query_result_obj[0].games);
// })
}

function get (path) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
}).then(function(response) {
    if (response.ok) {
        return response.text();  //To retrieve raw response data
    }
})
}