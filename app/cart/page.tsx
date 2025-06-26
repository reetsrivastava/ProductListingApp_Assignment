'use client'
import Cart from '../../components/Cart';
import { useCart } from '../../hooks/useCart';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
  };

  const handleRemove = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  return (
    <Cart
      items={cart.items}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  );
}
