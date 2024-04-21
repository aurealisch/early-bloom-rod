import config from '@/config.json';
import Game from '@early-bloom-rod/game';
import type { EarlyBloomRodData } from '@early-bloom-rod/io';
import response from '@modules/response';
import { BucketScope, SapphireClient, container } from '@sapphire/framework';
import { Time } from '@sapphire/time-utilities';
import { isNullish } from '@sapphire/utilities';
import { Socket, io } from 'socket.io-client';

export default class EarlyBloomRod extends SapphireClient {
  constructor() {
    super({
      intents: ['GuildMessages', 'Guilds', 'MessageContent'],
      defaultCooldown: {
        delay: Time.Second * 5,
        filteredUsers: [config.botOwnerId],
        scope: BucketScope.User,
      },
    });
  }

  public override login(token?: string | undefined): Promise<string> {
    container.game = new Game({
      platform: 'discord',
      redisClientUrl: process.env.REDIS_CLIENT_URL,
      TRPCClientUrl: process.env.TRPC_CLIENT_URL,
    });
    container.socket = io(process.env.SOCKET_IO_URL);

    const callback = async (data: string) => {
      const parsedData: EarlyBloomRodData = JSON.parse(data);

      const cachedVerification = await container.game.redis.get(
        `verification:${parsedData.id}`
      );

      // TODO
      if (isNullish(cachedVerification)) throw Error('...');

      const verification: {
        channelId: string;
        userId: string;
      } = JSON.parse(cachedVerification);

      const channel = container.client.channels.cache.get(
        verification.channelId
      );

      // TODO
      if (isNullish(channel)) throw Error('...');

      if (!channel.isTextBased()) throw Error('...');

      return {
        channel,
        discordId: verification.userId,
        telegramId: parsedData.id,
      };
    };

    container.socket.on('not-verified', async (data) => {
      const { channel } = await callback(data);

      await channel.send(
        response({
          description: 'Отмена',
        })
      );
    });

    container.socket.on('verified', async (data) => {
      const { channel, discordId, telegramId } = await callback(data);

      await container.game.telegramToDiscord({
        discordId,
        telegramId,
      });

      await channel.send(
        response({
          description: 'Ок',
        })
      );
    });

    container.socket.on('verify', async (data) => {
      const parsedData: EarlyBloomRodData = JSON.parse(data);

      const user = await container.client.users.fetch(parsedData.id);

      await user.send(
        response({
          description: 'Подтвердите привязывание аккаунта',
          buttons: [
            { customId: 'ok', emoji: '✅', label: 'Ок' },
            { customId: 'cancel', emoji: '❌', label: 'Отменить' },
          ],
        })
      );
    });
    container.loadingEmoji = '<a:loading:1231531520288755793>';

    return super.login(token);
  }
}

declare module '@sapphire/pieces' {
  interface Container {
    game: Game;
    socket: Socket;
    loadingEmoji: string;
  }
}
