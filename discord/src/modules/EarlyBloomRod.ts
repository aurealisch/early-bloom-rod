import config from "@/config.json";
import Game from "@early-bloom-rod/game";
import type { EarlyBloomRodData } from "@early-bloom-rod/io";
import response from "@modules/response";
import { BucketScope, SapphireClient, container } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import { isNullish } from "@sapphire/utilities";
import { MessagePayload, type WebhookMessageEditOptions } from "discord.js";
import { Socket, io } from "socket.io-client";

export default class EarlyBloomRod extends SapphireClient {
  constructor() {
    super({
      intents: ["GuildMessages", "Guilds", "MessageContent"],
      defaultCooldown: {
        delay: Time.Second * 5,
        filteredUsers: [config.botOwnerId],
        scope: BucketScope.User,
      },
    });
  }

  public override login(token?: string | undefined): Promise<string> {
    container.game = new Game({
      platform: "discord",
      redisClientUrl: process.env.REDIS_CLIENT_URL,
      TRPCClientUrl: process.env.TRPC_CLIENT_URL,
    });
    container.socket = io(process.env.SOCKET_IO_URL);

    container.socket.on("not-verified", async (data) => {
      const parsedData: EarlyBloomRodData = JSON.parse(data);

      const edit = await container.game.redis.get(
        `verification:${parsedData.id}`
      );

      // TODO
      if (isNullish(edit)) throw Error("...");

      const message: {
        edit: (
          options: string | MessagePayload | WebhookMessageEditOptions
        ) => void;
      } = JSON.parse(edit);

      await message.edit(
        response({
          description: "❌ Не подтверждено",
        })
      );
    });

    container.socket.on("verified", (data) => {
      const parsedData: EarlyBloomRodData = JSON.parse(data);
    });

    return super.login(token);
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    game: Game;
    socket: Socket;
  }
}
