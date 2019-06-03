const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  response = get('/load_team_data', {})
  alert(JSON.stringify(response))
  // document.getElementById("display_btn").innerHTML = "response";
})

function get (path) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
}).then(response => response.json())
}
