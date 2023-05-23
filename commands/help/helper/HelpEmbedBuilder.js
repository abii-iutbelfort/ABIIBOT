const path = require("node:path");
const fs = require("node:fs");
const {EmbedBuilder} = require("discord.js");
const chalk = require("chalk");

class HelpEmbedBuilder {
  constructor() {
    this.title = 'Help'
    this.description = '`<option>` obligatoire\n`[option]` optionnel'
    this.pages = {}
    this.createPages()
  }

  createPages() {
    const foldersPath = path.join(require.main.path, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
      if (folder === 'help') continue;
      const commandsPath = path.join(foldersPath, folder);
      this.pages[folder] = []

      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

      if (commandFiles.length === 0) {
        delete this.pages[folder];
        continue;
      }

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) continue;
        const command = require(filePath);

        if (command.data === undefined || command.help === undefined) {
          console.log(chalk`{yellow.bold [WARNING]} The command at ${filePath} is missing a required "data" or "help" property.`)
          continue;
        }
        this.pages[folder].push({data:command.data, help:command.help})
      }
      if (this.pages[folder].length === 0) {
        delete this.pages[folder];
      }
    }
  }

  getEmbed(folder, member) {
    const embed = {
      title: this.title + ' - ' + folder,
      description: this.description,
      fields: [{ name: '\u200B', value: '\u200B' },],
    }

    this.pages[folder].forEach(command => {

      // console.log(command.data.default_member_permissions)
      // check if user has the required permission
      // if (member.permissions.has(command.data.default_member_permissions)) {
      embed.fields.push(
        {name: `__${command.data.name}__`, value: command.help}
        )
      // }
    })
    return embed
  }

  getPages() {
    return Object.keys(this.pages)
  }
}

module.exports = HelpEmbedBuilder;