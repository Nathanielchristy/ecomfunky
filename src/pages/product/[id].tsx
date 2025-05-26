import { GetServerSideProps } from 'next';
import { products, Product } from '@/data/products';
import { useCart } from '@/store/cartStore';

interface ProductPageProps {
  product: Product;
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params?.id);
  

  const product = products.find((p) => p.id === id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};
export default function ProductPage({ product }: ProductPageProps) {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Full Image Banner */}
      <div className="w-full h-[60vh] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-gray-600 text-base mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
