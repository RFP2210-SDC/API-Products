const { Client } = require('pg');

const client = new Client({
  password: "none"
})


const doWork = async function() {
  await client.connect()
  try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
  } catch (err) {
    console.log(err);
  }
}

doWork();
