'use client'
import { useEffect, useState } from 'react';
import type { Product } from './useFetchList';

interface UseFetchDetailResult {
  data: Product | null;
  loading: boolean;
  error: string | null;
}

export function useFetchDetail(id: number | string): UseFetchDetailResult {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json: Product) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error };
}
