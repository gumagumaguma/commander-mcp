import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { commandSchema } from '@/lib/schema';
import { ERROR_MESSAGES } from '@/lib/constants';

export async function GET() {
  try {
    const db = await getDB();
    const commands = await db.all(
      'SELECT uuid, name, definition, created_at, updated_at FROM commands'
    );
    return NextResponse.json({ commands });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = commandSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    const db = await getDB();
    await db.run(
      'INSERT INTO commands (uuid, name, definition) VALUES (?, ?, ?)',
      [crypto.randomUUID(), parsed.data.name, parsed.data.definition]
    );

    return NextResponse.json({ message: 'Created' });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'SQLITE_CONSTRAINT') {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMMAND_NAME_EXISTS },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
