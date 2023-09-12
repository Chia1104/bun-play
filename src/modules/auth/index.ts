import { Elysia } from "elysia";
import { authHandler } from "./auth-client";
import { type AuthConfig } from "@auth/core";
import { cookie } from "@elysiajs/cookie";
import { serialize, parse, type CookieSerializeOptions } from "cookie";

export const authPlugin = (authConfig?: AuthConfig) => {
  return (
    new Elysia({
      name: "auth",
      seed: authConfig
    })
      .decorate("auth", authHandler)
      .state("auth", {})
      // .use(cookie())
      .onBeforeHandle(async ({ request, set, store }) => {
        /**
         * @todo
         */
        const authResponse = await authHandler(request, authConfig);
        store.auth = authResponse;
      })
      /**
       * @todo
       */
      .derive((ctx) => {
        const getSession = () => {
            return null
        }
        return {
            get session() {
                return getSession()
            },
          }
      })
  );
};
