import React from 'react';
import type { Product } from '../../hooks/useFetchList';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import Link from 'next/link';

interface ProductListProps {
  data: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  const { cart, dispatch } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => {
        const cartItem = cart.items.find((item) => item.product.id === product.id);
        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow hover:shadow-xl group"
          >
            <Link
              href={`/${product.id}`}
              className="flex-1 flex flex-col cursor-pointer"
              tabIndex={-1}
              aria-label={`View details for ${product.title}`}
            >
              <div className="h-48 w-full bg-gray-100 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={192}
                  className="object-contain h-full w-full"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                  priority={false}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{product.title}</h2>
                <p className="text-gray-500 text-sm mb-1">{product.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">${product.price}</span>
                  {product.rating && (
                    <span className="text-yellow-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                      {product.rating.rate}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            {/* Cart Controls */}
            <div className="p-4 pt-0">
              {!cartItem ? (
                <button
                  className="w-full bg-[#B8E986] bg-opacity-80 text-gray-800 py-2 rounded hover:bg-opacity-100 transition cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 text-lg cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: product.id, quantity: cartItem.quantity - 1 } });
                    }}
                    disabled={cartItem.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-gray-200 bg-white text-lg">{cartItem.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 text-lg cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: product.id, quantity: cartItem.quantity + 1 } });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 bg-opacity-80 text-white rounded hover:bg-opacity-100 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: product.id } });
                    }}
                    aria-label="Remove from cart"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;