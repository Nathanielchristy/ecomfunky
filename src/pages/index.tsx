import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";

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
    <main className="min-h-screen bg-white">
    <section
      className="relative h-[90vh] bg-contain bg-left bg-no-repeat  flex items-center justify-end px-8 lg:px-24"
      style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
    >
      {/* Overlay (optional for better text contrast) */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Text Content */}
      <div className="relative z-10 max-w-xl text-right text-white">
        <h1 className="text-5xl font-extrabold mb-4">Discover Your Style</h1>
        <p className="text-lg mb-6 leading-relaxed text-gray-100">
          Shop the latest fashion for men and women with elegant designs and premium quality.
        </p>
        <a
          href="#categories"
          className="inline-block bg-white text-black px-6 py-3 font-medium rounded hover:bg-yellow-500 transition"
        >
          Explore Categories
        </a>
      </div>
    </section>



    <section id="categories" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">
            Explore hand-picked collections for every occasion and style.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="mb-20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-semibold text-gray-800">{category.name}</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {category.children?.map((subcat) => {
                const imagePath = `/images/categories/${subcat.name.toLowerCase()}.jpg`;

                return (
                  <Link
                    key={subcat.id}
                    href={`/category/${encodeURIComponent(
                      category.name.toLowerCase()
                    )}/${encodeURIComponent(subcat.name.toLowerCase())}`}
                    className="group w-[260px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 hover:border-yellow-500 transition-all duration-300"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={imagePath}
                        alt={subcat.name}
                        className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
                        {subcat.name}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>





    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers.host?.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${req.headers.host}`;

  const res = await axios.get(`${baseUrl}/api/categories`, {
    headers: {
      "x-internal-token": process.env.INTERNAL_API_TOKEN || "dev-token",
    },
  });

  return {
    props: {
      categories: res.data,
    },
  };
};
