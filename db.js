const { Client } = require('pg')

const client = new Client({
            user: 'root',
            host:'localhost',
            database: 'api',
            password:'password',
            port: 5432
        })
        client.connect(err => {
            if (err) {
              console.error('connection error', err.stack)
            } else {
              console.log('connected')
            }
          })

module.exports = client