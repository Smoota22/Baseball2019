const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser ({email, password}) {
    console.log(`Add user ${email}`)
    const { salt, hash } = saltHashPassword({ password })
    return knex('user').insert({
        ID: 0,
        first_name: first_name,
        last_name: last_name,
        email: email,
        salt: salt,
        encrypted_password: hash
  })
}}
//   authenticate ({ username, password }) {
//     console.log(`Authenticating user ${username}`)
//     return knex('user').where({ username })
//       .then(([user]) => {
//         if (!user) return { success: false }
//         const { hash } = saltHashPassword({
//           password,
//           salt: user.salt
//         })
//         return { success: hash === user.encrypted_password }
//       })
//   }
// }

function saltHashPassword ({
  password,
  salt = randomString()
}) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}


// const crypto = require('crypto')
// const knex = require('knex')(require('./knexfile'))
// module.exports = {
//   saltHashPassword,
//   createUser ({ username, password }) {
//     console.log(`Add user ${username}`)
//     const { salt, hash } = saltHashPassword(password)
//     return knex('user').insert({
//       salt,
//       encrypted_password: hash,
//       username
//     })
//   }
// }
// function saltHashPassword (password) {
//   const salt = randomString()
//   const hash = crypto
//     .createHmac('sha512', salt)
//     .update(password)
//   return {
//     salt,
//     hash: hash.digest('hex')
//   }
// }
// function randomString () {
//   return crypto.randomBytes(4).toString('hex')
// }
