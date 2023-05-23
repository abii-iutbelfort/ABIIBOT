const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(newMessage) {
    if (newMessage.author.bot) return;
    if (newMessage.channel.type === "DM") return;
    if (newMessage.content.toUpperCase().endsWith("QUOI ?")) {
      const feur = await newMessage.reply("Feur !");
      await feur.react("🇱");
      await feur.react("🇲");
      await feur.react("🇦");
      await feur.react("🇴");
      setTimeout(() => {
        feur.delete();
      }, 10000);
    }
  },
};
