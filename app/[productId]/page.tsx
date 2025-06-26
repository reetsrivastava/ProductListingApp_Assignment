'use client'
import React from 'react';
import ProductDetails from '../../components/ProductDetails';
import Error from '../../components/Error';
import { useFetchDetail } from '../../hooks/useFetchDetail';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: { productId: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = params;
  const { data, loading, error } = useFetchDetail(productId);

  if (loading) {
    return <div className="flex justify-center items-center py-20 text-lg">Loading product...</div>;
  }

  if (error || !data) {
    return <Error message={error || 'Product not found.'} />;
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition">
        &larr; Back to Homepage
      </Link>
      <ProductDetails data={data} />
    </div>
  );
}
