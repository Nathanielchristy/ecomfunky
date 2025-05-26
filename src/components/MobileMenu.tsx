import Link from 'next/link';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <nav className="md:hidden bg-white shadow-inner">
      <div className="px-6 py-4 space-y-4">
        <Link href="/" className="block text-gray-700 hover:text-gray-900 transition" onClick={onClose}>
          Home
        </Link>
        <Link href="/shop" className="block text-gray-700 hover:text-gray-900 transition" onClick={onClose}>
          Shop
        </Link>
        <Link href="/about" className="block text-gray-700 hover:text-gray-900 transition" onClick={onClose}>
          About
        </Link>
        <Link href="/contact" className="block text-gray-700 hover:text-gray-900 transition" onClick={onClose}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
