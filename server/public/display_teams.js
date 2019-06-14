// Loading team data from inputted team ID and year
const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  const teamID = LoadTeamData.querySelector('.txt_teamID').value
  const yearID = LoadTeamData.querySelector('.txt_yearID').value
  post('/load_team_data/submit_team', {teamID, yearID})
})

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
var curr_team_id = ""
var curr_year = ""

function format_query_string_regex(query_string) {
    var query_string = query_string.toLowerCase();
    var split_string = query_string.split(" ");
    var regex = split_string.join('%');
    var regex = "%" + regex + "%";
    return regex;
}

function search_years() {
    var search_team_name = $("#search_team").val();
    var regex = format_query_string_regex(search_team_name);
    var path = '/load_team_IDs/' + search_team_name;
    get(path)
    // .then(function(json) {
    //               var obj = JSON.parse(json);
    //               alert(obj[0].team_ID);
    //           });
}

$(document).ready(function () {
    $("#search_team").bind("keyup mouseenter", search_years);


  //Selecting Team From Dropdown
//   $('#team-menu li').click(function() {
//       curr_team_id = team_dict[$(this).text()];
//       if (curr_year != "") {
//           alert(curr_team_id + curr_year);
//           post('/load_team_data/submit', {curr_team_id, curr_year})
//             .then(function(json) {
//               var obj = JSON.parse(json);
//               display_team(obj);
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
//               var obj = JSON.parse(json);
//               display_team(obj);
//           })
//       }
//   });
});

//TODO: display all the returned data into nice looking HTML structures.
// function display_team(jsObj) {
//     alert(jsObj[0].games)
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
//     var obj = JSON.parse(json);
//     alert(obj[0].games);
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
