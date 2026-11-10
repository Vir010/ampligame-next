'use client';
import { useState } from 'react';
import GameGrid from '@/components/store/GameGrid';
import SwiperBanner from '@/components/store/SwiperBanner';
import SearchBar from '@/components/store/SearchBar';

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="store-content" style={{ display: 'block', padding: '20px' }}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {!searchQuery && (
        <>
          <h2 className="store-glav">Главное</h2>
          <SwiperBanner />
        </>
      )}

      <h2 className="store-games-title">
        {searchQuery ? `Результаты поиска по запросу "${searchQuery}"` : 'Популярные игры'}
      </h2>
      <GameGrid searchQuery={searchQuery} />
    </div>
  );
}
