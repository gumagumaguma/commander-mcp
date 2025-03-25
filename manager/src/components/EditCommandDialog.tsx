'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Command } from '@/lib/types';
import { updateCommand } from '@/lib/api';
import { toast } from 'sonner';

interface EditCommandDialogProps {
  command: Command;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditCommandDialog({
  command,
  open,
  onOpenChange,
  onSuccess,
}: EditCommandDialogProps) {
  const [name, setName] = useState(command.name);
  const [definition, setDefinition] = useState(command.definition);

  useEffect(() => {
    setName(command.name);
    setDefinition(command.definition);
  }, [command]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCommand(command.uuid, { name, definition });
      onOpenChange(false);
      onSuccess();
      toast.success('コマンドを更新しました');
    } catch (error) {
      if (error instanceof Error && error.message === 'Command name already exists') {
        toast.error(`コマンド名「${name}」は既に使用されています`);
      } else {
        toast.error('コマンドの更新に失敗しました');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>コマンド編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">コマンド名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="definition">定義</Label>
            <Textarea
              id="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            />
          </div>
          <Button type="submit">更新</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
