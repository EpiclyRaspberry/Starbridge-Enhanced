import * as net from "@minecraft/server-net"
import config from "config";
import classes from "discord/classes";
import { system } from "@minecraft/server";
import * as utils from "utils";

export const API_ENDPOINT = "https://discord.com/api/v9/";
export const DEFAULT_HEADERS = [
    new net.HttpHeader("Authorization", `Bot ${config.token}`),
    new net.HttpHeader("Content-Type", "application/json")
]

/**
 * Sends a message to a Discord channel.
 * @param message - The message to send.
 * @returns A promise that resolves with the response from the server.
 */
export async function sendDiscordMessage(message: string, mention: boolean = true) {
    var msg = message.slice(0) // Copy the message to a new variable
    var req = new net.HttpRequest(`${API_ENDPOINT}channels/${config.channel_ID}/messages`);
    req.addHeader("Authorization", `Bot ${config.token}`)
    req.addHeader("Content-Type", "application/json")
    req.setMethod(net.HttpRequestMethod.Post)
    if (!mention){
        req.setBody(JSON.stringify({content: msg, allowed_mentions: {parse: []}}))
    } else {
        req.setBody(JSON.stringify({content: msg,allowed_mentions: {parse: ["users"]}}))
    }

    await net.http.request(req);
}

/**
 * Retrieves the members of a guild from the Discord API.
 * @returns {Promise<Object>} A promise that resolves to the guild members.
 */
export async function getGuildMembers() {
    var req = new net.HttpRequest(`${API_ENDPOINT}guilds/${config.guild_ID}/members?limit=100`);

    req.setHeaders(DEFAULT_HEADERS);
    req.setMethod(net.HttpRequestMethod.Get);
    var res = await net.http.request(req);
    var json = JSON.parse(res.body);
    var gmlist = [];
    // console.log(json[0]['user']['id']);

    // json.forEach(async (element: any) => {
    //     await console.log(element)
    // });
    return json;
}

/**
 * Searches for a guild member based on the provided query.
 * @param query - The query string to search for guild members.
 * @returns The first guild member that matches the query, or null if no match is found.
 */
export async function searchForGuildMember(query: string) {
    var req = new net.HttpRequest(`${API_ENDPOINT}guilds/${config.guild_ID}/members/search?query=${query}&limit=100`);

    req.setHeaders(DEFAULT_HEADERS);
    req.setMethod(net.HttpRequestMethod.Get);

    var res = await net.http.request(req);
    if (res.status === 200) {
        return classes.GuildMember.fromJson(JSON.parse(res.body)[0]);
    } else {
        return null;
    }
}

export async function getGuildMember(id: string) {
    var req = new net.HttpRequest(`${API_ENDPOINT}guilds/${config.guild_ID}/members/${id}`);

    req.setHeaders(DEFAULT_HEADERS);
    req.setMethod(net.HttpRequestMethod.Get);

    var res = await net.http.request(req);
    if (res.status === 200) {
        return classes.GuildMember.fromJson(JSON.parse(res.body));
    } else {
        return null;
    }
}

export async function getChannelMessages(after: string): Promise<any[]> {
    var req = new net.HttpRequest(`${API_ENDPOINT}channels/${config.channel_ID}/messages?after=${after}`);
    req.setHeaders(DEFAULT_HEADERS);
    req.setMethod(net.HttpRequestMethod.Get);
    var res = await net.http.request(req);
    return JSON.parse(res.body);
}