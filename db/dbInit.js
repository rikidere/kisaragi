const Sequelize = require('sequelize');

const sequelize = new Sequelize('kisaragi', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    storage: '../kisaragi.sqlite'
  });

  const servers = sequelize.import('models/Servers');
  const commands = sequelize.import('models/Commands');
  
  //servers.belongsToMany(commands, {through: 'ServerCommand'});
  //commands.belongsToMany(servers, {through: 'ServerCommand'});

  servers.hasMany(commands, {foreignKey: 'server_id', sourceKey: 'id'});
  commands.belongsTo(servers, {foreignKey: 'server_id', targetKey: 'id'});

  const force = process.argv.includes('--force') || process.argv.includes('-f');

  sequelize.sync({ force }).then(async () => {
    const s = [
      servers.upsert({ server_id: "123", prefix: "!"}),
      commands.upsert({ command_id: "1", server_id: "123", command_name: "test"})
    ];
    await Promise.all(s);
    console.log('Database synced');
    sequelize.close();
    
  }).catch(console.error);
    
  