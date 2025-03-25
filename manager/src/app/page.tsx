'use client';

import { CommandList } from '@/components/CommandList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Command Palette
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            コマンドを効率的に管理・実行するためのシステムです
          </p>
        </header>
        <main className="max-w-4xl mx-auto">
          <CommandList />
        </main>
      </div>
    </div>
  );
}
