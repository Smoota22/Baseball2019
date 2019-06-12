const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  const teamID = LoadTeamData.querySelector('.txt_teamID').value
  const yearID = LoadTeamData.querySelector('.txt_yearID').value
  var response = post('/load_team_data/submit', {teamID, yearID})
  alert(response)
})

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
    alert(obj.games);
    alert(json);
})
}
