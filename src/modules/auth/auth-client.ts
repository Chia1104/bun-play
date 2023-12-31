import { Auth } from "@auth/core";
import { type AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../../db";

export const authConfig = {
  providers: [
    Google({
      clientId: Bun.env.GOOGLE_CLIENT_ID,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: Bun.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
  trustHost: true,
  adapter: DrizzleAdapter(db)
} satisfies AuthConfig;

export const authHandler = async (request: Request, config?: AuthConfig) => {
  return await Auth(request, {
    ...authConfig,
    ...config,
  });
};
