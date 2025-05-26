import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white px-6 py-4 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold tracking-wide">Fashion Store</span>
        </Link>

        <Link href="/cart" className="relative flex items-center gap-2 hover:underline">
          <ShoppingCart className="h-6 w-6" />
          <span className="text-lg">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2 py-0.5">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
