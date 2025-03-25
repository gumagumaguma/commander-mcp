import { getAllCommands } from "../lib/db/index.js";
import { CommandResponse } from "../lib/types/index.js";
import { formatCommandDefinition } from "./formatCommandDefinition.js";

export async function listCommands(): Promise<CommandResponse> {
  try {
    const commands = await getAllCommands();

    if (!commands || commands.length === 0) {
      return {
        result: "登録されているコマンドはありません。",
        isError: false
      };
    }

    const commandList = commands.map(cmd => {
      const formattedDef = formatCommandDefinition(cmd.definition);
      return `・${cmd.name}: ${formattedDef}`;
    }).join('\n');

    return {
      result: `== 利用可能なコマンド一覧 ==\n${commandList}`,
      isError: false
    };
  } catch (error) {
    return {
      result: `コマンド一覧取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
      isError: true
    };
  }
}
