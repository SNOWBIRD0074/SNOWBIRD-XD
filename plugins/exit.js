import config from "../config.cjs";

const leaveGroup = async (m, Matrix) => {
  try {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + "@s.whatsapp.net"].includes(m.sender);
    const prefix = config.Prefix || config.PREFIX || ".";
    const cmd = m.body?.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

    if (!["leave", "exit", "left"].includes(cmd)) return;

    if (!m.isGroup) {
      return Matrix.sendMessage(m.from, {
        text: `◈━━━━━━━━━━━━━━━━◈
│❒ Yo, dumbass, *SNOWBIRD-XD* only ditches groups! This ain’t one! 😤🏠
◈━━━━━━━━━━━━━━━━◈`,
      }, { quoted: m });
    }

    if (!isCreator) {
      return Matrix.sendMessage(m.from, {
        text: `◈━━━━━━━━━━━━━━━━◈
│❒ Fuck off, poser! Only *SNOWBIRD-XD*’s boss can tell me to bounce! 😎🔪
◈━━━━━━━━━━━━━━━━◈`,
      }, { quoted: m });
    }

    await Matrix.sendMessage(m.from, {
      text: `◈━━━━━━━━━━━━━━━━◈
│❒ *SNOWBIRD-XD*’s out this bitch! Peace, losers! ✌️💥
◈━━━━━━━━━━━━━━━━◈`,
    }, { quoted: m });

    await Matrix.groupLeave(m.from);
  } catch (error) {
    console.error(`❌ Leave error: ${error.message}`);
    await Matrix.sendMessage(m.from, {
      text: `◈━━━━━━━━━━━━━━━━◈
│❒ *SNOWBIRD-XD* fucked up tryin’ to ditch, fam! Somethin’s busted! 😈
◈━━━━━━━━━━━━━━━━◈`,
    }, { quoted: m });
  }
};

export default leaveGroup;
