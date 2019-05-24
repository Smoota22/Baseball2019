const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  const first_name = CreateUser.querySelector('.first_name').value
  const last_name = CreateUser.querySelector('.last_name').value
  const email = CreateUser.querySelector('.email').value
  const password = CreateUser.querySelector('.password').value
  get('/load_team_data', {})
})

function get (path, data) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
