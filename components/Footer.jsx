'use client';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Branding */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <div
                        className="flex items-center cursor-pointer flex-shrink-0"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <h2 className="text-2xl font-bold text-white">
                            MedSpace
                        </h2>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                        MedSpace is a college project developed to demonstrate
                        medical space discovery, booking, and management using
                        modern web technologies.
                    </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 md:gap-10 w-full max-w-2xl lg:max-w-4xl justify-between">

                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-300 text-xs uppercase tracking-widest">
                            Platform
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-400 font-semibold">
                            <li>
                                <button
                                    onClick={() => router.push('/search-spaces')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    Search Spaces
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => router.push('/list-your-space')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    List Your Space
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-300 text-xs uppercase tracking-widest">
                            Quick Links
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-400 font-semibold">
                            <li>
                                <button
                                    onClick={() => router.push('/pricing')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    Pricing
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => router.push('/learn')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    Learn
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-300 text-xs uppercase tracking-widest whitespace-nowrap">
                            Connect and Support
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-400 font-semibold">
                            <li>
                                <button
                                    onClick={() => router.push('/faqs')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    Help Center & FAQs
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => router.push('/contact')}
                                    className="hover:text-teal-500 transition-colors text-left"
                                >
                                    Contact Support
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
                <p>
                    © {new Date().getFullYear()} MedSpace. Created for Sem-5 Mini Project.
                </p>

                <p>
                    Built with Next.js & Tailwind CSS
                </p>
            </div>
        </footer>
    );
}