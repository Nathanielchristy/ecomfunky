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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">
          Explore Categories
        </h1>

        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 px-2">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.children?.map((subcat) => (
                <Link
                  key={subcat.id}
                  href={`/category/${encodeURIComponent(
                    category.name.toLowerCase()
                  )}/${encodeURIComponent(subcat.name.toLowerCase())}`}
                  className="block bg-white p-6 rounded-xl shadow hover:shadow-lg border border-gray-200 transition text-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {subcat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/categories');
  return {
    props: {
      categories: res.data,
    },
  };
};
