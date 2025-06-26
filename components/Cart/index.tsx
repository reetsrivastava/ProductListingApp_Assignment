import React from 'react';
import type { Product } from '../../hooks/useFetchList';
import Image from 'next/image';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onQuantityChange?: (productId: number, newQuantity: number) => void;
  onRemove?: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onQuantityChange, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center border-b pb-4 gap-4">
              <Image
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                className="object-contain bg-gray-100 rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 font-bold text-lg mr-4">${product.price}</span>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 cursor-pointer"
                      onClick={() => onQuantityChange && onQuantityChange(product.id, Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-t border-b border-gray-200 bg-white">{quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 cursor-pointer"
                      onClick={() => onQuantityChange && onQuantityChange(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  {onRemove && (
                    <button
                      className="ml-4 text-red-500 hover:underline text-sm cursor-pointer"
                      onClick={() => onRemove(product.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="font-semibold text-lg">${(product.price * quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
