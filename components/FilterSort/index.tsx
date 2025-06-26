'use client'
import React, { useState, useMemo } from 'react';
import type { Product } from '../../hooks/useFetchList';

interface FilterSortProps {
  data: Product[];
  onChange: (filteredSorted: Product[]) => void;
}

const getUniqueCategories = (products: Product[]) => {
  return Array.from(new Set(products.map((p) => p.category)));
};

const FilterSort: React.FC<FilterSortProps> = ({ data, onChange }) => {
  const categories = useMemo(() => getUniqueCategories(data), [data]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sortBy, setSortBy] = useState<'price' | 'popularity' | 'name'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Calculate min/max price for slider
  const minPrice = useMemo(() => Math.min(...data.map((p) => p.price)), [data]);
  const maxPrice = useMemo(() => Math.max(...data.map((p) => p.price)), [data]);

  // Initialize price range on mount/data change
  React.useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Filtering and sorting logic
  const filteredSorted = useMemo(() => {
    let filtered = data;
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'popularity') {
        const aRating = a.rating?.rate ?? 0;
        const bRating = b.rating?.rate ?? 0;
        return sortOrder === 'asc' ? aRating - bRating : bRating - aRating;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    return sorted;
  }, [data, selectedCategory, priceRange, sortBy, sortOrder]);

  // Notify parent on filter/sort change
  React.useEffect(() => {
    onChange(filteredSorted);
  }, [filteredSorted, onChange]);

  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0">
      <h2 className="text-xl font-bold mb-4">Filter & Sort</h2>
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price Range</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
            min={minPrice}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <span>-</span>
          <input
            type="number"
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
            min={priceRange[0]}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
      </div>
      {/* Sort Options */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Sort By</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'popularity' | 'name')}
        >
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
          <option value="name">Name</option>
        </select>
        <div className="flex space-x-2">
          <button
            className={`flex-1 px-3 py-1 rounded ${sortOrder === 'asc' ? 'bg-[#B8E986] bg-opacity-80 text-gray-800' : 'bg-gray-200 text-gray-700'} cursor-pointer`}
            onClick={() => setSortOrder('asc')}
          >
            Asc
          </button>
          <button
            className={`flex-1 px-3 py-1 rounded ${sortOrder === 'desc' ? 'bg-[#B8E986] bg-opacity-80 text-gray-800' : 'bg-gray-200 text-gray-700'} cursor-pointer`}
            onClick={() => setSortOrder('desc')}
          >
            Desc
          </button>
        </div>
      </div>
      {/* Clear All Filters Button */}
      <button
        className="w-full mt-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium cursor-pointer"
        onClick={() => {
          setSelectedCategory('');
          setPriceRange([minPrice, maxPrice]);
          setSortBy('price');
          setSortOrder('asc');
        }}
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterSort;
