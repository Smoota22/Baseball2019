const mysql_dict = {
"team_ID": "Team ID",
"year_ID": "Season Year",
"team_name": "Team Name",
"rank": "Rank",
"games": "Games",
"home_games": "Home Games",
"wins": "Wins",
"losses": "Losses",
"runs": "Runs",
"at_bats": "At Bats",
"hits": "Hits",
"doubles": "Doubles",
"triples": "Triples",
"homeruns": "Homeruns",
"walks": "Walks",
"stolen_bases": "Stolen Bases",
"caught_stealing": "Caught Stealing",
"batters_hit": "Batters Hit",
"opponent_runs": "Opponent Runs",
"opponent_earned_runs": "Opponent Earned Runs",
"complete_games": "Complete Games",
"shutouts": "Shutouts",
"saves": "Saves",
"outs_pitched": "Outs Pitched",
"hits_allowed": "Hits Allowed",
"homeruns_allowed": "Homeruns Allowed",
"walks_allowed": "Walks Allowed",
"errors": "Errors",
"double_plays": "Double Plays",
"fielding_pct": "Fielding Percentage",
"park": "Park Name",
"attendance_total": "Season Total Attendance",
"player_ID": "Player ID",
"stint": "Stint",
"league_ID": "League ID",
"games_started": "Games Started",
"total_outs": "Total Outs",
"earned_runs": "Opponent Earned Runs",
"strikeouts": "Strikeouts",
"opp_ba": "Opponent Batting Average",
"earned_run_avg": "Earned Run Average",
"intentional_walks": "Intentional Walks",
"runs_allowed": "Runs Allowed",
"batters_hit": "Batters Hit",
"balks": "Balks",
"position": "Position"
"putouts": "Putouts",
"assists": "Assists",
"catcher_stolen": "Stolen Bases (Catcher)",
"catcher_caught": "Caught Stealing (Catcher)"
};

//  0: don't rank
// -1: rank DESCending
//  1: rank ASCending
const teams_mysql_ranking_dict = {
    "team_ID": 0,
    "year_ID": 1,
    "team_name": 0,
    "rank": 1,
    "games": -1,
    "home_games": -1,
    "wins": -1,
    "losses": 1,
    "runs": -1,
    "at_bats": -1,
    "hits": -1,
    "doubles": -1,
    "triples": -1,
    "homeruns": -1,
    "walks": -1,
    "stolen_bases": -1,
    "caught_stealing": 1,
    "batters_hit": 1,
    "opponent_runs": 1,
    "opponent_earned_runs": 1,
    "complete_games": -1,
    "shutouts": -1,
    "saves": -1,
    "outs_pitched": -1,
    "hits_allowed": 1,
    "homeruns_allowed": 1,
    "walks_allowed": 1,
    "errors": 1,
    "double_plays": -1,
    "fielding_pct": -1,
    "park": 0,
    "attendance_total": -1
};

const pitching_mysql_ranking_dict = {
"player_ID": 0,
"year_ID": 1,
"stint": 0,
"team_ID": 0,
"league_ID": 0,
"wins": -1,
"losses": 1,
"games": -1,
"games_started": -1,
"complete_games": -1,
"shutouts": -1,
"saves": -1,
"total_outs": -1,
"hits": 1,
"earned_runs": 1,
"homeruns": 1,
"walks": 1,
"strikeouts": -1,
"opp_ba": 1,
"earned_run_avg": 1,
"intentional_walks": 1,
"runs_allowed": 1,
"batters_hit": 1,
"balks": 1
};

const batting_mysql_ranking_dict = {
"player_ID": 0,
"year_ID": 1,
"stint": 0,
"team_ID": 0,
"league_ID": 0,
"games": -1,
"at_bats": -1,
"runs": -1,
"hits": -1,
"doubles": -1,
"triples": -1,
"homeruns": -1,
"rbis": -1,
"stolen_bases": -1,
"caught_stealing": 1,
"strikeouts": 1,
"intentional_walks": -1,
"hit_by_pitch": -1
};

const fielding_mysql_ranking_dict = {
"player_ID": 0,
"year_ID": 1,
"stint": 0,
"team_ID": 0,
"league_ID": 0,
"position": 0,
"games": -1,
"games_started": -1,
"putouts": -1,
"assists": -1,
"errors": 1,
"double_plays": -1,
"catcher_stolen": -1,
"catcher_caught": -1
};



localStorage.setItem("mysql_dict", mysql_dict);
localStorage.setItem("teams_mysql_ranking_dict", teams_mysql_ranking_dict);

function reset_html_element(element_name, reset_const) {
    var $html_elem = $(element_name);
    $html_elem.replaceWith($.parseHTML(reset_const));
    return $(element_name);
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
