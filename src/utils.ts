import { ChatSendAfterEvent } from "@minecraft/server";
import * as dutils from "discord/utils";

const mentionRegex = /\B@\w+/g;

export function extractMentions(text: string): string[] {
  return text.match(mentionRegex) || [];
}

export async function sendDiscordMessageWithMentions(message: string, event: ChatSendAfterEvent){
  var msg = message;
    var mentions = extractMentions(msg);
    // var guildMembers = await dutils.getGuildMembers();
    // console.log(guildMembers.length)

    for (const username of mentions){
        // var possibleMember = getItemFromList(guildMembers, username, "username");
        var possibleMember = await dutils.searchForGuildMember(username.substring(1));
        if(possibleMember){
            msg = msg.replace(username, `<@${possibleMember.user.id}>`);
        }
    }
    dutils.sendDiscordMessage(`**[${event.sender.name}]** ${msg.startsWith("!silent") ? msg.slice(7) : msg}`, 
                              message.startsWith("!silent") ? false : true);
    // return message;
}

function partialStringMatch(a: string, b: string): boolean {
  console.log(a, b);
  return a.toLowerCase().includes(b.toLowerCase());
}

function getItemFromList(list: Array<any>, query, attribute) {
  console.log(list)
  return list.find((item) => partialStringMatch(item[attribute], query));
}