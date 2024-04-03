# Starbridge Enhanced
![icon](pack_icon.png)
An open-source Minecraft: Bedrock Edition addon that enables chat bridge across Bedrock Dedicated Server and Discord. 

<cite>This behavior pack is only for BDS and nothing else, it does not work on local worlds so dont even try it...</cite>

This addon is an improved version of the [original Starbridge addon](https://mcpedl.com/starbridge/) by [ayy star](https://starstudios.tech/), [i have his permission to continue the project](screenies/permission.png)

# Features
- Chat bridge between Bedrock Dedicated Server and Discord<br>
![Feature 1](screenies/f1.png)
> The discord message will have the string `[Attachment]` if the message contains an attachment<br>

- anti-spam  is also implemented to prevent spamming in the game chat
![Feature 1.1](screenies/f1.1.png)<br>

- Mention support(full/partial mention, bi-directional)<br>
![Feature 2](screenies/f2.png)

- Discord Commands<br>
![Feature 3](screenies/f3.png)

# Installation
> This is a long instruction, just follow it step by step to get it running.<br>
> This instructions is for Windows, if you are using Android, you can use the same steps but the local worlds path is different.
> Make sure that you backup your server before attempting this.
1. Download the latest release from the [releases page](https://github.com/EpiclyRaspberry/Starbridge-Enhanced/releases)
2. Extract the zip file
3. Put the `permissions.json` and `variables.json` files in the `config/default` folder of your BDS folder
4. Import the pack into minecraft
5. Grab the world from `(your bds folder)/worlds/(your world)` and paste it to  `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds`
6. Open Minecraft
7. Edit the world, enable `Beta APIs` under Experiments, it will clone the world.
8. Close Minecraft
9. Go to `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds` and find the world you cloned(sort the folder by date modified to find it easily)
10. Copy the world folder to the `worlds` folder of your BDS folder
11. Remember the name of the previous world folder and delete it
12. Rename the cloned world folder to the name of the previous world folder(e.g., if the prev. world folder is `Bedrock level`, remember it, delete the folder and rename the new folder to that name)

# Setting up
1. Copy your discord server ID, targer channel ID. Refer to [this instructions](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID) on how to do it.
2. Make a discord bot and copy it's token. Watch [this video](https://www.youtube.com/watch?v=aI4OmIbkJH8) on how to if you don't know how to do it.
3. Open up `config/default/variables.json` and put the details.
4. Start the server.

# Support
If you want to suggest/report a bug, please [join my discord server](https://discord.gg/NX6GhDEnDk) and i will help you out.

# Contributing (this section is for those who want to help me make this pack better)
this pack is my first one and probably has a lot of bloats inside<br> 
if u want to contribute, fork this repo and make a pull request after you made some changes<br>
pr discussions should be done on the discord server so i can read all of it<br>
i use vsc with github copilot to develop this pack