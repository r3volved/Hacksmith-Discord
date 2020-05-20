# COMMAND DEMO

## Main command

- index.js    - (req) command's main function 
- validate.js - (opt) author validation script (check master or mod or role or whatever)

Only index.js is required for a command. Validate is optional and only needed if command is scoped to specific user(s).

## Sub commands

- help.js     - (opt) subcommand, command's help menu (describe subcommands / usage)
- clients.js  - (opt) subcommand, example how to access clients
- commands.js - (opt) subcommand, example how to access other commands
- config.js   - (opt) subcommand, example how to load / save settings
- device.js   - (opt) subcommand, example how to access mqtt client
- discord.js  - (opt) subcommand, example how to access discord client
- socket.js   - (opt) subcommand, example how to access websocket client

Subcommands are all optional but atm require a routing switch in index.js to identify which scripts are subcommands

