import { Elysia } from "elysia";
import { authHandler } from "./auth-client";
import { type AuthConfig } from "@auth/core";
import { cookie } from "@elysiajs/cookie";
import { serialize, parse, type CookieSerializeOptions } from "cookie";
import { type Provider } from "@auth/core/providers";
import { getToken, decode } from "@auth/core/jwt";

export const authPlugin = (authConfig?: AuthConfig) => {
  return (
    new Elysia({
      name: "auth",
      seed: authConfig,
    })
      .decorate("auth", authHandler)
      .state("auth", {})
      .use(cookie())
      .onBeforeHandle(async ({ request, set, store }) => {
        let authResponse = {};
        if (request.url.includes("/api/auth")) {
          authResponse = await authHandler(request.clone(), authConfig);
        }
        store.auth = authResponse;
      })
      /**
       * @todo
       */
      .derive((ctx) => {
        const getSession = () => {
          return null;
        };
        const getCsrfToken = () => {
          return null;
        };
        return {
          get session() {
            return getSession();
          },
          get csrfToken() {
            return getCsrfToken();
          },
        };
      })
  );
};

export const authGroups = (authConfig?: AuthConfig) => {
  return new Elysia({ prefix: "/api/auth" })
    .use(authPlugin(authConfig))
    .get("/signin", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .post("/signin/:provider", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/callback/:provider", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .post("/callback/:provider", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/signout", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .post("/signout", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/session", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/csrf", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/providers", async ({ auth, request }) => {
      return await auth(request.clone());
    })
    .get("/error", async ({ auth, request }) => {
      return await auth(request.clone());
    });
};
