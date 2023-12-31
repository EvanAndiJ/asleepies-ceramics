
module.exports = 
process.env.NODE_ENV === 'production' 
? {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
: { 
  host: process.env.LOC_HOST,
  user: process.env.LOC_USER,
  password: process.env.LOC_PASSWORD,
  db: process.env.LOC_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}