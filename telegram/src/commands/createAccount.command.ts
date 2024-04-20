import Composer from "@/Composer";

export const createAccount = new Composer();

createAccount.command("createaccount", async (context) => {
  const author = await context.getAuthor();

  await context.game.TRPCClient.users.create.mutate({
    telegramId: String(author.user.id),
  });

  await context.reply(`Ты создал аккаунт`);
});
