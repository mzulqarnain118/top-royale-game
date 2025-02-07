/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/home` | `/home/after-action-report` | `/home/battle-royale` | `/home/deathmatch` | `/home/leaderboard` | `/home/loadout` | `/home/stats` | `/home/waiting-room-battle-royale` | `/home/waiting-room-deathmatch` | `/login` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
