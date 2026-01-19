import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn(
            "bg-espresso-900/50 backdrop-blur-sm border border-espresso-700/50 rounded-sm overflow-hidden",
            className
        )}>
            {children}
        </div>
    );
}
