'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCommand } from '@/lib/api';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

interface CreateCommandDialogProps {
  onSuccess: () => void;
}

export function CreateCommandDialog({ onSuccess }: CreateCommandDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [definition, setDefinition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createCommand({ name, definition });
      setOpen(false);
      setName('');
      setDefinition('');
      onSuccess();
      toast.success('コマンドを作成しました');
    } catch (error) {
      if (error instanceof Error && error.message === 'Command name already exists') {
        toast.error(`コマンド名「${name}」は既に使用されています`);
      } else {
        toast.error('コマンドの作成に失敗しました');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        新規作成
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">新規コマンド作成</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base">
                コマンド名
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
                placeholder="例: /give @p diamond"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="definition" className="text-base">
                定義
              </Label>
              <Textarea
                id="definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                className="h-32 focus:ring-2 focus:ring-blue-500"
                placeholder="コマンドの説明や使用方法を入力してください"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? '作成中...' : '作成'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
