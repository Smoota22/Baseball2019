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
