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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price}</p>
        <button
        onClick={() => addToCart(product)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
        Add to Cart
        </button>
      </div>
    </div>
  );
}
