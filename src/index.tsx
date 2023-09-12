import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { BaseHtml } from "./components/todo";
import { authPlugin } from "./modules/auth";

const app = new Elysia()
  .use(html())
  // .use(authPlugin())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/todos"
          hx-swap="innerHTML"
          hx-trigger="load"
        >
          <h1>Todo List</h1>
        </body>
      </BaseHtml>
    )
  )
  .group(
    "auth",
    {
      request: t.Any,
      headers: t.Object({
        authorization: t.Literal("Bearer token"),
      }),
      whatIsThis: t.Any,
      // body: t.String(),
    },
    (app) => app.get("/test", ({ body, headers, html }) => html(<p>{body}</p>), {
      beforeHandle: ({ request }) => console.log("before handle"),
    })
  )
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
