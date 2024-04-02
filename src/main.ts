import { ChatSendAfterEvent, ChatSendBeforeEvent, ItemUseBeforeEvent, Vector3, system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { sendDiscordMessage, getChannelMessages } from "discord/utils";
import { extractMentions, sendDiscordMessageWithMentions } from "utils";

var lastMessageId: string | number | boolean | Vector3 = world.getDynamicProperty('lastmsg') || '0'
var lastMessageContent = ''
console.log('lastMessageId: ', lastMessageId)
export async function start() {
    world.afterEvents.chatSend.subscribe(gameChatHandler);
    world.beforeEvents.chatSend.subscribe(test)
    world.afterEvents.itemUse.subscribe(configForm)
    system.runInterval(discordMessagesHandler, 10)
}

async function gameChatHandler(event: ChatSendAfterEvent){
    var message = event.message.slice(0);
    // Convert Minecraft mentions to Discord mentions
    if(extractMentions(message).length > 0){
        await sendDiscordMessageWithMentions(message, event);
    }
    else {
        await sendDiscordMessage(`**[${event.sender.name}]** ${message}`)
        
    }
}

function configForm(e: ItemUseBeforeEvent){
    if(e.itemStack.typeId === "minecraft:stick" && e.itemStack.nameTag === "StarBridge Configuration Stick"){
        const form = new ModalFormData().title("StarBridge Configuration")
        // .toggle('i want to add some informational text below, how do i do that')
        form.dropdown("Discord Message Naming", 
                      ["@username (§9<@raspberryepicly> §fmessage§r)", 
                      "Display Name (§9<Raspberry> §fmessage§r)", 
                      "niccname (§9<i am a cat> §fmessage§r)"], 0)
        form.show(e.source)
    }
}

function test(e){
    /*
    if(e.message === "!test"){
        getChannelMessages('1224250350295453747').then(json=>{
            if(json.length == 0) return;
            json.reverse().forEach(message => {
                if(message.author.bot != undefined) return;
                world.sendMessage(`§9<${message.author.username}> §f${message.content}`)
                // lastMessageId = message.id
            });
        })
    } else if(e.message === "!test2"){
        if (typeof(lastMessageId) == 'string'){
        getChannelMessages(lastMessageId).then(json=>{
            try {
                if(json.length != 0 || lastMessageId !== "0"){
                    json.reverse().forEach(message => {
                        if(message.author.bot != undefined) return;
                        world.sendMessage(`§9<${message.author.username}> §f${message.content}`)
                        lastMessageId = message.id
                        world.setDynamicProperty('lastmsg', lastMessageId)
                    });
                }
            } catch (e) {
                world.sendMessage('dmh try/catch: '+  e+e.stack)
            }
        })}
    }*/ // this is the old code
    // if(e.message === "!ui") {
    //     const form = new ActionFormData()
    //     .body("test uwu")
    //     .button("i am a button, i get aroused when u click me")
    //     .title("test ui")
    //     system.run(()=>{world.getDimension("overworld").runCommand(`damage ${e.sender.name} 0`)
    //     form.show(e.sender)})
    // }
}
async function discordMessagesHandler() {
    if (typeof lastMessageId === 'string') {
        try {
            const json = await getChannelMessages(lastMessageId);
            if (json.length !== 0) {
                json.reverse().forEach(message => {
                    if (message.author.bot !== undefined) return;
                    const attachment = message.attachments.length > 0 ? " [Attachment]" : "";
                    if (lastMessageContent === message.content) return;
                    world.sendMessage(`§9<${message.author.username}>${attachment} §f${message.content}`);
                    lastMessageId = message.id;
                    lastMessageContent = message.content;
                    world.setDynamicProperty('lastmsg', lastMessageId);
                });
            }
        } catch (e) {
            // console.log('dmh try/catch: ', e+e.stack) // don't do anything so it wouldn't spam the console
        }
    }
}


