import Composer from "@/Composer";

export const profile = new Composer();

profile.command("profile", async (context) => {
  const author = await context.getAuthor();
  const user = await context.game.getProfile(
    await context.game.getId(String(author.user.id))
  );

  await context.reply(
    `🆔 ID: **\`${user.id}\`**\n🐟 Рыбы: **\`${user.fish}\`**`
  );
});
