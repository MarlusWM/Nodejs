const sqlConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationRun(){
    const schemas = [
        createUsers
    ].join('');

    sqlConnection().then(db => db.exec(schemas))
    .catch(erro => console.error(erro));
}

module.exports = migrationRun;