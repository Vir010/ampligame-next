'use client';
import { useEffect } from 'react';

export default function CloudPage() {
  useEffect(() => {
    // Анимация появления карточек тарифов
    const cards = document.querySelectorAll('.cloud-page .tariff-card');
    cards.forEach((card, index) => {
      const el = card as HTMLElement;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }, []);

  return (
    <div className="cloud-page" style={{ display: 'block' }}>
      <p className="cloud-mini">Cloud gaming</p>
      <h1 className="cloud-title">Почему AMPLIGAME?</h1>

      <div className="cloud-features">
        <div className="cloud-item">
          <div className="cloud-icon">
            <img src="/img/Ellipse 3.png" alt="" />
          </div>
          <h3>Плати только за время</h3>
          <p>С нас 5 000+ игр, с тебя — оплата только за время</p>
        </div>
        <div className="cloud-item">
          <div className="cloud-icon">
            <img src="/img/Ellipse 4.png" alt="" />
          </div>
          <h3>Поминутная оплата</h3>
          <p>
            Не обязательно играть весь оплаченный час — вернём остаток после
            завершения сессии
          </p>
        </div>
        <div className="cloud-item">
          <div className="cloud-icon">
            <img src="/img/Ellipse 5.png" alt="" />
          </div>
          <h3>Не лагает</h3>
          <p>
            Играй без тормозов, при проблемах можно выбрать другой сервер
          </p>
        </div>
        <div className="cloud-item">
          <div className="cloud-icon">
            <img src="/img/Ellipse 6.png" alt="" />
          </div>
          <h3>Сохраняй прогресс</h3>
          <p>
            Твои сейвы хранятся в облаке, продолжай игру с последнего места
          </p>
        </div>
      </div>

      <div className="cloud-tariffs">
        <h2 className="tariff-title">
          Найдите тариф, который подходит именно вам
        </h2>
        <div className="tariff-cards">
          <div className="tariff-card">
            <h3>Лайт</h3>
            <ul>
              <li>Безлимит на месяц, играйте без ограничений днём и ночью</li>
              <li>Full HD, до 60 FPS, поддержка RTX</li>
              <li>50 игр каталога*</li>
            </ul>
            <div className="price">999 ₽/мес</div>
            <button className="buy-btn"><a href="">Купить</a></button>
          </div>

          <div className="tariff-card">
            <h3>Комфорт</h3>
            <ul>
              <li>60 часов/мес + ночной безлимит 00:00–08:00 МСК</li>
              <li>до 4K, 120 FPS, поддержка RTX</li>
              <li>347 игр каталога</li>
              <li>Запуск ваших игр через Steam, EGS, EA и другие лаунчеры</li>
              <li>Установка любых игр и программ</li>
              <li>Сохранение неотыгранных часов</li>
            </ul>
            <div className="price">1 999 ₽/мес</div>
            <button className="buy-btn"><a href="">Купить</a></button>
          </div>

          <div className="tariff-card">
            <h3>Премиум</h3>
            <ul>
              <li>Безлимит на месяц, играйте без ограничений днём и ночью</li>
              <li>до 4K, 120 FPS, поддержка RTX</li>
              <li>347 игр каталога*</li>
              <li>Запуск ваших игр через Steam, EGS, EA и другие лаунчеры</li>
              <li>Установка любых игр и программ</li>
              <li>Максимальный приоритет в очереди</li>
            </ul>
            <div className="price">3 599 ₽/мес</div>
            <button className="buy-btn"><a href="">Купить</a></button>
          </div>
        </div>
        <p className="tariff-note">
          * Платные игры можно запустить только в том случае, если они у вас
          уже куплены
        </p>
      </div>
    </div>
  );
}
