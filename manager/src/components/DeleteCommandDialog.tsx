'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Command } from '@/lib/types';
import { deleteCommand } from '@/lib/api';
import { toast } from 'sonner';

interface DeleteCommandDialogProps {
  command: Command;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteCommandDialog({
  command,
  open,
  onOpenChange,
  onSuccess,
}: DeleteCommandDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteCommand(command.uuid);
      onOpenChange(false);
      onSuccess();
      toast.success('コマンドを削除しました');
    } catch (error) {
      if (error instanceof Error && error.message === 'Command not found') {
        toast.error('コマンドが見つかりません');
      } else {
        toast.error('コマンドの削除に失敗しました');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>コマンドの削除</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            コマンド「{command.name}」を削除してもよろしいですか？
            この操作は取り消せません。
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              削除
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
