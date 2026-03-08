'use client';

import { useState, useEffect } from 'react';
import { Clock, Leaf, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    onRescue: (product: Product) => void;
}

function getTimeRemaining(expiryDate: string) {
    const total = new Date(expiryDate).getTime() - Date.now();
    if (total <= 0) return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { total, hours, minutes, seconds };
}

function getUrgencyLevel(expiryDate: string) {
    const hoursLeft = (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursLeft <= 2) return 'critical';
    if (hoursLeft <= 6) return 'warning';
    return 'normal';
}

export default function ProductCard({ product, onRescue }: ProductCardProps) {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(product.expiry_date));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(getTimeRemaining(product.expiry_date));
        }, 1000);
        return () => clearInterval(timer);
    }, [product.expiry_date]);

    const discountPercent = Math.round(
        ((product.original_price - product.discount_price) / product.original_price) * 100
    );

    const urgency = getUrgencyLevel(product.expiry_date);
    const isExpired = timeRemaining.total <= 0;
    const isOutOfStock = product.stock_quantity <= 0;

    const urgencyColors = {
        critical: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
        warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
        normal: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800',
    };

    return (
        <div className="animate-fade-in group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-green-200" />
                    </div>
                )}

                {/* Discount badge */}
                <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-red-500/30">
                    {discountPercent}% OFF
                </div>

                {/* Eco badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur-sm dark:bg-black/70 dark:text-green-400">
                    <Leaf className="h-3 w-3" />
                    Saved {product.co2_saved}kg CO₂
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-4">
                {/* Store name */}
                {product.stores && (
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                        {product.stores.name}
                    </span>
                )}

                {/* Title */}
                <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">
                        Rp{product.discount_price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                        Rp{product.original_price.toLocaleString('id-ID')}
                    </span>
                </div>

                {/* Urgency Timer */}
                <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${urgencyColors[urgency]} ${urgency === 'critical' ? 'animate-urgency' : ''}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {isExpired ? (
                        <span>Expired</span>
                    ) : (
                        <span>
                            Expires in {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                        </span>
                    )}
                </div>

                {/* Stock */}
                <div className="flex items-center justify-between text-xs text-muted">
                    <span>{product.stock_quantity} left</span>
                </div>

                {/* Rescue Button */}
                <button
                    onClick={() => onRescue(product)}
                    disabled={isExpired || isOutOfStock}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                    <ShoppingBag className="h-4 w-4" />
                    {isExpired ? 'Expired' : isOutOfStock ? 'Sold Out' : 'Rescue Now'}
                </button>
            </div>
        </div>
    );
}
