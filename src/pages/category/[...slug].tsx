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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-10 text-gray-900">{category.name}</h1>

        {/* Subcategory Cards */}
        {category.children?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center place-items-center">
            {category.children.map((child) => {
              const childPath = `${categorySlugPath}/${child.name.toLowerCase()}`;
              const imagePath = `/images/categories/${child.name.toLowerCase()}.jpg`;

              return (
                <Link
                  key={child.id}
                  href={`/category${childPath}`}
                  className="group block bg-white p-5 rounded-xl shadow hover:shadow-xl transition border border-gray-200 w-full max-w-[280px] text-center"
                >
                  <div className="overflow-hidden rounded-md mb-4">
                    <img
                      src={imagePath}
                      alt={child.name}
                      className="h-40 w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                    {child.name}
                  </h2>
                </Link>
              );
            })}
          </div>
        ) : (
          // Product Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center place-items-center">
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border border-gray-200 w-full max-w-[280px] text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 text-center">{product.description}</p>
                <p className="text-center text-lg font-bold text-gray-800 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-black text-white text-sm py-2 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 text-center text-sm py-2 rounded bg-gray-200 text-black hover:bg-gray-300 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Helper: Find category by slug path
function findCategoryBySlug(slugs: string[], current: Category[] = categories): Category | null {
  for (const slug of slugs) {
    const match = current.find(cat => cat.name.toLowerCase() === slug.toLowerCase());
    if (!match) return null;
    current = match.children || [];
    if (slugs.indexOf(slug) === slugs.length - 1) return match;
  }
  return null;
}

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const slugArray = params?.slug as string[];

  const category = findCategoryBySlug(slugArray);
  if (!category) return { notFound: true };

  const categorySlugPath = '/' + slugArray.map(encodeURIComponent).join('/');
  const protocol = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${req.headers.host}`;

  if (!category.children || category.children.length === 0) {
    const res = await axios.get(`${baseUrl}/api/products?categoryId=${category.id}`, {
      headers: {
        'x-internal-token': process.env.INTERNAL_API_TOKEN || 'dev-token',
      },
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
