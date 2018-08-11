const { db } = require('../config'); 

module.exports = function (mongoose) {
    mongoose.connect(db);
    const connection = mongoose.connection;
    connection.on('error', () => {
        console.error('Failed to connect to ', db);
    });
    connection.once('open', () => {
        console.log('Connected to database ', db);
    });
}