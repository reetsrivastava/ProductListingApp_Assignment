import { useContext } from 'react';
import { CartStateContext, CartDispatchContext } from '../context/CartContext';

export function useCart() {
  const state = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return { cart: state, dispatch };
} 