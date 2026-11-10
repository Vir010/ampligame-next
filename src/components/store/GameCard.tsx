'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { toggleWishlist, isInWishlist } from '@/lib/wishlist';
import { DISCOUNTED_GAMES } from '@/data/discounts';
import { getJSON } from '@/lib/storage';
import QuickViewModal from './QuickViewModal';

interface GameCardProps {
  gameId: string;
  product: Product;
  onWishlistToggle?: () => void;
}

export default function GameCard({ gameId, product, onWishlistToggle }: GameCardProps) {
  const [inWishlist, setInWishlist] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setInWishlist(isInWishlist(gameId));
    const library = getJSON<any[]>('user_game_library', []);
    setPurchased(library.some(g => g.id === gameId));
  }, [gameId]);

  const discount = DISCOUNTED_GAMES[gameId];
  const oldNum = parseInt(product.price.replace(/[^\d]/g, ''));
  const newNum = discount ? Math.round(oldNum * (100 - discount) / 100) : oldNum;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const added = toggleWishlist(gameId);
    setInWishlist(added);
    if (onWishlistToggle) onWishlistToggle();
  };

  const handleClick = () => {
    if (!purchased) setShowQuickView(true);
  };

  return (
    <>
      {showQuickView && <QuickViewModal gameId={gameId} product={product} onClose={() => setShowQuickView(false)} />}
      
      <div className="game-card" onClick={handleClick} style={{ cursor: purchased ? 'default' : 'pointer', position: 'relative', opacity: purchased ? 0.8 : 1 }}>
        {discount && !purchased && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#ff4444', color: '#fff', padding: '4px 10px', borderRadius: '8px', zIndex: 10, fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 10px rgba(255,68,68,0.4)' }}>
            -{discount}%
          </span>
        )}

        {purchased && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#4caf50', color: '#fff', padding: '4px 10px', borderRadius: '8px', zIndex: 10, fontWeight: 'bold', fontSize: '12px' }}>
            В библиотеке
          </span>
        )}

        <button className={`wish-btn ${inWishlist ? 'active' : ''}`} onClick={handleWishlist} style={{ zIndex: 10 }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </button>

        <img src={product.image} alt={product.title} />
        <h4>{product.title}</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
          {discount && !purchased ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '14px' }}>{oldNum} ₽</span>
              <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '16px' }}>{newNum} ₽</span>
            </>
          ) : (
            <span className="price">{product.price}</span>
          )}
        </div>

        <button 
          className="sellgame2" 
          disabled={purchased}
          onClick={(e) => { e.stopPropagation(); if (!purchased) setShowQuickView(true); }}
          style={purchased ? { background: '#2a475e', color: '#66c0f4', cursor: 'default' } : {}}
        >
          {purchased ? 'Куплено' : 'Купить'}
        </button>
      </div>
    </>
  );
}
