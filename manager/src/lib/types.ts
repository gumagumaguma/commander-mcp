export type Command = {
  uuid: string;
  name: string;
  definition: string;
  created_at: string;
  updated_at: string;
};

export type CommandInput = {
  name: string;
  definition: string;
};
