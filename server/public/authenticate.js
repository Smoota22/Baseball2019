const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const first_name = CreateUser.querySelector('.first_name').value
  const last_name = CreateUser.querySelector('.last_name').value
  const email = CreateUser.querySelector('.email').value
  const password = CreateUser.querySelector('.password').value
  post('/createUser', {first_name, last_name, email, password})
})

// const Login = document.querySelector('.Login')
// Login.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const username = Login.querySelector('.username').value
//   const password = Login.querySelector('.password').value
//   post('/login', { username, password })
//     .then(({ status }) => {
//       if (status === 200) alert('login success')
//       else alert('login failed')
//     })
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


// const CreateUser = document.querySelector('.CreateUser')
// CreateUser.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const username = CreateUser.querySelector('.username').value
//   const password = CreateUser.querySelector('.password').value
//   post('/createUser', { username, password })
// })
// function post (path, data) {
//   return window.fetch(path, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
// }
