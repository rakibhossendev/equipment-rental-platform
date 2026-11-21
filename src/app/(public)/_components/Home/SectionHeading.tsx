interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
}

/**
 * Shared heading block for all homepage sections so every
 * section keeps the same look and spacing.
 */
export default function SectionHeading({
    eyebrow,
    title,
    description,
}: SectionHeadingProps) {
    return (
        <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                {eyebrow}
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
            </h2>

            {description && (
                <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}
