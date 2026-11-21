// ============================================================
// ⚠️ DEMO DATA — NOT real customer testimonials.
//
// These are placeholder reviews used only to demonstrate the
// Customer Reviews UI. They must not be presented as verified
// customer feedback. When a real reviews API exists, replace
// `demoReviews` with data fetched from that API.
// ============================================================
import type { CustomerReview } from "../../../../../typescript/main";

export const demoReviews: CustomerReview[] = [
    {
        name: "Rakib Hasan",
        initials: "RH",
        rating: 5,
        comment:
            "Booked an excavator for a two-week site job. The listing was accurate, the owner answered quickly, and the whole process took only a few minutes.",
    },
    {
        name: "Nusrat Jahan",
        initials: "NJ",
        rating: 4,
        comment:
            "Rented camera gear for a weekend shoot. Pricing was fair compared to local shops and the pickup went smoothly. Would happily rent again.",
    },
    {
        name: "Tanvir Ahmed",
        initials: "TA",
        rating: 5,
        comment:
            "Needed a delivery van for a single day. Payment through Stripe felt secure and the booking dates were exactly as confirmed. Very convenient.",
    },
    {
        name: "Sadia Karim",
        initials: "SK",
        rating: 4,
        comment:
            "Great platform for finding agriculture equipment nearby. The availability info saved me from calling around — everything was clearly listed.",
    },
];
