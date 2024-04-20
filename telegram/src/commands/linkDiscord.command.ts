import Composer from "@/Composer";

export const linkDiscord = new Composer();

linkDiscord.command("linkdiscord", async (context) => {
  await context.reply("Hello");
});
