
"use client";

import { useTheme } from "next-themes";
import {
  Toaster as Sonner,
  type ToasterProps,
} from "sonner";

import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      offset="24px"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-brand" />,
      }}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: [
            "!rounded-2xl",
            "!border",
            "!border-white/20",
            "!bg-background/75",
            "!text-foreground",
            "!shadow-2xl",
            "!backdrop-blur-2xl",
            "!backdrop-saturate-150",
            "!px-4",
            "!py-3.5",
            "!gap-3",
            "dark:!border-white/10",
            "dark:!bg-zinc-900/75",
          ].join(" "),

          title: "!text-sm !font-semibold !text-foreground",

          description: "!text-xs !leading-relaxed !text-muted-foreground",

          actionButton:
            "!rounded-lg !bg-brand !text-brand-foreground !font-medium",

          cancelButton:
            "!rounded-lg !bg-secondary !text-secondary-foreground",

          closeButton: [
            "!rounded-full",
            "!border-border/50",
            "!bg-background/60",
            "!text-muted-foreground",
            "hover:!bg-secondary",
            "!transition-colors",
          ].join(" "),
        },
      }}
      closeButton
      richColors={false}
      expand={false}
      visibleToasts={4}
      duration={4000}
      swipeDirections={["right", "top"]}
      {...props}
    />
  );
};

export { Toaster };
