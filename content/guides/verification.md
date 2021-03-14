---
title: Verification
description: In this guide we'll learn about how to general spam bots out your server.
author: ToxicMushroom
tags: start
style: 'border-left: 4px solid green'
createdAt: 2021-02-28T13:50:00.000Z
---

# 3. Verification types
### We have 3 types of verification, every one of them is explained below:


Verification Type | Description
----------------- | -----------
Google_RecaptchaV2 | Google recaptcha will require users to visit https://melijn.com/recaptcha, complete a captcha and click verify.
Reaction | The Reaction type requires the user to simply add a reaction to a message in the verification channel.
Password | The Password type requires the user to write the correct password in the verification channel.

Any verification method at least required you to:
`1.` Set a **Verification Channel** with `>setChannel Verification <channel*>`
`2.` Set a **Unverified Role** with `>setRole unverified <role*>`
`3.` Limit the **Unverified Role** to the **Verification Channel** either manually or by using `>limitRoleToChannel <role*> <channel*...>`


For **Google_RecaptchaV2** 
`4.` Set the **Verification Type** to Google Recaptcha with `>setVerificationType Google_RecaptchaV2`
`5.` Provide the user the link (https://melijn.com/recaptcha) in your **Verification Channel**


For **Reaction**
`4.` Set the **Verification Type** to Reaction with `>setVerificationType Reaction`
`5.` Set the reaction emote or emoji you want to use with `>setVerificationEmote <emote* | emoji*>`
`6.` Write a message you want in **Verification Channel** and react to it with the emote or emoji you set in step 5


For **Password**
`4.` Set the **Verification Type** to Password with `>setVerificationType Password`
`5.` Set the password you want to use with `>setVerificationPassword <password: string*>`

### Related commands
- You can manually verify users with `>verify <user*>`
- If you want a role for verified users then please follow our joinroles guide, joinroles are applied after verification.
- If you want logs about who is verified use `>slc verification <channel*>`
- If you want join messages for users who aren't verified: `>preVerificationJoinMessage` or `>pvjm` if you want to type less. (Don't forget to set the channel `>sc Pre_Verification_Join <textChannel*>`)
- If you want leave messages for users who aren't verified: `>preVerificationLeaveMessage` or `>pvlm` if you want to type less. (Don't forget to set the channel `>sc Pre_Verification_Leave <textChannel*>`)
- `>joinMessage` Normal join messages will be sent after verification | `>setChannel Join <textChannel*>`
- `>leaveMessage` Normal leave messages will be sent after verification | `>setChannel Leave <textChannel*>`
- `>limitRoleToChannel <role*> <channel*>` Should be used on the unverified role with verification channel if you don't want to restrict permissions yourself.