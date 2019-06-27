const RESET_DISPLAY_RANKINGS = '<div id="display_rankings_container" class="container"> <table id="display_rankings_table" class="table table-striped table-hover table-sm"> <thead> <tr> <th>Team Name</th> <th>Year</th> <th>Overall Ranking</th> <th id="attribute_header"></th> </tr></thead> <tbody ng-repeat="e in data.events" id="display_rankings_body"></tbody> </table> </div>';
var curr_team_id; //do null check when creating ranking table because could be null if page is user loaded
var curr_year;
var curr_team_name;
var ranking_attribute_mysql;
var ranking_attribute_verbose;
var rankings_obj;
//do query and load rankings
function load_rankings() {
    var path = "ranking/" + ranking_attribute_mysql;
    get(path)
    .then(function(json) {
        if (json === undefined) {
            return;
        }
        rankings_obj = JSON.parse(json);
        for (i = 0; i < rankings_obj.length; i++) {
            if (rankings_obj[i].team_ID === curr_team_id && rankings_obj[i].year_ID == curr_year) {
                display_rankings(i);
                return;
            }
        }
    });
}

function display_rankings(i) {
    reset_html_element("#display_rankings_container", RESET_DISPLAY_RANKINGS);
    var $attribute_header = $("#attribute_header");
    $attribute_header.append($.parseHTML(ranking_attribute_verbose));

    var $display_rankings_body = $("#display_rankings_body");
    var start_idx = Math.floor(i / 10) * 10;
    var end_idx = Math.min(start_idx + 10, rankings_obj.length);
    for (var i = start_idx; i < end_idx; i++) {
        var ranking_table_row = generate_ranking_table_row(i);
        $display_rankings_body.append($.parseHTML(ranking_table_row));
    }

    load_pages(i);
}

function generate_ranking_table_row(idx) {
    var query_row = rankings_obj[idx];
    item_stat = query_row[ranking_attribute_mysql];
    item_team_ID = query_row.team_ID;
    item_year_ID = query_row.year_ID;
    item_team_name = query_row.team_name;
    if (item_stat === -1) {
        item_stat = "N/A";
    }

    var str = "<tr class=\"ranking_item";
    if (item_team_ID === curr_team_id && item_year_ID == curr_year) {
        str += " table-info";
    }
    str += "\" ";
    str += "id=\"" + item_team_ID + "*" + item_year_ID + "*" + item_team_name + "*" + idx + "\">";
    str += "<td>" + item_team_name + "</td>";
    str += "<td>" + item_year_ID + "</td>";
    str += "<td>" + (idx+1) + "</td>";
    str += "<td>" + item_stat + "</td>";
    str += "</tr>";
    return str;
}

function load_pages(idx) {
    var num_pages = Math.ceil(rankings_obj.length / 10);
    var curr_page = Math.floor(idx / 10) + 1;
    var num_page_digits = curr_page.toString().length;
    var visible_pages = Math.floor($("#display_rankings_table").width()/55);

    window.pagObj = $('#ranking_pagination').twbsPagination({
        totalPages: num_pages,
        visiblePages: visible_pages,
        startPage: curr_page,
        // onPageClick: function (event, page) {
        //     // console.info(page + ' (from options)');
        //     var start_idx = (page - 1) * 10;
        //     alert("TEST");
        //     // display_rankings(start_idx);
        // }
    })
    .on('page', function (event, page) {
        // console.info(page + ' (from event listening)');
        var start_idx = (page - 1) * 10;
        display_rankings(start_idx);
    });
}

$(document).ready(function () {
    curr_team_id = localStorage.getItem("curr_team_id"); //do null check when creating ranking table because could be null if page is user loaded
    curr_year = localStorage.getItem("curr_year");
    curr_team_name = localStorage.getItem("curr_team_name");
    ranking_attribute_mysql = localStorage.getItem("ranking_attribute_mysql");
    ranking_attribute_verbose = localStorage.getItem("ranking_attribute_verbose");
    load_rankings();
    // $(".pagination").rPage();

    var path = "/ranking_dropdown";
    get(path)
    .then(function(json) {
        if (json === undefined) {
            alert("DESCRIBE query undefined")
            return;
        }
        var attributes_obj = JSON.parse(json);
        for (i = 0; i < attributes.length; i++) {
            alert(attributes[i]);
        }
    });

    $(document).on("click", ".ranking_item", function(event) {
        var curr_team_year = event.target.parentNode.id;
        var param_arr = curr_team_year.split("*");
        curr_team_id = param_arr[0];
        curr_year = param_arr[1];
        curr_team_name = param_arr[2];
        localStorage.setItem("curr_team_id", curr_team_id);
        localStorage.setItem("curr_year", curr_year);
        localStorage.setItem("curr_team_name", curr_team_name);
        var curr_idx = param_arr[3];
        display_rankings(curr_idx);
    });
});
