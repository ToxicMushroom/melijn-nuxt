---
title: Self/Reaction Roles
description: In this guide you can learn about SelfRoleGroups, normal setup and random self-roles.
author: ToxicMushroom
tags: roles, self, reaction
style: 'border-left: 4px solid magenta'
createdAt: 2021-02-28T17:00:00.000Z
---

# Introduction
### main command: `>selfRole` (alias: `>sr`)
You are able to have multiple selfrole entries and give roles by chance.
You can have multiple selfrole groups so you can have menus in different channels and lock some channels behind a role for example.

## Normal self-role setup
`1.` Creates a **basic** group to put your selfrole in: `>sr group add basic`
`2.` Adds your **@fish** role to the **basic** group: `>sr add basic 🐟 @fish`
`3.` Adds your **@shark** role to the **basic** group: `>sr add basic 🦈 @shark`
`4.` Send the menu in a textchannel: `>sr sendGroupAuto basic #self-roles`
(you can name the group however you want, basic is just something I chose)
### Optional
- Change the formatting `>sr group setPattern basic [selfRolePattern* | null]`
Formatting can contain variables like %name%, %emoteji%, %enter% and %role%
- Use you own custom message `>sr group setChannel #self-roles` and `>sr group messageIds clear`
- Make usable by `>iam <role*>` -> `>sr group setSelfRoleAble basic true`<br></br>
# The rest of the examples are more advanced
## setup for getting 1 random self-role
The **class** group could contain roles like: **@mage**, **@bruiser**, **@tank**, **@assassin**, **@ninja**, **@sniper**...
`1.` Creates a **class** group to put your selfrole in: `>sr group add class`
`2.` Adds your **@mage** role to the **color** group: `>sr add class ⚔ @mage`
`3.` Adds your **@bruiser** role to the **color** group: `>sr add class ⚔ @bruiser`
`4.` Repeat step `3.` with all the roles you want it to pick from
`5.` Configure the **class** group to not give all roles but to pick a random one `>sr group setGetAllRoles class false`
`6.` Send the menu in a textchannel: `>sr sendGroupAuto class #class-selection`
### Optional
`7.` Give the ⚔ selfrole a title: `>sr setName class ⚔ Classes`


# how do chances work?
If you have set getAllRoles to false -> the bot will add all chances of all roles together
For example: (@lucky 1, @unlucky 1, null 98) (role chance)
the total here would be **100**
then a random number is picked from 0 to 100
the bot will then start adding the chances of the roles again until it finds a hit for the random number
`(for internal code check our github, link in footer)`

### Conclusion: if the chance total is 100, the chances can be interpreted as % chance
lucky has 1% chance
unlucky has 1% chance
null has 98% chance `null doesn't grant a role`

# Notes
make sure the bot can interact with the role, you can easily verify this if it can with `>role <role*>`
there will be a field named **can melijn interact** this should be yes, if this is not the case
you have to fix your permissions