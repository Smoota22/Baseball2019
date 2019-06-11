const LoadTeamDatasdasadsa = document.querySelector('.LoadTeamData')
// LoadTeamDat.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const teamID = LoadTeamDat.querySelector('.txt_teamID').value
//   const yearID = LoadTeamDat.querySelector('.txt_yearID').value
//   post('/load_team_data/submit', {teamID, yearID})
// })

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
