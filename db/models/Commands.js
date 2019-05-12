/**
 * Name:    kisaragi.model.Commands
 * Desc:    Command model for database, multiple entities can belong to one server, but not to multiple ones
 *          type can be global or local, while global commands only server statistical purposes and are otherwise
 *          hard-coded.
 * 
 * 
 * Table:
 *  A <command entity>:
 *      command_id <hash>? (primary key)
 *      command_hash (alternative)
 *      server_id <snowflake> (foreign key) OWNER
 *      command_scope (LOCAL/GLOBAL)
 *      command_enabled [BOOLEAN]
 *      command_name
 *      command_description
 *      command_description_extended
 *      command_type (should reply with text, embed, role)
 *      command_text (can be null depending on type)
 *      command_embed (can be null depending on type, JSON object of type string) (INTEGRITY!!!!)
 *      command_role (can be null depending on type (value = role name to be applied))
 *
 *      <-- statistical data -->
 *      creation date (command created on)
 *      created by (user_id)
 *      last edit date (last edited on (default creation date))
 *      last edit by (user_id)
 *      usage [INTEGER]
 *      ...
 *
 *  */

 module.exports = (sequelize, DataTypes) => {
    return sequelize.define('commands', {
        id: { type: DataTypes.STRING,
            primaryKey: true
        },
        /*command_hash: { type: DataTypes.STRING
        },
        command_scope: { type: DataTypes.ENUM('LOCAL', 'GLOBAL'),
        default_value: 0
        },*/
        command_enabled: { type: DataTypes.BOOLEAN,
        default_value: true
        },

        command_name: { type: DataTypes.STRING
        },
        command_text: { type: DataTypes.STRING
        }
    }, {
        underscored: true,
    });
 };