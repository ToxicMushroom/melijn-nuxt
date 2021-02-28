---
title: LogChannels
description: In this guide you'll learn about logging 🧐.
author: ToxicMushroom
tags: logchannels
style: 'border-left: 4px solid'
createdAt: 2021-02-28T19:30:00.000Z
---

# Introduction
### main command: `>setLogChannel` (alias: `>slc`)
You can set all logchannels at once, set groups or set individual ones

### LogChannelTypeNodes
LogChannelTypeNodes can be seen as a single logchanneltype, groups of logchanneltypes or all

Here is a list of all types and groups
### **Groups:**
 - **punishment**, **punishments**: permanentban, temporaryban, softban, unban, permanentmute, tempmute, unmute, kick, warn
 - **deleted-messages**, **deleted-message**: Other-Deleted-Message, Self-Deleted-Message, Purged-Message, Filtered-Message
 - **all**: contains all ofcourse types

### **Types:**
 - **PermanentBan**
 - **TemporaryBan**
 - **SoftBan**
 - **Unban**
 - **PermanentMute**
 - **TempMute**
 - **Unmute**
 - **Kick**
 - **Warn**
 - **Other-Deleted-Message**: If someone deletes a message which they do not own
 - **Self-Deleted-Message**: If someone deletes their own message
 - **Purged-Message**
 - **Filtered-Message**
 - **Verification**
 - **Edited-Message**
 - **Reaction**
 - **Attachment**
 - **Music**
 - **Bot**: If some problem occurs then the bot might log that here
 - **PunishmentPoints**


To see examples use: `>help setLogChannel` or go <nuxt-link to='/commands?c=administration&q=setlogchannel' target='_blank' class='text-link'>here</nuxt-link>
