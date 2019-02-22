/**
 * Name:    kisaragi.model.Servers.js
 * Desc:    Server model for database, an entity is created in the table if the bot is
 *          added to a server the first time only, or if an undocumented server is found
 *          on startup
 * INV:     this database should always be coherent to all servers the bot currently is on,
 *          and on extension should also be coherent with it's status [ACTIVE] or [INACTIVE]
 *          in case the server still has the bot, or has removed the bot
 * 
 * Table:
 *  A <server entity>:
 *      server_id <Snowflake> (supplied by discord)
 *      server_active [BOOLEAN] (=>integritycheck)
 *      prefix [STRING] (can be set, or on entity creation it is always the default)
 * 
 *      max_commands [INTEGER] (default: 100, only counts towards local commands)
 *      count_commands [INTEGER] (current amount of local commands)
 *      commands -> Commands (relation)
 *
 *      events -> Events (welcome message etc.)
 *
 *      <-- statistical data -->
 *      join date
 *      activity (some combination of used commands and fired events)
 *      user_count
 *      bot_count
 *      ...
 *
 *  */
const { default_prefix, default_max_commands } = require('./config.json');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('servers', {
        server_id: { type: DataTypes.STRING,
            primaryKey: true
        },
        server_active: { type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        server_prefix: { type: DataTypes.STRING,
            defaultValue: default_prefix
        },
        max_commands: { type: DataTypes.INTEGER,
            defaultValue: default_max_commands
        },
        count_commands: { type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });
};