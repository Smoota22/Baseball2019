const RESET_DISPLAY_RANKINGS = '<div id="display_rankings_container" class="container"> <table id="display_rankings_table" class="table table-striped table-hover"> <thead> <tr> <th>Overall Ranking</th> <th id="attribute_header"></th> </tr></thead> <tbody ng-repeat="e in data.events" id="display_rankings_body"></tbody> </table> </div>'
var curr_team_id = localStorage.getItem("curr_team_id"); //do null check when creating ranking table because could be null if page is user loaded
var curr_year = localStorage.getItem("curr_year");
var ranking_attribute_mysql = localStorage.getItem("ranking_attribute_mysql");
var ranking_attribute_verbose = localStorage.getItem("ranking_attribute_verbose");
load_rankings();
//do query and load rankings
function load_rankings() {
    var path = "ranking/" + ranking_attribute_mysql;
    get(path)
    .then(function(json) {
        if (json === undefined) {
            return;
        }
        var query_result_obj = JSON.parse(json);
        for (i = 0; i < query_result_obj.length; i++) {
            if (query_result_obj[i].team_ID === curr_team_id) {
                display_rankings(query_result_obj, i);
                return;
            }
        }
    });
}

function display_rankings(query_result_obj, i) {
    reset_html_element("#display_rankings_container", RESET_DISPLAY_RANKINGS);
    var $attribute_header = $("#attribute_header");
    alert(ranking_attribute_verbose);
    $attribute_header.append($.parseHTML(ranking_attribute_verbose));

    var $display_rankings_body = $("#display_rankings_body");
    var start_idx = (i / 10) * 10;
    for (var i = start_idx; i < start_idx + 10; i++) {
        var ranking_table_row = generate_ranking_table_row(query_result_obj[i], i);
        $display_rankings_body.append($.parseHTML(ranking_table_row));
    }

}

function generate_ranking_table_row(query_row, idx) {
    item_stat = query_row[ranking_attribute_mysql];
    item_team_ID = query_row.team_ID;
    item_year_ID = query_row.year_ID;
    if (item_stat === -1) {
        item_stat = "N/A";
    }

    var str = "<tr class=\"ranking_item\" id=\"" + item_team_ID + "*" + item_year_ID + "\">";
    str += "<td>" + (idx+1) + "</td>";
    str += "<td>" + item_stat + "</td>";
    str += "</tr>";
    return str;
}
