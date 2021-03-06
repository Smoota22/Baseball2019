const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser ({first_name, last_name, email, password}) {
    console.log(`Add user ${email}`)
    const { salt, hash } = saltHashPassword({ password })
    return knex('user').insert({
        first_name: first_name,
        last_name: last_name,
        email: email,
        salt: salt,
        encrypted_password: hash
  })
},
  authenticate ({ email, password }) {
    console.warn(`Authenticating user ${email}`)
    return knex('user').where({ email })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        return { success: hash === user.encrypted_password }
      })
  }
}

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
