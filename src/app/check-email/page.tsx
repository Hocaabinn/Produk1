'use client';

import Link from 'next/link';
import { Mail, ArrowRight, Leaf } from 'lucide-react';

export default function CheckEmailPage() {
    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
            {/* Background decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-green-500/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Icon */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-green-500/20">
                        <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Check your email
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                        We&apos;ve sent a verification link to your email address.
                        Click the link to activate your account.
                    </p>
                </div>

                {/* Info card */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-card-dark dark:shadow-none">
                    <div className="flex flex-col gap-4 p-6">
                        {/* Steps */}
                        <div className="flex flex-col gap-3">
                            {[
                                { step: '1', text: 'Open your email inbox' },
                                { step: '2', text: 'Click the verification link from PlateRescue' },
                                { step: '3', text: 'You\'ll be redirected back — then log in!' },
                            ].map((item) => (
                                <div key={item.step} className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                        {item.step}
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Hint */}
                        <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                            <strong>Didn&apos;t receive the email?</strong> Check your spam folder. If it&apos;s still not there, try registering again.
                        </div>

                        {/* CTA */}
                        <Link
                            href="/login"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-xl hover:shadow-green-500/30 hover:brightness-110 active:scale-[0.98]"
                        >
                            Go to Login
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/30">
                        <Leaf className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted">
                            PlateRescue — Rescue food, reduce waste
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
