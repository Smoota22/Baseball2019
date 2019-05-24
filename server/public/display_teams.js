const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  response = get('/load_team_data', {})

  response.then(function(result) {
    document.write(result)
});
})

function get (path) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
