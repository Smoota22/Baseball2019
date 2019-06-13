//Loading team data from inputted team ID and year
const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  const teamID = LoadTeamData.querySelector('.txt_teamID').value
  const yearID = LoadTeamData.querySelector('.txt_yearID').value
  var response = post('/load_team_data/submit', {teamID, yearID})
  alert(response)
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
// var curr_team_name = ""
// var curr_year = ""
// $(document).ready(function () {
//   //Selecting Team From Dropdown
//   $('ul.dropdown-menu li').click(function() {
//       curr_team_name = $(this).text();
//       var curr_team_id =
//   });
// });

function post (path, data) {
  var myInit = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }}

  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(function(response) {
    if (response.ok) {
        return response.text();
    }
}).then(function(json) {
    var obj = JSON.parse(json);
    alert(obj[0].games);
})
}
