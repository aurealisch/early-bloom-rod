import Game from "@early-bloom-rod/game";
import { type EarlyBloomRodData } from "@early-bloom-rod/io";
import { Api, Context, InlineKeyboard } from "grammy";
import { type Update, type UserFromGetMe } from "grammy/types";
import { Socket, io } from "socket.io-client";

export default class extends Context {
  public readonly socket: Socket;
  public readonly game: Game;

  constructor(update: Update, api: Api, userFromGetMe: UserFromGetMe) {
    super(update, api, userFromGetMe);

    this.socket = io(process.env.SOCKET_IO_URL);
    this.game = new Game({
      platform: "telegram",
      redisClientUrl: process.env.REDIS_CLIENT_URL,
      TRPCClientUrl: process.env.TRPC_CLIENT_URL,
    });

    console.log("asd");

    this.socket.on("verify", (data) => {
      const parsedData: EarlyBloomRodData = JSON.parse(data);

      const inlineKeyboard = new InlineKeyboard()
        .text("Ок", "ok")
        .text("Отменить", "cancel");

      api.sendMessage(parsedData.id, "Подтвердите привязывание аккаунта", {
        reply_markup: inlineKeyboard,
      });
    });

    this.socket.connect();
  }
}
