---
title: Join Roles
description: In this guide you'll learn about JoinRoleGroups, Simple setup, Layered join roles, randomized join roles
author: ToxicMushroom
tags: roles
style: 'border-left: 4px solid'
createdAt: 2021-02-28T16:00:00.000Z
---

# Introduction
### main command: `>joinRole` (alias: `>jr`)
You are able to have multiple joinroles and give roles by chance with the ability to give no role aswell.
You can have multiple joinrole groups so you can give different random roles.

<img src="/img/joinroles.png" alt="joinroles diagram"></img>
image showing a join roles setup with 2 groups and chances

## Normal: 1 join-role setup
`1.` Creates a **basic** group to put your joinrole in: `>jr group add basic`
`2.` Adds your **@member** role to the **basic** group: `>jr add basic @member`
(you can name the group however you want, basic is just something I chose)

# The rest of the examples are more advanced
## 1 random join-role setup
The **color** group could contain roles like: **@red**, **@blue**, **@green**, **@yellow**, **@purple**, **@orange**, **@pink**, **@brown**, **@grey**...
`1.` Creates a **color** group to put your joinrole in: `>jr group add color`
`2.` Adds your **@red** role to the **color** group: `>jr add basic @red`
`3.` Adds your **@blue** role to the **color** group: `>jr add basic @blue`
`4.` Repeat step `3.` with all the roles you want it to pick from
`5.` Configure the **color** group to not give all roles but to pick a random one `>jr group setGetAllRoles color false`

## A role 1 in a hundred users gets
`1.` Creates a **lucky** group to put your joinrole in: `>jr group add lucky`
`2.` Adds your **@lucky** role to the **lucky** group with **1** as chance: `>jr add lucky @lucky 1`
`3.` Adds nothing as role to the **lucky** group with **99** as chance: `>jr add lucky @lucky 99`
`4.` Configure the **lucky** group to not give all roles but to pick a random one `>jr group setGetAllRoles lucky false`

## Give multiple roles with one group
`1.` Creates a **multi** group to put your joinrole in: `>jr group add multi`
`2.` Adds your **@example1** role to the **multi** group: `>jr add multi @example1`
`3.` Adds your **@example2** role to the **multi** group: `>jr add multi @example2`
`4.` Configure the **multi** to give all the roles you added to the group `>jr group setGetAllRoles multi true`

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