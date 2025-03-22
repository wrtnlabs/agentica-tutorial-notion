import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";

import { NotionService } from "@wrtnlabs/connector-notion";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Notion Connector",
      protocol: "class",
      application: typia.llm.application<NotionService, "chatgpt">(),
      execute: new NotionService({
        secret: process.env.NOTION_SECRET_KEY!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
