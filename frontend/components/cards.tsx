"use client";
import Barcode from 'react-barcode';
import { Trash2 } from 'lucide-react';

interface CardProps {
  id: string;
  name: string;
  color: string;
  code: string;
  isExpanded: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export default function Card({ id, name, color, code, isExpanded, onClick, onDelete }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative w-full rounded-2xl p-6 text-white shadow-2xl transition-all duration-500 cursor-pointer
        ${color} 
        ${isExpanded ? 'h-[22rem] z-50 mb-6' : 'h-32 -mb-16 hover:-translate-y-2'}
      `}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold tracking-tight uppercase italic">{name}</h2>
        {isExpanded ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-md" />
        )}
      </div>

      <div className={`
        mt-8 bg-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-500
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        {isExpanded && (
          <div className="flex flex-col items-center">
            <Barcode 
              value={code} 
              width={1.5} 
              height={80} 
              displayValue={true} 
              background="transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}