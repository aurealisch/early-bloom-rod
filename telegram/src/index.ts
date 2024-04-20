import Context from "@/Context";
import { catchFish } from "@commands/catchFish.command";
import { createAccount } from "@commands/createAccount.command";
import { deleteAccount } from "@commands/deleteAccount.command";
import { leaders } from "@commands/leaders.command";
import { linkDiscord } from "@commands/linkDiscord.command";
import { profile } from "@commands/profile.command";
import {
  EarlyBloomRodCode,
  type EarlyBloomRodRequest,
} from "@early-bloom-rod/io";
import { Bot } from "grammy";

const bot = new Bot(process.env.TOKEN, {
  ContextConstructor: Context,
});

bot.callbackQuery("ok", async (context) => {
  const author = await context.getAuthor();

  const request: EarlyBloomRodRequest = {
    code: EarlyBloomRodCode.Verified,
    data: {
      id: String(author.user.id),
    },
  };

  context.socket.emit("message", JSON.stringify(request));

  await context.answerCallbackQuery({
    text: "Ок",
  });
});

bot.callbackQuery("cancel", async (context) => {
  const author = await context.getAuthor();

  const request: EarlyBloomRodRequest = {
    code: EarlyBloomRodCode.NotVerified,
    data: {
      id: String(author.user.id),
    },
  };

  context.socket.emit("message", JSON.stringify(request));

  await context.answerCallbackQuery({
    text: "Отменено",
  });
});

bot.use(catchFish);
bot.use(createAccount);
bot.use(deleteAccount);
bot.use(leaders);
bot.use(linkDiscord);
bot.use(profile);

bot.start();
