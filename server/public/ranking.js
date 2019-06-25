const RESET_DISPLAY_RANKINGS = '<div id="display_rankings_container" class="container"> <table id="display_rankings_table" class="table table-striped table-hover"> <thead id="display_rankings_head"></thead> <tbody ng-repeat="e in data.events" id="display_rankings_body"></tbody> </table> </div>'
var curr_team_id = localStorage.getItem("curr_team_id"); //do null check when creating ranking table because could be null if page is user loaded
var curr_year = localStorage.getItem("curr_year");
var ranking_attribute = localStorage.getItem("ranking_attribute");
//do query and load rankings
// function load_rankings() {
//     var path = "ranking/" + ranking_attribute;
//     get(path)
//     .then(function(json) {
//         if (json === undefined) {
//             return;
//         }
//         var query_result_obj = JSON.parse(json);
//         for (i = 0; i < query_result_obj.length; i++) {
//             if (query_result_obj[i].team_ID === curr_team_id) {
//                 var page_num = (i / 10) + 1;
//                 var idx_on_page = i % 10;
//                 display_rankings(query_result_obj, page_num, idx_on_page);
//                 return;
//             }
//         }
//     });
// }
//
// function display_rankings(query_result_obj, page_num, idx_on_page) {
//
// }
