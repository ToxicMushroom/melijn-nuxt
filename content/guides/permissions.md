---
title: Our permission system
description: In this guide you'll learn about how to correctly setup permissions for roles, users or channel-specific.
author: ToxicMushroom
tags: permissions
---

# 2. Our permission system
The permissions kinda look and work like minecraft plugins permission systems like pex or groupmanager.<br>
So if you knew any of these it should be quite easy for you.
<br><br>
Permissions can be granted to users, roles (this includes the @everyone role), users when in specific channels or roles when in specific channels.
<br><br>
Permission nodes look as following: commandname(.subcommand)<br>
A permission node can be a specific permission `ban` or a group of permissions `perm.*`.<br>
You might have noticed the `*` in the above example. The `*` will match anything.<br>
Because the `perm` command has multiple sub commands you can mark them all with a *
<br><br>
The star also can be used to indicate that you just want ALL permissions, then just use `*` as permission node
<br><br>
In the permission command you are also able to specify all commands that are part of a category by using the category name.
<br><br>
Please take a further look at <nuxt-link to='/commands#administration?q=permission' class='text-link'>the permission command</nuxt-link> to see the command syntax, subcommands and examples.