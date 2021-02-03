import { Connection, createConnection } from "mysql";

require("dotenv").config();

let connection: Connection;

const getConnection = (): Connection => {
  if (!connection) {
    const { HOST, USERNAME, PASSWORD, DB_NAME } = process.env;
    console.log(HOST, USERNAME, PASSWORD, DB_NAME);
    connection = createConnection({
      host: HOST,
      user: USERNAME,
      password: PASSWORD,
      database: DB_NAME,
    });

    connection.connect((err) => {
      if (err) throw err;
      console.log("connection established!");
    });
  }

  return connection;
};

export default getConnection;
