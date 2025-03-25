import { getCommandByName } from "../lib/db/index.js";
import { CommandResponse } from "../lib/types/index.js";
import { formatCommandDefinition } from "./formatCommandDefinition.js";

export async function processCommand(commandString: string): Promise<CommandResponse> {
  const parts = commandString.split(' ');

  const command = {
    name: "",
    args: "",
  };

  const partsLength = parts.length;
  switch (partsLength) {
    case 2:
      command.name = parts[1];
      break;
    case 3:
      command.name = parts[1];
      command.args = parts[2];
      break;
    default:
      break;
  }

  if (command.name == "") {
    return {
      result: "エラー: コマンドは 'am [コマンド名] [引数]' もしくは '[コマンド名] [引数]' の形式で入力してください。",
      isError: true
    };
  }

  try {
    const commandDef = await getCommandByName(command.name);

    if (!commandDef) {
      return {
        result: `エラー: コマンド '${command.name}' は定義されていません。`,
        isError: true
      };
    }

    const formattedDef = formatCommandDefinition(commandDef.definition);

    const response = `${formattedDef} ${command.args}`;

    return {
      result: response,
      isError: false
    };
  } catch (error) {
    return {
      result: `データベース検索中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
      isError: true
    };
  }
}
