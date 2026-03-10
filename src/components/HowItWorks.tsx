import { Search, Wallet, Store, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: Search,
        step: '01',
        title: 'Pilih Makanan',
        description:
            'Temukan surplus makanan berkualitas dari toko-toko favoritmu di sekitar lokasi dengan cepat dan mudah.',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        icon: Wallet,
        step: '02',
        title: 'Pesan & Bayar',
        description:
            'Amankan porsimu dengan harga yang jauh lebih hemat.',
        className: 'md:col-span-1',
    },
    {
        icon: Store,
        step: '03',
        title: 'Ambil di Lokasi',
        description:
            'Kunjungi toko pada waktu yang ditentukan untuk pickup.',
        className: 'md:col-span-1',
    },
];

export default function HowItWorks() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-16 text-center text-gray-900">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md mb-6 shadow-sm">
                    Cara Kerja
                </span>
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl max-w-3xl mx-auto">
                    Menyelamatkan Makanan Jadi Lebih Mudah
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 leading-relaxed font-medium">
                    Tiga langkah sederhana untuk mendapatkan makanan berkualitas dengan harga hemat
                    sekaligus berkontribusi dalam mengurangi limbah pangan.
                </p>
            </div>

            {/* Bento Grid layout with Glassmorphism */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
                {steps.map(({ icon: Icon, step, title, description, className }, index) => (
                    <div
                        key={step}
                        className={`group relative overflow-hidden flex flex-col justify-between rounded-3xl bg-white/70 border border-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:border-sage-dark/30 ${className}`}
                    >
                        {/* Decorative background gradient */}
                        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                        <div className="relative z-10">
                            {/* Step number badge */}
                            <div className="mb-8 inline-flex items-center justify-center rounded-xl bg-sage-light border border-sage-dark/20 px-3 py-1.5 text-sm font-extrabold text-primary shadow-sm bg-white/80 backdrop-blur-md">
                                Layar {step}
                            </div>

                            <h3 className="mb-3 font-display text-2xl font-bold text-gray-900 tracking-tight">{title}</h3>
                            <p className="text-gray-500 leading-relaxed max-w-sm font-medium">{description}</p>
                        </div>

                        {/* Icon & Interaction hint */}
                        <div className="relative z-10 mt-10 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/50 text-primary">
                                <Icon className="h-6 w-6" strokeWidth={2} />
                            </div>
                            {index === 0 && (
                                <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-2">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
