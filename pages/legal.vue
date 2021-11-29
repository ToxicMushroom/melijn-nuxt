<template>
  <div class="wrapper">
    <section class="section">
      <h1>Melijn Terms of Service/Privacy Policy</h1>
      <h3>1. Use of Melijn</h3>

      By inviting Melijn to your Discord server, you and your members grant Melijn permission to store the following information about you:<br>

      Your Discord avatar-url<br><br>

      By enabling any of the Message logging features in the Melijn settings, you and your members grant Melijn permission to store the following information for less then 7 days about you:<br>

      Your Discord messages<br>
      Your Discord attachment-urls<br><br>

      Melijn will not automatically store other information. In the event you use a command to store extra data, you will approve of it by typing it in as a command. These are used to identify you and give you access to the Melijn infrastructure.
      <h3>1.2 Liability</h3>

      We are in no way liable of potential data loss. In the case we suffer a major data loss, we will post a announcement in our Discord server.

      <h3>1.3 Tracking</h3>

      In events you break any of the general guidelines your userid may be tracked to exclude you from using Melijn.

      <h3>1.4 What we do to protect your data</h3>

      We make sure our database runs locally and has no way of directly communicating outside the network. Access to the machine is secured with ssh-keys and a unique ssh port.
      All our database queries are using prepared statements to protect your data from sqlinjection. If you don't feel safe or have an issue with our setup please contact us at admin@melijn.com .

      <h3>1.5 How you can protect your data</h3>

      If you the user see Melijn online in the channel you are in and you type "&lt;@368362411591204865&gt; loginfo" then Melijn will show you if you're being logged or not.
      You can email us (contact@melijn.com) or contact us through discord to get your data deleted. We may ask for proof of ownership of the account when using email.
      Having your data deleted multiple times might result in a ban from using our bot and your userid being stored. This way we can ensure that the users of our bot
      know why Melijn is not working as it should when users that delete their data join their server.

      <h3>2. Cheating</h3>

      We do not condone the use of general cheats, hacks, bots or any type of malicious or exploitative behaviour. This includes but does not limit to:<br>

      Using “self bots” to interact with Melijn.<br>
      Abusing glitches to personally gain from it.<br>
      Abusing our open source platform to exploit systems.

      <h3>3. Support</h3>

      We do not support setting up Melijn as an external service. And it is not our priority nor is it our goal to spread the bot over several external services. The code is open sourced purely for educational purposes.

      <h1>Melijn.com Terms of Service</h1>
      <h3>1. Terms</h3>

      By accessing the website at https://melijn.com , you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
      <h3>2. Use License</h3>

      Permission is granted to temporarily download one copy of the materials (information or software) on Melijn's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:<br>
      modify or copy the materials;<br>
      use the materials for any commercial purpose, or for any public display (commercial or non-commercial);<br>
      attempt to decompile or reverse engineer any software contained on Melijn's website;<br>
      remove any copyright or other proprietary notations from the materials; or<br>
      transfer the materials to another person or "mirror" the materials on any other server.<br>
      This license shall automatically terminate if you violate any of these restrictions and may be terminated by Melijn at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.<br>

      <h3>3. Disclaimer</h3>

      The materials on Melijn's website are provided on an 'as is' basis. Melijn makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.<br>
      Further, Melijn does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.

      <h3>4. Limitations</h3>

      In no event shall Melijn or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Melijn's website, even if Melijn or a Melijn authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
      <h3>5. Accuracy of materials</h3>

      The materials appearing on Melijn website could include technical, typographical, or photographic errors. Melijn does not warrant that any of the materials on its website are accurate, complete or current. Melijn may make changes to the materials contained on its website at any time without notice. However Melijn does not make any commitment to update the materials.
      <h3>6. Links</h3>

      Melijn has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Melijn of the site. Use of any such linked website is at the user's own risk.
      <h3>7. Modifications</h3>

      Melijn may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
      <h3>8. Governing Law</h3>

      These terms and conditions are governed by and construed in accordance with the laws of Belgian and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      <h3>9. Refund Policy</h3>

      Melijn.com and our patreon page do not offer refunds.
    </section>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'Melijn - Legal',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Privacy policy and terms of use of Melijn.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Melijn - Legal'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://melijn.com/${this.$route.params.id}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Privacy policy and terms of use of Melijn.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.section {
    h1 {
        margin: 32px 0;
        font-size: 32px;
        font-weight: bold;
    }
    h3 {
        margin: 16px 0;
        font-size: 20px;
        color: $grey-lite;
    }
}
</style>
