import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { BaseHtml } from "./components/todo";
import { authPlugin, authGroups } from "./modules/auth";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(authPlugin())
  .use(authGroups())
  .use(html())
  .use(
    swagger({
      path: "api/documentation",
      documentation: {
        info: {
          title: "Elysia Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .get(
    "/",
    async ({ html }) => {
      return html(
        <BaseHtml>
          <body
            class="flex w-full h-screen justify-center items-center"
            hx-get="/todos"
            hx-swap="innerHTML"
            hx-trigger="load"
          >
            <h1>Todo List</h1>
            <br />
          </body>
        </BaseHtml>
      );
    },
    {
      detail: {
        summary: "root",
        tags: ["base"],
      },
    }
  )
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
