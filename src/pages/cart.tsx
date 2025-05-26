import { useCart } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded shadow">
            <p className="text-gray-700 text-lg mb-4">Your cart is empty.</p>
            <Link href="/" className="inline-block text-white bg-black px-6 py-3 rounded hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start flex-col md:flex-row md:items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 text-sm hover:underline mt-2 md:mt-0"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-700">
                        Quantity:
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-20 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total + Actions */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xl font-bold text-gray-900">
                Total: ${total.toFixed(2)}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded transition"
                >
                  Clear Cart
                </button>
                <button
                  className="bg-black text-white hover:bg-gray-800 px-5 py-2 rounded transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
