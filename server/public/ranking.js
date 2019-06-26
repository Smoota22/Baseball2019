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
                var page_num = (i / 10) + 1;
                var idx_on_page = i % 10;
                display_rankings(query_result_obj, page_num, idx_on_page);
                return;
            }
        }
    });
}

function display_rankings(query_result_obj, page_num, idx_on_page) {
    reset_html_element("#display_rankings_container", RESET_DISPLAY_RANKINGS);
    var $attribute_header = $("#attribute_header");
    var html = $.parseHTML(ranking_attribute_verbose);
    $attribute_header.append(html);
}
