import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  processCommand,
  listCommands
} from "./tools/index.js";

function setupServer() {
  const server = new McpServer({
    name: "CommandProcessor",
    version: "1.0.0"
  });

  server.tool(
    "process_command",
    {
      commandString: z.string()
    },
    async ({ commandString }: { commandString: string }) => {
      const { result, isError } = await processCommand(commandString);

      return {
        content: [{
          type: "text",
          text: result,
        }],
        isError
      }
    }
  );

  server.tool(
    "list_commands",
    {},
    async () => {
      const { result, isError } = await listCommands();

      return {
        content: [{
          type: "text",
          text: result,
        }],
        isError
      }
    }
  );

  return server;
}

const server = setupServer();
const transport = new StdioServerTransport();

async function startServer() {
  await server.connect(transport);
}

startServer();
