import type { AppRouter } from "@early-bloom-rod/server";
import { isNullish } from "@sapphire/utilities";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createClient } from "redis";

export interface User {
  id: number;
  discordId?: string | null;
  telegramId?: string | null;
  fish: number;
}

export default class Game {
  platform: string;
  TRPCClient: ReturnType<typeof createTRPCClient<AppRouter>>;
  redis: ReturnType<typeof createClient>;

  constructor(options: {
    platform: "discord" | "telegram";
    redisClientUrl: string;
    TRPCClientUrl: string;
  }) {
    this.platform = options.platform;
    this.TRPCClient = createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: options.TRPCClientUrl,
        }),
      ],
    });
    this.redis = createClient({
      url: options.redisClientUrl,
    });
    this.redis.connect();
  }

  async getId(platformId: string): Promise<number> {
    const cachedIdKey = `getId:${this.platform}:${platformId}`;
    const cachedId = await this.redis.get(cachedIdKey);

    if (!isNullish(cachedId)) return Number(cachedId);

    const { id } = await this.TRPCClient.users.getId.query({
      [`${[this.platform]}Id`]: platformId,
    });

    await this.redis.set(cachedIdKey, id);

    return id;
  }

  async getProfile(id: number): Promise<User> {
    const cachedProfileKey = `profile:${id}`;
    const cachedProfile = await this.redis.get(cachedProfileKey);

    if (!isNullish(cachedProfile)) return JSON.parse(cachedProfile);

    const user = await this.TRPCClient.getProfile.query({
      id,
    });

    // TODO: Add details
    if (isNullish(user)) throw Error("...");

    await this.redis.set(cachedProfileKey, JSON.stringify(user));

    return user;
  }

  async getLeaders(): Promise<Array<User>> {
    const cachedLeadersKey = `leaders`;
    const cachedLeaders = await this.redis.get(cachedLeadersKey);

    if (!isNullish(cachedLeaders)) return JSON.parse(cachedLeaders);

    const users = await this.TRPCClient.getLeaders.query();

    await this.redis.set(cachedLeadersKey, JSON.stringify(users));

    return users;
  }

  async catchFish(id: number) {
    const { catched, user } = await this.TRPCClient.catchFish.mutate({ id });

    await this.redis.set(`profile:${id}`, JSON.stringify(user));

    return {
      catched,
    };
  }
}
