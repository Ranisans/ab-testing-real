import { Connection, createConnection } from "mysql";

require("dotenv").config();

let connection: Connection;

const getConnection = (): Connection => {
  if (!connection) {
    const { DD_HOST, DD_USERNAME, DD_PASSWORD, DB_NAME } = process.env;
    connection = createConnection({
      host: DD_HOST,
      user: DD_USERNAME,
      password: DD_PASSWORD,
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
