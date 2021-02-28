---
title: Our permission system
description: In this guide you'll learn about how to correctly setup permissions for roles, users or channel-specific.
author: ToxicMushroom
tags: permissions
style: 'border-left: 4px solid'
createdAt: 2020-09-25T01:00:00.000Z
---

# 2. Our permission system
If you every used pex or groupmanager on MC then this will all be quite familliar.
Permissions can be granted to users, roles (this includes the @everyone role), users when in specific channels or roles when in specific channels.

Permission nodes look as following: commandname(.subcommand)<br>
A permission node can be a specific permission `ban` or a group of permissions `perm.*`.
You might have noticed the `*` in the above example. The `*` will match anything.
Because the `perm` command has multiple sub commands you can mark them all with a \*

The star also can be used to indicate that you just want ALL permissions, then just use `*` as permission node

In the permission command you are also able to specify all commands that are part of a category by using the category name.
`moderation`, `utility`, `music`, ect.. (use `>help list` to see all category names, don't copy the emoji)

### Hiarchy
User channel permissions **>** User permissions **>** Role channel permissions **>** Role permissions
Allow **>** Deny **>** Default

### Note
Please take a further look at <nuxt-link to='/commands?c=administration&q=permission' class='text-link'>the permission command</nuxt-link> to see the command syntax, sub-commands and examples.