import Link from 'next/link';

export default function NavLinks() {
  return (
    <>
      <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
        Home
      </Link>
      <Link href="/#categories" className="text-gray-700 hover:text-gray-900 transition">
        Shop
      </Link>
      <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
        About
      </Link>
      <Link href="/#contact" className="text-gray-700 hover:text-gray-900 transition">
        Contact
      </Link>
    </>
  );
}
