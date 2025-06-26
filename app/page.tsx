'use client'
import ProductList from '../components/ProductList';
import Error from '../components/Error';
import FilterSort from '../components/FilterSort';
import Pagination from '../components/Pagination';
import { useFetchList } from '../hooks/useFetchList';
import { useState } from 'react';
import type { Product } from '../hooks/useFetchList';

export default function Home() {
  const { data, loading, error } = useFetchList();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

  if (loading) {
    return <div className="flex justify-center items-center py-20 text-lg">Loading products...</div>;
  }

  if (error || !data || data.length === 0) {
    return <Error message={error || 'No products found.'} />;
  }

  const productsToShow = filteredProducts.length ? filteredProducts : data;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      {/* Fixed Products + Pagination Bar */}
      <div className="fixed top-16 left-0 w-full max-w-7xl mx-auto z-30 bg-white bg-opacity-95 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-1"
        style={{ right: 0, minHeight: '48px' }}>
        <h1 className="text-base sm:text-lg md:text-2xl font-bold whitespace-nowrap">Products</h1>
        <div className="flex-1 flex justify-end">
          <Pagination<Product>
            data={productsToShow}
            pageSizeOptions={[5, 10, 20, 50]}
            defaultPageSize={10}
            onPageChange={setPaginatedProducts}
            selectClassName="border border-gray-300 rounded px-2 py-1 cursor-pointer bg-white bg-opacity-70 backdrop-blur text-xs sm:text-sm md:text-base"
            
          />
        </div>
      </div>
      {/* Spacer for fixed bar */}
      <div className="h-[60px] sm:h-[56px] md:h-[52px]" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 w-full">
          <FilterSort data={data} onChange={setFilteredProducts} />
        </div>
        <div className="flex-1">
          <ProductList data={paginatedProducts.length ? paginatedProducts : productsToShow} />
        </div>
      </div>
    </div>
  );
}
