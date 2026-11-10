'use client';
import { useState, useEffect } from 'react';
import { getJSON, setJSON } from '@/lib/storage';
import { showToast } from '@/lib/toast';

interface Group {
  id: string;
  name: string;
  desc: string;
  members: number;
  posts: number;
  color: string;
  isMember: boolean;
  isOwner?: boolean;
  rating?: number;
}

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'popular'>('my');
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', desc: '' });

  const loadGroups = () => {
    const saved = getJSON<Group[]>('user_groups', []);
    if (saved.length > 0) {
      setGroups(saved);
    } else {
      const defaults: Group[] = [
        { id: 'g1', name: 'Gaming Community', desc: 'Обсуждаем новинки игр, делимся впечатлениями', members: 2500, posts: 150, color: '#8f3ed1', isMember: true, isOwner: true },
        { id: 'g2', name: 'CS2 Pro Players', desc: 'Турниры, тренировки, тактики', members: 1200, posts: 89, color: '#e74c3c', isMember: true },
        { id: 'g3', name: 'Dota 2 Fans', desc: 'Патчи, герои, турниры и общение', members: 3800, posts: 210, color: '#27ae60', isMember: true },
        { id: 'g4', name: 'RPG World', desc: 'Крупнейшее сообщество любителей RPG', members: 15000, posts: 1200, color: '#f39c12', isMember: false, rating: 4.8 },
        { id: 'g5', name: 'Indie Games Hub', desc: 'Всё об инди-играх', members: 12000, posts: 890, color: '#9b59b6', isMember: false, rating: 4.9 },
      ];
      setGroups(defaults);
      setJSON('user_groups', defaults);
    }
  };

  useEffect(() => { loadGroups(); }, []);

  const handleJoin = (id: string) => {
    const updated = groups.map(g => g.id === id ? { ...g, isMember: true, members: g.members + 1 } : g);
    setGroups(updated);
    setJSON('user_groups', updated);
    showToast('Вы вступили в группу!', 'success');
  };

  const handleLeave = (id: string) => {
    const updated = groups.map(g => g.id === id ? { ...g, isMember: false, members: g.members - 1 } : g);
    setGroups(updated);
    setJSON('user_groups', updated);
    showToast('Вы покинули группу', 'info');
  };

  const handleCreate = () => {
    if (!newGroup.name.trim()) return;
    const newG: Group = {
      id: 'g_' + Date.now(),
      name: newGroup.name.trim(),
      desc: newGroup.desc.trim() || 'Без описания',
      members: 1,
      posts: 0,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      isMember: true,
      isOwner: true,
    };
    const updated = [newG, ...groups];
    setGroups(updated);
    setJSON('user_groups', updated);
    setShowCreate(false);
    setNewGroup({ name: '', desc: '' });
    showToast('Группа создана!', 'success');
  };

  const displayed = activeTab === 'my' ? groups.filter(g => g.isMember) : groups.filter(g => !g.isMember);

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Группы и сообщества</h1>
        <button onClick={() => setShowCreate(true)} style={{ padding: '10px 20px', background: '#8f3ed1', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Создать группу
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('my')} style={{ padding: '10px 24px', background: activeTab === 'my' ? '#8f3ed1' : '#222', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Мои группы ({groups.filter(g => g.isMember).length})</button>
        <button onClick={() => setActiveTab('popular')} style={{ padding: '10px 24px', background: activeTab === 'popular' ? '#8f3ed1' : '#222', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Популярные</button>
      </div>

      {displayed.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>Групп пока нет</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {displayed.map(g => (
            <div key={g.id} style={{ background: '#1a1a1a', borderRadius: '15px', overflow: 'hidden', border: '1px solid #333' }}>
              <div style={{ height: '6px', background: g.color }}></div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, color: '#fff' }}>{g.name}</h3>
                  {g.rating && <span style={{ background: 'rgba(255,170,0,0.2)', color: '#ffaa00', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>★ {g.rating}</span>}
                </div>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '15px' }}>{g.desc}</p>
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '10px 0', marginBottom: '15px' }}>
                  <div><span style={{ color: '#fff', fontWeight: 'bold', display: 'block' }}>{g.members.toLocaleString()}</span><span style={{ fontSize: '11px', color: '#888' }}>участников</span></div>
                  <div><span style={{ color: '#fff', fontWeight: 'bold', display: 'block' }}>{g.posts}</span><span style={{ fontSize: '11px', color: '#888' }}>постов</span></div>
                </div>
                {g.isMember ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => alert(`Открываем группу "${g.name}"`)} style={{ flex: 2, padding: '10px', background: '#8f3ed1', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Открыть</button>
                    {!g.isOwner && <button onClick={() => handleLeave(g.id)} style={{ flex: 1, padding: '10px', background: 'transparent', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '10px', cursor: 'pointer' }}>Выйти</button>}
                  </div>
                ) : (
                  <button onClick={() => handleJoin(g.id)} style={{ width: '100%', padding: '10px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Вступить</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid #8f3ed1' }}>
            <h3 style={{ marginTop: 0, color: '#fff' }}>Создать группу</h3>
            <input type="text" placeholder="Название" value={newGroup.name} onChange={e => setNewGroup({...newGroup, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '10px' }} />
            <textarea placeholder="Описание" value={newGroup.desc} onChange={e => setNewGroup({...newGroup, desc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '15px', minHeight: '60px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleCreate} style={{ flex: 1, padding: '10px', background: '#8f3ed1', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Создать</button>
              <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #333', borderRadius: '8px', color: '#aaa', cursor: 'pointer' }}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
