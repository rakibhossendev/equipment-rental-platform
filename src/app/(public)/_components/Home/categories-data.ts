// ------------------------------------------------------------
// Category configuration for the homepage Categories section.
// `value` matches the equipment filter value used by the
// All Equipment page (?category=...), so every card links to a
// real, working filtered view.
// ------------------------------------------------------------
import type { LucideIcon } from "lucide-react";
import {
    HardHat,
    Camera,
    CarFront,
    Sprout,
    Cpu,
    PartyPopper,
} from "lucide-react";

export type CategoryConfig = {
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
};

export const homeCategories: CategoryConfig[] = [
    {
        label: "Construction Equipment",
        value: "Construction",
        description: "Heavy machinery & site tools",
        icon: HardHat,
    },
    {
        label: "Photography Equipment",
        value: "Photography",
        description: "Cameras, lenses & lighting",
        icon: Camera,
    },
    {
        label: "Vehicles & Transportation",
        value: "Vehicles",
        description: "Cars, vans & transport gear",
        icon: CarFront,
    },
    {
        label: "Agriculture Equipment",
        value: "Agriculture",
        description: "Farming & field machinery",
        icon: Sprout,
    },
    {
        label: "Electronics",
        value: "Electronics",
        description: "Devices & gadgets on rent",
        icon: Cpu,
    },
    {
        label: "Event Equipment",
        value: "Event",
        description: "Stages, sound & decoration",
        icon: PartyPopper,
    },
];
