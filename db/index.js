const Sequelize  = require('sequelize');

// Creating new instance of Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db',
    logging: false 
})

// Creating database and storing different models??
const db = {
    Sequelize,
    sequelize,
    models: {},
};

db.models.models = require('./model/book.js')(sequelize);

module.exports = db;