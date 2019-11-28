const Sequelize  = require('sequelize');

// setting up database configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db',
    logging: false 
})

// setting the Sequelize, database configurations and models
const db = {
    Sequelize,
    sequelize,
    models: {},
};

db.models.Books = require('./model/book.js')(sequelize);

module.exports = db;