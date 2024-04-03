import { ChatSendAfterEvent, world } from "@minecraft/server";
import config from "config";
import * as dutils from "discord/utils";

export const mentionRegex = /\B@\w+/g;
const discordMentionRegex = /<@!?\d+>/g;

export function extractMentions(text: string, re: RegExp): string[] {
  return text.match(re) || [];
}

export async function sendDiscordMessageWithMentions(message: string, event: ChatSendAfterEvent){
  var msg = message;
    var mentions = extractMentions(msg, mentionRegex);
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

export async function sendWorldMessage(message, attachment: string){
  var msg = message.content.slice(0); // Copy the message to a new variable
  if(msg.startsWith(config.prefix)) return; // If the message starts with the prefix, return
  var mentions = extractMentions(msg, discordMentionRegex);
  if(mentions.length > 0){
    for(const mention of mentions){
      var guildMember = await dutils.getGuildMember(mention.substring(2, mention.length - 1));
      if(guildMember){
        msg = msg.replace(mention, `§9@${guildMember.user.username}§r`);
      }
    }
  }
  world.sendMessage(`§9<${message.author.username}>${attachment} §f${msg}`);
}
function partialStringMatch(a: string, b: string): boolean {
  console.log(a, b);
  return a.toLowerCase().includes(b.toLowerCase());
}

function getItemFromList(list: Array<any>, query, attribute) {
  console.log(list)
  return list.find((item) => partialStringMatch(item[attribute], query));
}