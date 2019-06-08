const LoadTeamData = document.querySelector('.LoadTeamData')
LoadTeamData.addEventListener('submit', (e) => {
  e.preventDefault()
  response = post('/load_team_data', {})
  alert(response)
  // document.getElementById("display_btn").innerHTML = "response";
})

// function get (path) {
//   return window.fetch(path, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
// }).then(response => response.json())
// }

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
