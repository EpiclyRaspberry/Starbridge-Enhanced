import { system, world } from "@minecraft/server";
import * as dutils from "discord/utils";
export default function(message){
    var commandMessage = message.content.slice(1);
    switch(commandMessage){
        case "players":
            var players = world.getPlayers();
            var playerNames = players.map(player => player.name);
            dutils.sendDiscordMessage(`Players online: ${playerNames.join(",\n")}`);
            break;
        case "help":
            dutils.sendDiscordMessage("Commands: !players, !help");
            break;
    }
}