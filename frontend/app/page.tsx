"use client";
import { useState, useEffect } from 'react';
import Card from '@/components/cards';
import Confirm from '@/components/confirm';
import { Plus, X } from 'lucide-react';

export default function WalletPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem('my-cards');
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      setCards([]);
    }
  }, []);

  const requestDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      const updatedCards = cards.filter(c => c.id !== deletingId);
      setCards(updatedCards);
      localStorage.setItem('my-cards', JSON.stringify(updatedCards));
      setDeletingId(null);
      setExpandedId(null);
    }
  };

  const addCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCard = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      code: formData.get('code') as string,
      color: formData.get('color') as string,
    };
    
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    localStorage.setItem('my-cards', JSON.stringify(updatedCards));
    setIsAdding(false);
  };

  const syncToServer = async (data: any[]) => {
      if (typeof window === 'undefined' || !navigator.onLine || data.length === 0) return;

      try {
        const response = await fetch('http://localhost:8000/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          console.log("Data successfully backed up on server");
        }
      } catch (err) {
        console.log("The server is unavailable, synchronization will occur later.");
      }
    };

    useEffect(() => {
      syncToServer(cards);
    }, [cards]);

    useEffect(() => {
      const handleOnline = () => {
        console.log("You're back online, syncing...");
        syncToServer(cards);
      };

      window.addEventListener('online', handleOnline);
      return () => window.removeEventListener('online', handleOnline);
    }, [cards]);

  return (
    <main className="flex-1 p-4 max-w-md mx-auto w-full min-h-screen pb-32">
      <header className="flex justify-between items-center py-8">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic">W-Cards</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-3 bg-white text-black rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* CARDS LIST */}
      <div className="flex flex-col">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            isExpanded={expandedId === card.id}
            onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
            onDelete={requestDelete}
          />
        ))}
      </div>

      <Confirm 
        isOpen={!!deletingId} 
        title="Delete card?"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />

      {isAdding && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] p-6 flex flex-col justify-center">
          <div className="flex justify-end absolute top-6 right-6">
            <button onClick={() => setIsAdding(false)} className="p-2 bg-zinc-900 rounded-full text-white">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={addCard} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4 italic text-white text-center uppercase">New card</h2>
            <input name="name" placeholder="Název (např. Lidl)" className="bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 text-white placeholder:text-zinc-500" required />
            <input name="code" placeholder="Číslo karty / EAN" className="bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 text-white placeholder:text-zinc-500" required />
            <select name="color" className="bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-800 text-white">
              <option value="bg-blue-600">Blue (Lidl, Tesco)</option>
              <option value="bg-red-600">Red (Kaufland, Penny)</option>
              <option value="bg-yellow-500">Yellow (Billa, Raiffeisen)</option>
              <option value="bg-green-600">Green (Dr. Max, Albert)</option>
              <option value="bg-orange-500">Orange (Albert logo, CCC)</option>
              <option value="bg-zinc-800">Gray (Apple, Others)</option>
              <option value="bg-purple-600">Purple (Orsay, Others)</option>
              <option value="bg-pink-500">Pink (T-Mobile)</option>
            </select>
            <button type="submit" className="bg-white text-black p-4 rounded-xl font-black mt-4 uppercase">Save card</button>
          </form>
        </div>
      )}
    </main>
  );
}