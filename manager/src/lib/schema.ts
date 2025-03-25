import { z } from 'zod';
import { ERROR_MESSAGES } from './constants';

export const commandSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.COMMAND_NAME_REQUIRED),
  definition: z.string().min(1, ERROR_MESSAGES.COMMAND_DEFINITION_REQUIRED),
});

export type CommandSchema = z.infer<typeof commandSchema>;
