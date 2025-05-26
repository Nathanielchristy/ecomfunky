import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-gray-900 transition">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
