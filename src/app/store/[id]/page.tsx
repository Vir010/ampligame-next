import { Metadata } from 'next';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDescription from '@/components/store/ProductDescription';
import BuyButton from '@/components/store/BuyButton';
import { DISCOUNTED_GAMES } from '@/data/discounts';
import ProductReviews from '@/components/store/ProductReviews';

// Генерация SEO-метаданных
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products[id];
  if (!product) return { title: 'Игра не найдена | AMPLIGAME' };

  return {
    title: `${product.title} — купить в AMPLIGAME`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: [product.image],
    },
  };
}

// Основной компонент
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products[id];
  if (!product) notFound();

  const discount = DISCOUNTED_GAMES[id];
  const oldPriceNum = parseInt(product.price.replace(/[^\d]/g, ''));
  const finalPriceNum = discount ? Math.round(oldPriceNum * (100 - discount) / 100) : oldPriceNum;
  const finalPriceStr = `${finalPriceNum} ₽`;

  return (
    <div className="product-page" style={{ padding: '20px' }}>
      <div className="product-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/store" className="product-back-btn" style={{ display: 'inline-block', background: '#714197', color: '#fff', padding: '8px 16px', borderRadius: '8px', marginBottom: '15px', textDecoration: 'none', fontWeight: 'bold' }}>
          Назад в магазин
        </Link>

        <div className="product-content" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '30px', background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
          <div className="product-image">
            <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '15px' }} />
          </div>

          <div className="product-info">
            <h1 style={{ fontSize: '32px', margin: '0 0 15px 0', color: '#fff' }}>{product.title}</h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px' }}>
              <span style={{ color: '#b4a8ff', fontSize: '14px' }}>Разработчик: {product.developer}</span>
              <span style={{ color: '#b4a8ff', fontSize: '14px' }}>Год: {product.releaseDate}</span>
              <span style={{ color: '#b4a8ff', fontSize: '14px' }}>Жанр: {product.genre}</span>
            </div>

            <ProductDescription text={product.description} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px', flexWrap: 'wrap' }}>
              {discount ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px', color: '#888', textDecoration: 'line-through' }}>{product.price}</span>
                  <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#4caf50' }}>{finalPriceStr}</span>
                  <span style={{ background: '#ff4444', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>-{discount}%</span>
                </div>
              ) : (
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#8f3ed1' }}>{finalPriceStr}</span>
              )}
              
              <BuyButton gameId={id} title={product.title} price={finalPriceStr} />
            </div>
          </div>
        </div>

        {/* Обзоры (вынесены в отдельный клиентский компонент) */}
        <ProductReviews gameId={id} gameTitle={product.title} />
      </div>
    </div>
  );
}
