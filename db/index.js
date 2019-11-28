const Sequelize  = require('sequelize');

// Creating new instance of Sequelize where it describes if we are using sqlite ,mssql etc and have the modules be stored in the library.db database
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