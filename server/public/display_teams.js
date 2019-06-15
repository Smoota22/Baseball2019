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
var curr_team_id = ""
var curr_year = ""

function autofill_team_names() {
    var search_team_name = $("#search_team").val();
    var path = '/autofill_team_names/' + search_team_name;
    get(path)
    .then(function(json) {
        // alert(json);
        if (json === undefined) {
            $("#team_suggestions").replaceWith(RESET_TEAM_SUGGESTIONS);
            return;
        }
        var obj = JSON.parse(json);
        // alert(obj.length);
        var $team_suggestions = $("#team_suggestions");
        // console.log($team_suggestions);
        $team_suggestions.replaceWith(RESET_TEAM_SUGGESTIONS);
        $team_suggestions = $("#team_suggestions");

        for (i = 0; i < obj.length; i++) {
            if (obj[i].team_name.toLowerCase() === $("#search_team").val().toLowerCase()) {
                lock_in_team_name(obj[i].team_name, obj[i].team_ID);
                return;
            }

            $("#search_team_year").val("");
            $("#search_team_year").prop("disabled", true);
            var team_name_id = obj[i].team_name + "*" + obj[i].team_ID;
            team_name_id = team_name_id.replace(/ /g, "_");

            var str = "<div class='team_name_item' id=" + team_name_id + "><p>" + obj[i].team_name + "</p></div>";
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
    var path = '/autofill_years/' + curr_team_id;
    get(path)
    .then(function(json) {
        if (json === undefined) {
            $("#year_suggestions").replaceWith(RESET_YEAR_SUGGESTIONS);
            return;
        }
        var obj = JSON.parse(json);
        var $year_suggestions = $("#year_suggestions");
        $year_suggestions.replaceWith(RESET_YEAR_SUGGESTIONS);
        $year_suggestions = $("#year_suggestions");

        for (i = 0; i < obj.length; i++) {
            if (obj[i].year_ID === $("#search_team_year").val()) {
                lock_in_team_year(curr_team_id, obj[i].year_ID);
                return;//TODO
            }

            var year_id = obj[i].year_ID;

            var str = "<div class='year_item' id=" + year_id + "><p>" + obj[i].year_ID + "</p></div>";
            var html = $.parseHTML(str);
            $year_suggestions.append(html);

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

function lock_in_team_year(locked_team_ID, locked_year_ID) {
    $("#year_suggestions").replaceWith(RESET_YEAR_SUGGESTIONS);
    $("#search_team_year").val(locked_year_ID);
    curr_year = locked_year_ID;
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

    $("#search_team").bind("keyup mouseenter", autofill_team_names);
    $("#search_team_year").bind("keyup mouseenter", autofill_years);


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
