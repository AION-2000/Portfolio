"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the type for a single review
export type Review = {
    id: string | number;
    name: string;
    affiliation: string;
    quote: string;
    imageSrc: string;
    thumbnailSrc: string;
};

// Define the props for the slider component
interface TestimonialSliderProps {
    reviews: Review[];
    /** Optional class name for the container */
    className?: string;
}

/**
 * A reusable, animated testimonial slider component.
 * It uses framer-motion for animations and is styled with
 * shadcn/ui theme variables.
 */
export const TestimonialSlider = ({
    reviews,
    className,
}: TestimonialSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // 'direction' helps framer-motion understand slide direction (next vs. prev)
    const [direction, setDirection] = useState<"left" | "right">("right");

    const activeReview = reviews[currentIndex];

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleThumbnailClick = (index: number) => {
        // Determine direction for animation
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    // Get the next 3 reviews for the thumbnails, excluding the current one
    const thumbnailReviews = reviews
        .filter((_, i) => i !== currentIndex)
        .slice(0, 3);

    // Animation variants for the main image
    const imageVariants = {
        enter: (direction: "left" | "right") => ({
            y: direction === "right" ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { y: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            y: direction === "right" ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    // Animation variants for the text content
    const textVariants = {
        enter: (direction: "left" | "right") => ({
            x: direction === "right" ? 50 : -50,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: "left" | "right") => ({
            x: direction === "right" ? -50 : 50,
            opacity: 0,
        }),
    };

    return (
        <div
            className={cn(
                "relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background text-foreground p-0 md:p-4",
                className
            )}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                {/* === Left Column: Meta and Thumbnails === */}
                <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
                    <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
                        {/* Pagination */}
                        <span className="text-sm text-latte-500 font-mono">
                            {String(currentIndex + 1).padStart(2, "0")} /{" "}
                            {String(reviews.length).padStart(2, "0")}
                        </span>
                        {/* Vertical "Reviews" Text */}
                        <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block text-latte-500">
                            Reviews
                        </h2>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-2 mt-8 md:mt-0">
                        {thumbnailReviews.map((review) => {
                            // Find the original index to navigate to
                            const originalIndex = reviews.findIndex(
                                (r) => r.id === review.id
                            );
                            return (
                                <button
                                    key={review.id}
                                    onClick={() => handleThumbnailClick(originalIndex)}
                                    className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-espresso-950"
                                    aria-label={`View review from ${review.name}`}
                                >
                                    <img
                                        src={review.thumbnailSrc}
                                        alt={review.name}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* === Center Column: Main Image === */}
                <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={activeReview.imageSrc}
                            alt={activeReview.name}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 w-full h-full object-cover rounded-sm border border-espresso-700 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </AnimatePresence>
                </div>

                {/* === Right Column: Text and Navigation === */}
                <div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-3 md:order-3">
                    {/* Text Content */}
                    <div className="relative overflow-hidden pt-4 md:pt-24 min-h-[200px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <p className="text-sm font-mono text-accent-blue uppercase tracking-widest">
                                    {activeReview.affiliation}
                                </p>
                                <h3 className="text-xl md:text-2xl font-mono font-bold mt-1 text-latte-100">
                                    {activeReview.name}
                                </h3>
                                <blockquote className="mt-6 text-xl md:text-2xl font-mono leading-relaxed text-latte-200 border-l border-espresso-700 pl-4 py-2 italic font-medium">
                                    "{activeReview.quote}"
                                </blockquote>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center space-x-4 mt-8 md:mt-0">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-12 h-12 border-espresso-700 bg-espresso-900 text-latte-500 hover:text-accent-orange hover:border-accent-orange transition-all"
                            onClick={handlePrev}
                            aria-label="Previous review"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="default"
                            size="icon"
                            className="rounded-full w-12 h-12 bg-accent-orange text-espresso-950 hover:bg-accent-orange/80 transition-all font-bold"
                            onClick={handleNext}
                            aria-label="Next review"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
