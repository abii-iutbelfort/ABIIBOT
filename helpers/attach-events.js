const path = require("node:path");
const fs = require("node:fs");
const logger = require("./Logger");

module.exports = (client) => {
  logger.log("Attaching events...");
  const eventsPath = path.join(require.main.path, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
  logger.success(`Attached ${eventFiles.length} events`);
};
