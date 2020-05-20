# Setup

Add whatever you want to the default settings in /core/config.js

Defaults require **at least** a TABLE_ID to reference the sqlite3 record to be used for settings overrides

Random Notes: 

- sqlite3 client not completely tied in yet (uses defaults)
- scheduler not implemented yet (I have a few ways to do this depending what is intended to be scheduled)


## Architecture

- Main bot execution script       : /index.js
- Bot commands folder             : /commands
- Bot core (helpers and clients)  : /core
- Bot data (databases and json)   : /data


## Commands

### Structure

Commands contained in /commands with each folder named for command use

- Main container    : /commands/[command]/
- Comamnd execute   : /commands/[command]/index.js
- User validation   : /commands/[command]/validate.js
- Command help      : /commands/[command]/help.js

The Discord-message-listener will route to the appropriate command if there exists a matching folder name

Validation should be the first step within each command (if validation is necessary)

**See /commands/demo for example of command template**


## Process helpers

### Config helper

```js
const config = await new Promise(end => process.emit('get_config', end))
```
- `<Promise>config.load( file_path )` : Load settings from a specified sqlite3 DB
- `<Promise>config.save( file_path, new_settings )` : Save settings to a specified sqlite3 DB


### Commands helper

```js
const commands = await new Promise(end => process.emit('get_commands', end))
```
- `<Promise>commands[command_name]( message, settings )` : Trigger a specific command


### Clients helper

```js
const clients = await new Promise(end => process.emit('get_clients', end))
```
- `<Client>clients[client_name]` : Get a specific client


