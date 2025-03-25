export interface Command {
  uuid: string;
  name: string;
  definition: string;
  created_at: string;
  updated_at: string;
}

export type CommandResponse = {
  result: string;
  isError: boolean;
};
