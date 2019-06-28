const sql_dict = {
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
"attendance_total": "Season Total Attendance"};

//  0: don't rank
// -1: rank DESCending
//  1: rank ASCending
const sql_ranking_dict = {
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
}

localStorage.setItem("sql_dict", sql_dict);
localStorage.setItem("sql_ranking_dict", sql_ranking_dict);

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
