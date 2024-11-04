import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import mongoose from "mongoose";
import { app } from "./src/shortUrl";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

mongoose.connect("mongodb://127.0.0.1:27017/discord-bot").then(() => {
  console.log("connected to mongodb");
});

client.addListener("messageCreate", async (message) => {
  const userMessage = message?.content;

  if (userMessage.toLowerCase()?.startsWith("create")) {
    message.reply("generating...");
    const url = message.content.split(" ")[1];
    if (!url) {
      message.reply("url is required");
      return;
    }
    const response = await axios.post("http://localhost:3000/create", {
      url,
      createdBy: {
        authorUsername: message.author.username,
        authorId: message.author.id,
      },
    });

    message.reply(`http://localhost:3000/${response.data.shortId}`);
  }
  return null;
});

client.login(
  "MTMwMjU3MzA0MDg5MDI4MTk5NA.GM-qA3.KdZtKg6VSOCYlP06RoZ9-iX7deoLT-vSZUdraw"
);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
