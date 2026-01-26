import React, { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
    x: number;
    y: number;
    size: number;
    id: number;
}

export const RippleEffect: React.FC<{ parentRef: React.RefObject<HTMLElement>; color?: string }> = ({ parentRef, color = "rgba(255, 255, 255, 0.3)" }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useLayoutEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        const handleClick = (e: MouseEvent | TouchEvent) => {
            const rect = parent.getBoundingClientRect();
            const clientX = 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX;
            const clientY = 'clientY' in e ? e.clientY : (e as TouchEvent).touches[0].clientY;

            const size = Math.max(rect.width, rect.height) * 2;
            const x = clientX - rect.left - size / 2;
            const y = clientY - rect.top - size / 2;

            const newRipple = { x, y, size, id: Date.now() };
            setRipples((prev) => [...prev, newRipple]);
        };

        parent.addEventListener("mousedown", handleClick as any);
        parent.addEventListener("touchstart", handleClick as any);

        return () => {
            parent.removeEventListener("mousedown", handleClick as any);
            parent.removeEventListener("touchstart", handleClick as any);
        };
    }, [parentRef]);

    const removeRipple = (id: number) => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onAnimationComplete={() => removeRipple(ripple.id)}
                        style={{
                            position: "absolute",
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                            borderRadius: "50%",
                            backgroundColor: color,
                            pointerEvents: "none",
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Alternative Higher-Order Component for easier usage
export const withRipple = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const [ripples, setRipples] = useState<Ripple[]>([]);

        const createRipple = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
            const container = event.currentTarget;
            const rect = container.getBoundingClientRect();

            const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
            const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;

            const size = Math.max(rect.width, rect.height);
            const x = clientX - rect.left - size / 2;
            const y = clientY - rect.top - size / 2;

            const newRipple = { x, y, size, id: Date.now() };
            setRipples((prev) => [...prev, newRipple]);
        };

        const removeRipple = (id: number) => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        };

        return (
            <div
                className="relative overflow-hidden inline-block w-full h-full rounded-[inherit]"
                onMouseDown={createRipple}
                onTouchStart={createRipple}
            >
                <Component {...props} />
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            onAnimationComplete={() => removeRipple(ripple.id)}
                            style={{
                                position: "absolute",
                                left: ripple.x,
                                top: ripple.y,
                                width: ripple.size,
                                height: ripple.size,
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                pointerEvents: "none",
                                zIndex: 50
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        );
    };
};
