import mysql from 'mysql2'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ninomiya0617",
    database:"wonderland"
})