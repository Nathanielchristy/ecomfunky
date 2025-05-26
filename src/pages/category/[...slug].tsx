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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">
          {category.name}
        </h1>

        {/* If category has children, show subcategory cards */}
        {category.children?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.children.map((child) => {
              const childPath = `${categorySlugPath}/${child.name.toLowerCase()}`;
              return (
                <Link
                  key={child.id}
                  href={`/category${childPath}`}
                  className="block bg-white p-6 rounded-xl shadow hover:shadow-lg border border-gray-200 transition text-center"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {child.name}
                  </h2>
                </Link>
              );
            })}
          </div>
        ) : (
          // Otherwise, show product cards
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <li
                key={product.id}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-gray-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mb-4">
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
              </li>
            ))}
          </ul>
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

  // Build base URL dynamically
  const protocol = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${req.headers.host}`;

  // If this is a leaf category (no children), fetch products
  if (!category.children || category.children.length === 0) {
    const res = await axios.get(`${baseUrl}/api/products?categoryId=${category.id}`, {
      headers: {
        'x-internal-token': process.env.INTERNAL_API_TOKEN || 'dev-token'
      }
    });

    return {
      props: {
        category,
        products: res.data,
        categorySlugPath,
      },
    };
  }

  // Return subcategory view
  return {
    props: {
      category,
      categorySlugPath,
    },
  };
};