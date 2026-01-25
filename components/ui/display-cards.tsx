"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    icon,
    title,
    description,
    date,
    iconClassName,
    titleClassName,
}: DisplayCardProps) {
    return (
        <div
            className={cn(
                "relative flex h-36 w-[22rem] flex-col justify-between overflow-hidden rounded-xl border border-border bg-background p-4",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <div className={cn("flex size-7 items-center justify-center rounded-full bg-muted", iconClassName)}>
                    {icon}
                </div>
                <div className={cn("text-sm font-medium", titleClassName)}>{title}</div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">{description}</div>
                <div className="text-[10px] text-muted-foreground/50">{date}</div>
            </div>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center">
            {cards?.map((card, index) => (
                <DisplayCard key={index} {...card} />
            ))}
        </div>
    );
}
