import sql from "mssql";

export const sqlConfig: sql.config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "GS300GP",
  server: "DBSOL\\DBSOL",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
