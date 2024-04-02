import { variables } from "@minecraft/server-admin";

const token = variables.get("DISCORD_BOT_TOKEN");
const channel_ID = variables.get("DISCORD_CHANNEL_ID");
const guild_ID = variables.get("DISCORD_GUILD_ID");

if(!token || !channel_ID) {
    throw new Error("Please set the DISCORD_BOT_TOKEN and DISCORD_CHANNEL_ID environment variables.");
}

export default {
    token: token,
    channel_ID: channel_ID,
    guild_ID: guild_ID
}