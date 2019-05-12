const Sequelize = require('sequelize');

const sequelize = new Sequelize('kisaragi', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: '../kisaragi.sqlite',
	operatorsAliases: false,
});

const Servers = sequelize.import('models/Servers');
const Commands = sequelize.import('models/Commands');

Servers.hasMany(Commands);
Commands.belongsTo(Servers);

Servers.prototype.addCommand = async function(name, text){
    console.log("trying to add command to server id" + this.server_id);
    const s_id = this.server_id;
    const command = await Commands.findOne({
        where: { server_id: s_id },
    });

    if (command){
        console.log("command already added");
        return;
}
    console.log("trying to add command");
    return Commands.create({ server_id: this.server_id, command_name: text});
         
}

module.exports = { Servers, Commands };