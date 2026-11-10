'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function SwiperBanner() {
  const topImages = [
    "/img/witcher.svg", "/img/Rectangle 56 (1).svg", "/img/starcraft.svg",
    "/img/dragonAge.svg", "/img/Rectangle 61 (1).svg", "/img/Rectangle 59.svg",
    "/img/Rectangle 62.svg", "/img/Rectangle 60.svg", "/img/Rectangle 64.svg",
    "/img/Rectangle 63.svg"
  ];

  const bottomImages = [
    "/img/Rectangle 66.svg", "/img/Rectangle 65.svg", "/img/Rectangle 67.svg",
    "/img/Rectangle 68.svg", "/img/Rectangle 69.svg", "/img/Rectangle 70.svg",
    "/img/Rectangle 71.svg", "/img/Rectangle 72.svg", "/img/Rectangle 73.svg",
    "/img/Rectangle 80.svg"
  ];

  return (
    <div className="my-swiper-container" style={{ marginBottom: '40px', width: '100%', overflow: 'hidden' }}>
      
      {/* Верхний слайдер */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        slidesPerView="auto"
        loop={true}
        freeMode={true}
        speed={4000}
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
        className="swiperTop"
        style={{ marginBottom: '20px' }}
      >
        {topImages.map((img, i) => (
          <SwiperSlide key={i} style={{ width: '240px', flexShrink: 0 }}>
            <div style={{ width: '100%', height: '140px', background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden' }}>
              <img 
                src={img} 
                alt={`Slide ${i}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={() => console.log('Ошибка загрузки картинки:', img)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Нижний слайдер */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        slidesPerView="auto"
        loop={true}
        freeMode={true}
        speed={4000}
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
        className="swiperBottom"
      >
        {bottomImages.map((img, i) => (
          <SwiperSlide key={i} style={{ width: '240px', flexShrink: 0 }}>
             <div style={{ width: '100%', height: '140px', background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden' }}>
              <img 
                src={img} 
                alt={`Slide ${i}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={() => console.log('Ошибка загрузки картинки:', img)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
