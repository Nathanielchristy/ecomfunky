import { GetServerSideProps } from 'next';
import axios from 'axios';
import Link from 'next/link';
import { categories, Category } from '@/data/categories';
import { Product } from '@/data/products';
import { useCart } from '@/store/cartStore';

interface Props {
  category: Category;
  products?: Product[];
  categorySlugPath: string;
}

export default function CategoryPage({ category, products, categorySlugPath }: Props) {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-lg text-gray-600">
            Discover stylish picks in <span className="text-yellow-600 font-semibold">{category.name}</span>
          </p>
        </div>

        {/* Subcategories */}
        {category.children?.length ? (
          <div className="flex flex-wrap justify-center gap-10">
            {category.children.map((child) => {
              const path = `${categorySlugPath}/${child.name.toLowerCase()}`;
              return (
                <Link
                  key={child.id}
                  href={`/category${path}`}
                  className="group w-[260px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 hover:border-yellow-500 transition-all duration-300"
                >
                  <img
                    src={`/images/categories/${child.name.toLowerCase()}.jpg`}
                    alt={child.name}
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600">
                      {child.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // Show Products
          <div className="flex flex-wrap justify-center gap-10">
            {products?.map((product) => (
              <div
                key={product.id}
                className="w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover rounded-t-xl"
                />
                <div className="p-5 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Util: find category from slug
function findCategoryBySlug(slugs: string[], current: Category[] = categories): Category | null {
  for (const slug of slugs) {
    const match = current.find(cat => cat.name.toLowerCase() === slug.toLowerCase());
    if (!match) return null;
    current = match.children || [];
    if (slugs.indexOf(slug) === slugs.length - 1) return match;
  }
  return null;
}

// Server-side props
export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const slugArray = params?.slug as string[];

  const category = findCategoryBySlug(slugArray);
  if (!category) return { notFound: true };

  const categorySlugPath = '/' + slugArray.map(encodeURIComponent).join('/');
  const protocol = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${req.headers.host}`;

  if (!category.children || category.children.length === 0) {
    const res = await axios.get(`${baseUrl}/api/products?categoryId=${category.id}`, {
      headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN || 'dev-token' }
    });

    return {
      props: {
        category,
        products: res.data,
        categorySlugPath,
      },
    };
  }

  return {
    props: {
      category,
      categorySlugPath,
    },
  };
};
