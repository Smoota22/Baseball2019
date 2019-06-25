const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = Login.querySelector('.email').value
  const password = Login.querySelector('.password').value
  post('/login', { email, password })
    .then(({ status }) => {
      if (status === 200) alert('login success')
      else alert('login failed')
    })
    // .then(function(json) {
    //     var obj = JSON.parse(json);
    //     alert(json);
    // })
})
