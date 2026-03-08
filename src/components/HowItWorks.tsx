import { Search, Wallet, Store } from 'lucide-react';

const steps = [
    {
        icon: Search,
        step: '01',
        title: 'Pilih Makanan',
        description:
            'Temukan surplus makanan berkualitas dari toko-toko favoritmu di sekitar lokasi.',
    },
    {
        icon: Wallet,
        step: '02',
        title: 'Pesan & Bayar',
        description:
            'Amankan porsimu dengan harga yang jauh lebih murah sebelum kehabisan.',
    },
    {
        icon: Store,
        step: '03',
        title: 'Ambil di Lokasi',
        description:
            'Kunjungi toko pada waktu yang ditentukan dan ambil pesananmu dengan mudah.',
    },
];

export default function HowItWorks() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-14 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
                    Cara Kerja
                </span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Langkah Mudah Menyelamatkan Makanan
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 leading-relaxed">
                    Tiga langkah sederhana untuk mendapatkan makanan berkualitas dengan harga lebih hemat
                    sekaligus membantu kurangi food waste.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
                {/* Connector Line (desktop only) */}
                <div
                    className="pointer-events-none absolute top-[2.6rem] left-1/6 right-1/6 hidden h-px sm:block"
                    style={{
                        background:
                            'linear-gradient(to right, transparent, #22c55e40 20%, #22c55e40 80%, transparent)',
                    }}
                />

                {steps.map(({ icon: Icon, step, title, description }) => (
                    <div
                        key={step}
                        className="group relative flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 px-8 py-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-100"
                    >
                        {/* Step number badge */}
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-green-500 border border-green-100">
                            {step}
                        </span>

                        {/* Icon */}
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-1 ring-green-100 transition-colors duration-300 group-hover:bg-green-100">
                            <Icon className="h-7 w-7 text-green-500" strokeWidth={1.75} />
                        </div>

                        <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
