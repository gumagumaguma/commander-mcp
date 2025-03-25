import { Command, CommandInput } from './types';

export async function fetchCommands(): Promise<Command[]> {
  const response = await fetch('/api/commands');
  const data = await response.json();
  return data.commands;
}

export async function createCommand(input: CommandInput): Promise<void> {
  const response = await fetch('/api/commands', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
}

export async function updateCommand(uuid: string, input: CommandInput): Promise<void> {
  const response = await fetch(`/api/commands/${uuid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
}

export async function deleteCommand(uuid: string): Promise<void> {
  const response = await fetch(`/api/commands/${uuid}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
}
