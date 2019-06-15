<<<<<<< HEAD
const Login = document.querySelector('.Login')
=======
const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const first_name = CreateUser.querySelector('.first_name').value
  const last_name = CreateUser.querySelector('.last_name').value
  const email = CreateUser.querySelector('.email').value
  const password = CreateUser.querySelector('.password').value
  post('/createUser', {first_name, last_name, email, password})
})

const Login = document.querySelector('.Login') 
>>>>>>> de94337a4270488b098aaadaa006b96cb14ad0ae
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = Login.querySelector('.email').value
  const password = Login.querySelector('.password').value
  post('/login', { email, password })
    // .then(({ status }) => {
    //   if (status === 200) alert('login success')
    //   else alert('login failed')
    // })
    // .then(function(json) {
    //     var obj = JSON.parse(json);
    //     alert(json);
    // })
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
  //   .then(function(response) {
  //     if (response.ok) {
  //         return response.text();  //To retrieve raw response data
  //     }
  // })
}
