'use client';

import GameCard from './GameCard';
import { products } from '@/data/products';

export default function GameGrid({ searchQuery }: { searchQuery: string }) {
  let entries = Object.entries(products);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    entries = entries.filter(([_, p]) => 
      p.title.toLowerCase().includes(q) || 
      p.genre.toLowerCase().includes(q) ||
      p.developer.toLowerCase().includes(q)
    );
  }

  if (entries.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
        <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" opacity="0.3" style={{ margin: '0 auto 15px' }}><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <p>Ничего не найдено по запросу "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="games-grid">
      {entries.map(([gameId, product]) => (
        <GameCard key={gameId} gameId={gameId} product={product} />
      ))}
    </div>
  );
}
