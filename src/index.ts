import { system, world} from "@minecraft/server";
import * as discord from "discord/utils";
import { start } from "main";

async function loadConfig() {
    try {
        const configModule =  await import("./config");
        return configModule.default;
    } catch (error) {
        throw new Error("Please set the DISCORD_BOT_TOKEN and DISCORD_CHANNEL_ID config variables.");
    }
}


try {
    const config = loadConfig();
    start();
} catch (error) {
    world.sendMessage("[StarBridge] " + error.message);
    console.error("[StarBridge] " + error.message)
}