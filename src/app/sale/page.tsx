'use client';
import { products } from '@/data/products';
import { DISCOUNTED_GAMES } from '@/data/discounts';
import GameCard from '@/components/store/GameCard';

export default function SalePage() {
  const saleEntries = Object.entries(DISCOUNTED_GAMES);

  return (
    <div className="sales-page" style={{ display: 'block', padding: '30px' }}>
      <div className="sales-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="sales-title" style={{ fontSize: '42px', color: '#ff4444', textShadow: '0 0 20px rgba(255,68,68,0.4)' }}>Скидки</h1>
        <p className="sales-subtitle" style={{ color: '#888', fontSize: '16px' }}>Успейте купить со скидкой</p>
      </div>

      <div className="games-grid">
        {saleEntries.map(([gameId]) => {
          const product = products[gameId];
          if (!product) return null;
          // Передаем ОРИГИНАЛЬНЫЙ product — GameCard сам применит скидку
          return <GameCard key={gameId} gameId={gameId} product={product} />;
        })}
      </div>
    </div>
  );
}
