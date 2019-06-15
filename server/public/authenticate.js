const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = Login.querySelector('.email').value
  const password = Login.querySelector('.password').value
  post('/login', { email, password })
    // .then(({ status }) => {
    //   if (status === 200) alert('login success')
    //   else alert('login failed')
    // })
    .then(function(json) {
        var obj = JSON.parse(json);
        alert(obj[0].games);
    })
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}.then(function(response) {
    if (response.ok) {
        return response.text();  //To retrieve raw response data
    }
})
}
