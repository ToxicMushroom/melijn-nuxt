---
title: Getting started with Melijn
description: In this guide we'll learn about how Melijn does certain stuff and basic configuration.
author: ToxicMushroom
tags: start
---

# 1. Setting up the bot
After <nuxt-link to='/invite' class='text-link'>inviting</nuxt-link> the bot please verify that Melijn has the required permissions for you needs.
I would recommend having a dedicated role for the bot so you can manage each bot individually.
<br><br>

<a class='text-link' rel="noopener noreferrer nofollow" href='https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-Permissions-'>Permissions</a> that melijn requires for certain features are as followed.
- **View channels**, **Read Text** & **Send Messages** (Make sure these permissions aren't overriden in channels)
- **Manage Roles** (not needed if you set the mute role yourself and don't use setRoleColor)
- **Manage Channels** (clearchannel)
- **View Audit Log** (logchannels, sending banned/kicked messages in the banned and kicked message channels)
- **Ban Members** (for banning / unbanning, viewing ban logs)
- **Kick Members** (kick command, auto-punishments)
- **Manage Messages** (purge command, verification channel, chat-filter, removing emojis on [pagination, reaction-roles and menus], removing invokes and responses)
- **Attach Files** (image manipulation commands)
- **Embed Links** (Please only disallow this if you know what you're doing. Embeds are a tool for bots to make messages look nicely)
- **Use External Emojis** (use of custom emojis in some commands to make things look nice) [if you disable this the emotes will look like this: <:name:49849849849849849>]
- **Read Message History** (purge command)
- **Manage Nicknames** (dehoisting [coming soon])
- **Move Members** (massmove, joining full voice-channels)
- **Connect**, **Speak**, **Use Voice Activity** (playing music)


