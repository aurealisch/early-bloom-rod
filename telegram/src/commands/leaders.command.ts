import Composer from "@/Composer";

export const leaders = new Composer();

leaders.command("leaders", async (context) => {
  const users = await context.game.getLeaders();

  await context.reply(
    users
      .map((user, index) => {
        return `${index + 1}. <@${user.id}> **\`${user.fish}\`**`;
      })
      .join("\n")
  );
});
