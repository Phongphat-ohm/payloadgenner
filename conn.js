import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
    host: "satao.db.elephantsql.com",
    user: "mtrkomvv",
    password: "0C6-50Wh_VlxgU6NP-_aSLo6c-UFTNS9",
    database: "mtrkomvv"
});

client.connect()
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.error("Error connecting to the database:", err);
    });

export default client;
