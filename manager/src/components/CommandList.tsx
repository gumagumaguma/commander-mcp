'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Command } from '@/lib/types';
import { fetchCommands } from '@/lib/api';
import { CreateCommandDialog } from './CreateCommandDialog';
import { EditCommandDialog } from './EditCommandDialog';
import { DeleteCommandDialog } from './DeleteCommandDialog';
import { toast } from 'sonner';
import { Edit2, Trash2, Terminal } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CommandList() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [editCommand, setEditCommand] = useState<Command | null>(null);
  const [deleteCommand, setDeleteCommand] = useState<Command | null>(null);

  const loadCommands = async () => {
    try {
      const data = await fetchCommands();
      setCommands(data);
    } catch (error) {
      toast.error('コマンドの読み込みに失敗しました');
    }
  };

  useEffect(() => {
    loadCommands();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          コマンド一覧
        </h2>
        <CreateCommandDialog onSuccess={loadCommands} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commands.length === 0 ? (
          <Card className="p-8 text-center col-span-full">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              コマンドが登録されていません
            </p>
            <CreateCommandDialog onSuccess={loadCommands} />
          </Card>
        ) : (
          commands.map((command) => (
            <Tooltip key={command.uuid} delayDuration={300}>
              <TooltipTrigger asChild>
                <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-help">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <Terminal className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {command.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditCommand(command)}
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteCommand(command)}
                        className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                className="max-w-[300px] p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
              >
                {command.definition}
              </TooltipContent>
            </Tooltip>
          ))
        )}
      </div>
      {editCommand && (
        <EditCommandDialog
          command={editCommand}
          open={!!editCommand}
          onOpenChange={(open) => !open && setEditCommand(null)}
          onSuccess={() => {
            loadCommands();
            toast.success('コマンドを更新しました');
          }}
        />
      )}
      {deleteCommand && (
        <DeleteCommandDialog
          command={deleteCommand}
          open={!!deleteCommand}
          onOpenChange={(open) => !open && setDeleteCommand(null)}
          onSuccess={() => {
            loadCommands();
            toast.success('コマンドを削除しました');
          }}
        />
      )}
    </div>
  );
}
