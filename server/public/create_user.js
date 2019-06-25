const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const first_name = CreateUser.querySelector('.first_name').value
  const last_name = CreateUser.querySelector('.last_name').value
  const email = CreateUser.querySelector('.email').value
  const password = CreateUser.querySelector('.password').value
  post('/createUser', {first_name, last_name, email, password})
})
