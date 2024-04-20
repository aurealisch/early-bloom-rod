import Composer from "@/Composer";

export const catchFish = new Composer();

catchFish.command("catchfish", async (context) => {
  const author = await context.getAuthor();

  const { catched } = await context.game.catchFish(
    await context.game.getId(String(author.user.id))
  );

  await context.reply(`Ты поймал **\`${catched}\`** рыбы`);
});
