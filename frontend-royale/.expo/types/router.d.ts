/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\services\axiosApiInstance` | `/..\services\socketService` | `/_sitemap` | `/home` | `/home/after-action-report` | `/home/battle-royale` | `/home/deathmatch` | `/home/loadout` | `/home/stats` | `/home/waiting-room` | `/login` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
