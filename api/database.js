const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`${process.env.DATABASE}/db.sqlite`);

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(140)
  )
  `;

const USERS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    emailVerified INTEGER
  )
  `;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(POSTS_SCHEMA);
  db.run(USERS_SCHEMA);

  db.each('SELECT COUNT(id) FROM users', (err, users) => {
    console.log(`contem ${users['COUNT(id)']} usuários cadastrados`);
  });
});

process.on('SIGINT', () => db.close(() => {
  process.exit(0);
}));

module.exports = db;
