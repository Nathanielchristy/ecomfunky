import { useCart } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-700">Your cart is empty.</p>
          <Link href="/">
            <span className="text-blue-600 hover:underline">Go back to shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>${item.price} each</p>
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`}>Qty:</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
