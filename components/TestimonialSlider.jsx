'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const testimonials = [
    {
        quote: "MedSpace provides a clean and user-friendly interface for exploring and managing medical spaces. The project demonstrates modern web development practices with an intuitive design.",
        name: "Demo User",
        title: "Project Reviewer"
    },
    {
        quote: "The application makes it simple to browse available medical spaces, manage listings, and understand the overall workflow. It serves as an excellent academic demonstration project.",
        name: "College Evaluator",
        title: "Faculty Reviewer"
    },
    {
        quote: "The MedSpace project showcases full-stack development using Next.js, Prisma, MongoDB, and Tailwind CSS. It is well organized and demonstrates practical software engineering concepts.",
        name: "Academic Mentor",
        title: "Project Guide"
    }
];
export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Auto-slide every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };
    return (<section className="py-20 bg-slate-100/60 overflow-hidden relative border-y border-slate-200/50">
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-10">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-3">
    Project Feedback
</p>

<h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight">
    Demo Reviews
</h2>
        </div>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-center px-8 sm:px-12 w-full absolute">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                {testimonials[currentIndex].quote}
              </p>
              <div className="mt-8">
                <p className="text-sm font-bold text-slate-800">{testimonials[currentIndex].name}</p>
                {testimonials[currentIndex].title && (<p className="text-xs font-semibold text-teal-600 mt-1">{testimonials[currentIndex].title}</p>)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-600 transition-colors z-10" aria-label="Previous testimonial">
            <ChevronLeft className="w-8 h-8" strokeWidth={1.5}/>
          </button>
          
          <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-600 transition-colors z-10" aria-label="Next testimonial">
            <ChevronRight className="w-8 h-8" strokeWidth={1.5}/>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-slate-800 w-3' : 'bg-slate-300'}`} aria-label={`Go to slide ${idx + 1}`}/>))}
        </div>
      </div>
    </section>);
}
