import Composer from "@/Composer";

export const deleteAccount = new Composer();

deleteAccount.command("deleteaccount", async (context) => {
  const author = await context.getAuthor();

  await context.game.TRPCClient.users.delete.mutate({
    id: await context.game.getId(String(author.user.id)),
  });

  await context.reply(`Ты удалил аккаунт`);
});
