'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import ReservationModal from './ReservationModal';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
    selectedStoreId: string | null;
}

export default function ProductGrid({ selectedStoreId }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [selectedStoreId]);

    async function fetchProducts() {
        setLoading(true);
        try {
            let query = supabase
                .from('products')
                .select('*, stores(name, address)')
                .gt('stock_quantity', 0)
                .order('expiry_date', { ascending: true });

            if (selectedStoreId) {
                query = query.eq('store_id', selectedStoreId);
            }

            const { data, error } = await query;
            if (error) throw error;
            setProducts(data || []);
        } catch (err: any) {
            console.error('Error fetching products:', err?.message || err?.code || JSON.stringify(err));
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    function handleRescue(product: Product) {
        setSelectedProduct(product);
    }

    function handleCloseModal() {
        setSelectedProduct(null);
        fetchProducts(); // re-fetch to update stock
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[420px] animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
                    />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 dark:border-gray-700">
                <PackageOpen className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                <h3 className="mb-2 text-lg font-semibold text-gray-500 dark:text-gray-400">
                    No food available
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    {selectedStoreId
                        ? 'This store has no surplus food right now. Try another store!'
                        : 'Check back soon for surplus food deals from local stores.'}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onRescue={handleRescue}
                    />
                ))}
            </div>

            {selectedProduct && (
                <ReservationModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSuccess={fetchProducts}
                />
            )}
        </>
    );
}
