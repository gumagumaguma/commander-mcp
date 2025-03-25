import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { commandSchema } from '@/lib/schema';
import { ERROR_MESSAGES } from '@/lib/constants';

type Params = { id: string };

export async function GET(
  request: Request,
  context: { params: Promise<Params> }
) {
  const { id } = await context.params;
  try {
    const db = await getDB();
    const command = await db.get(
      'SELECT * FROM commands WHERE uuid = ?',
      [id]
    );

    if (!command) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMMAND_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json(command);
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<Params> }
) {
  const { id } = await context.params;
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
    const result = await db.run(
      'UPDATE commands SET name = ?, definition = ?, updated_at = CURRENT_TIMESTAMP WHERE uuid = ?',
      [parsed.data.name, parsed.data.definition, id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMMAND_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
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

export async function DELETE(
  request: Request,
  context: { params: Promise<Params> }
) {
  const { id } = await context.params;
  try {
    const db = await getDB();
    const result = await db.run(
      'DELETE FROM commands WHERE uuid = ?',
      [id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMMAND_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 }
    );
  }
}
