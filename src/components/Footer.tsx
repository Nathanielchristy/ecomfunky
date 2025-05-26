import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">FashionStore</h4>
          <p className="text-sm text-gray-300">
            Discover high-quality fashion for men and women. Stylish, sustainable, and unique.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold mb-3 text-white">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-3 text-white">Contact Us</h5>
          <p className="text-sm text-gray-300">Email: support@fashionstore.com</p>
          <p className="text-sm text-gray-300">Phone: +1 (555) 123-4567</p>
          <div className="flex space-x-4 mt-4 text-sm">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm mt-10 text-gray-400">
        &copy; {new Date().getFullYear()} FashionStore. All Rights Reserved.
      </div>
    </footer>
  );
}
