'use client';
import { useState } from 'react';
import LegalModal from '@/components/legal/LegalModal';
import SupportChatModal from '@/components/supports/SupportChatModal';
import { showToast } from '@/lib/toast';

export default function SupportsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [legalType, setLegalType] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const faqs = [
    { q: 'Как купить игру?', a: 'Выберите игру в магазине, нажмите "Купить" и следуйте инструкциям оплаты.' },
    { q: 'Как установить игру из библиотеки?', a: 'Перейдите в библиотеку, нажмите на игру и выберите "Установить".' },
    { q: 'Как вернуть игру?', a: 'Возврат возможен в течение 14 дней, если игра не была установлена.' },
    { q: 'Не запускается игра', a: 'Проверьте системные требования и обновите драйвера видеокарты.' },
  ];

  return (
    <div className="supports-page" style={{ display: 'block' }}>
      {legalType && <LegalModal type={legalType} onClose={() => setLegalType(null)} />}
      {showChat && <SupportChatModal onClose={() => setShowChat(false)} />}
      
      <div className="supports-container">
        <h1 className="supports-title">Центр поддержки</h1>

        <div className="supports-grid">
          {/* FAQ */}
          <div className="supports-section">
            <h2 className="supports-section-title">Часто задаваемые вопросы</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                  </div>
                  <div className="faq-answer" style={{ maxHeight: openFaq === i ? '200px' : '0', padding: openFaq === i ? '10px 15px' : '0 15px' }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Связаться с нами */}
          <div className="supports-section">
            <h2 className="supports-section-title">Связаться с нами</h2>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3>Email</h3>
                  <p>support@ampligame.ru</p>
                </div>
                <button className="contact-btn" onClick={() => window.location.href = 'mailto:support@ampligame.ru'}>Написать</button>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3>Чат</h3>
                  <p>Онлайн 24/7</p>
                </div>
                <button className="contact-btn open-chat-btn" onClick={() => setShowChat(true)}>Открыть чат</button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3>Telegram</h3>
                  <p>@Era66Era</p>
                </div>
                <button className="contact-btn" onClick={() => window.open('https://t.me/ampligame_support', '_blank')}>Перейти</button>
              </div>
            </div>
          </div>

          {/* Системные требования */}
          <div className="supports-section">
            <h2 className="supports-section-title">Системные требования</h2>
            <div className="requirements">
              <div className="req-item">
                <span className="req-label">ОС:</span>
                <span className="req-value">Windows 10/11 (64-bit)</span>
              </div>
              <div className="req-item">
                <span className="req-label">Процессор:</span>
                <span className="req-value">Intel Core i5 / AMD Ryzen 5</span>
              </div>
              <div className="req-item">
                <span className="req-label">Оперативная память:</span>
                <span className="req-value">8 GB</span>
              </div>
              <div className="req-item">
                <span className="req-label">Видеокарта:</span>
                <span className="req-value">NVIDIA GeForce GTX 1060 / AMD Radeon RX 580</span>
              </div>
              <div className="req-item">
                <span className="req-label">Место на диске:</span>
                <span className="req-value">
                  80 GB - в среднем для установки почти каждой игры <br />
                  <p className="text-gb" style={{ color: '#ffaa00', fontSize: '12px', marginTop: '5px' }}>Мало места? Предоставляем услуги Облачного гейминга!</p>
                </span>
              </div>
            </div>
          </div>

          {/* Полезные ссылки */}
          <div className="supports-section">
            <h2 className="supports-section-title">Полезные ссылки</h2>
            <ul className="useful-links">
              {[
                { id: 'faq', title: 'FAQ' },
                { id: 'rules', title: 'Правила платформы' },
                { id: 'privacy', title: 'Политика конфиденциальности' },
                { id: 'terms', title: 'Условия использования' },
                { id: 'refund', title: 'Политика возврата' }
              ].map(link => (
                <li key={link.id}>
                  <button className="useful-link" onClick={() => setLegalType(link.id)}>
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
