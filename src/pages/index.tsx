import { GetServerSideProps } from 'next';
import axios from 'axios';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  children?: Category[];
}

interface HomeProps {
  categories: Category[];
}

export default function Home({ categories }: HomeProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
            Welcome to Fashion Store
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Explore premium clothing for Men & Women — find your style.
          </p>
        </section>

        {/* Category Cards */}
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center place-items-center">
              {category.children?.map((subcat) => {
                const imagePath = `/images/categories/${subcat.name.toLowerCase()}.jpg`;

                return (
                  <Link
                    key={subcat.id}
                    href={`/category/${encodeURIComponent(
                      category.name.toLowerCase()
                    )}/${encodeURIComponent(subcat.name.toLowerCase())}`}
                    className="group block bg-white p-5 rounded-xl shadow hover:shadow-xl transition border border-gray-200 w-full max-w-[280px]"
                  >
                    <div className="overflow-hidden rounded-md mb-4">
                      <img
                        src={imagePath}
                        alt={subcat.name}
                        className="h-40 w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 group-hover:text-yellow-600">
                      {subcat.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${req.headers.host}`;

  const res = await axios.get(`${baseUrl}/api/categories`, {
    headers: {
      'x-internal-token': process.env.INTERNAL_API_TOKEN || 'dev-token',
    },
  });

  return {
    props: {
      categories: res.data,
    },
  };
};
