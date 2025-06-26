import React from 'react';
import type { Product } from '../../hooks/useFetchList';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';

interface ProductDetailsProps {
  data: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ data }) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.items.find((item) => item.product.id === data.id);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <Image
          src={data.image}
          alt={data.title}
          width={320}
          height={320}
          className="object-contain h-64 w-64"
          priority={true}
        />
      </div>
      <div className="md:w-1/2 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-500 text-sm mb-2">{data.category}</p>
        <span className="text-2xl font-bold text-green-600 mb-4">${data.price}</span>
        <p className="text-gray-700 mb-4">{data.description}</p>
        {data.rating && (
          <div className="flex items-center mt-auto mb-4">
            <span className="text-yellow-500 text-lg flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              {data.rating.rate} <span className="ml-2 text-gray-600 text-base">({data.rating.count} reviews)</span>
            </span>
          </div>
        )}
        {/* Cart Controls */}
        <div className="mt-2">
          {!cartItem ? (
            <button
              className="w-full bg-[#B8E986] bg-opacity-80 text-gray-800 py-2 rounded hover:bg-opacity-100 transition cursor-pointer"
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: data, quantity: 1 } })}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 text-lg cursor-pointer"
                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: data.id, quantity: cartItem.quantity - 1 } })}
                disabled={cartItem.quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-200 bg-white text-lg">{cartItem.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 text-lg cursor-pointer"
                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: data.id, quantity: cartItem.quantity + 1 } })}
              >
                +
              </button>
              <button
                className="ml-2 px-3 py-1 bg-red-500 bg-opacity-80 text-white rounded hover:bg-opacity-100 text-sm cursor-pointer"
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: data.id } })}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;