'use client';
import { AlertTriangle } from "lucide-react";

interface ConfirmProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
}

export default function ConfirmModal({ isOpen, onConfirm, onCancel, title }: ConfirmProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xs rounded-3xl p-6 shadow-2xl scale-up-animation">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm mb-6">This action cannot be undone. The card will be deleted forever.</p>
          
          <div className="flex w-full gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition-colors"
            >
              Back
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}