// Product Database
const productsData = [
    {
        id: 1,
        name: "Hydrating Hyaluronic Serum",
        slug: "hydrating-hyaluronic-serum",
        category: "serums",
        price: 48.00,
        salePrice: null,
        rating: 4.8,
        reviewCount: 342,
        description: "Ultra-hydrating serum with three molecular weights of hyaluronic acid for deep, lasting moisture. Plumps fine lines and restores skin's natural bounce.",
        shortDescription: "Triple hyaluronic acid formula for intense hydration",
        ingredients: [
            "Hyaluronic Acid (3 molecular weights)",
            "Vitamin B5 (Panthenol)",
            "Glycerin",
            "Sodium PCA",
            "Allantoin",
            "Cucumber Extract",
            "Green Tea Extract"
        ],
        benefits: [
            "Provides up to 72-hour hydration",
            "Reduces appearance of fine lines",
            "Plumps and smooths skin texture",
            "Suitable for all skin types",
            "Non-comedogenic"
        ],
        howToUse: "Apply 2-3 drops to clean, damp skin morning and evening. Gently pat into face and neck. Follow with moisturizer.",
        skinTypes: ["all", "dry", "combination", "normal"],
        concerns: ["dryness", "fine-lines", "dull-skin"],
        featured: true,
        bestseller: true,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800"
        ],
        variants: [
            { id: "1-30ml", size: "30ml", price: 48.00, inStock: true },
            { id: "1-50ml", size: "50ml", price: 72.00, inStock: true }
        ],
        model3d: {
            url: "models/serum-bottle.glb",
            fallbackImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
        },
        stock: 156,
        new: false
    },
    {
        id: 2,
        name: "Vitamin C Brightening Cream",
        slug: "vitamin-c-brightening-cream",
        category: "moisturizers",
        price: 65.00,
        salePrice: 52.00,
        rating: 4.9,
        reviewCount: 428,
        description: "Luxurious brightening cream infused with 15% stabilized vitamin C, niacinamide, and kojic acid. Targets dark spots, evens skin tone, and reveals radiant luminosity.",
        shortDescription: "15% Vitamin C formula for radiant, even-toned skin",
        ingredients: [
            "L-Ascorbic Acid (Vitamin C) 15%",
            "Niacinamide 5%",
            "Kojic Acid",
            "Alpha Arbutin",
            "Ferulic Acid",
            "Vitamin E",
            "Shea Butter",
            "Squalane"
        ],
        benefits: [
            "Brightens and evens skin tone",
            "Reduces dark spots and hyperpigmentation",
            "Boosts collagen production",
            "Protects against environmental damage",
            "Provides all-day hydration"
        ],
        howToUse: "Apply to clean skin in the morning. Gently massage into face and neck. Always follow with SPF during the day.",
        skinTypes: ["all", "normal", "combination", "dull"],
        concerns: ["dark-spots", "dull-skin", "uneven-tone", "aging"],
        featured: true,
        bestseller: true,
        image: "download.jpg",
        images: [
            "download.jpg",
            "download.jpg"
        ],
        variants: [
            { id: "2-50ml", size: "50ml", price: 65.00, salePrice: 52.00, inStock: true }
        ],
        model3d: {
            url: "models/cream-jar.glb",
            fallbackImage: "https://images.unsplash.com/photo-1556228852-80ba42dcf77a?w=800"
        },
        stock: 89,
        new: false
    },
    {
        id: 3,
        name: "Retinol Night Treatment",
        slug: "retinol-night-treatment",
        category: "treatments",
        price: 78.00,
        salePrice: null,
        rating: 4.7,
        reviewCount: 267,
        description: "Advanced retinol complex with 0.5% encapsulated retinol for powerful anti-aging benefits with minimal irritation. Reduces wrinkles, refines texture, and promotes cell turnover overnight.",
        shortDescription: "0.5% encapsulated retinol for age-defying results",
        ingredients: [
            "Encapsulated Retinol 0.5%",
            "Bakuchiol",
            "Peptide Complex",
            "Ceramides",
            "Niacinamide",
            "Bisabolol",
            "Jojoba Oil"
        ],
        benefits: [
            "Reduces fine lines and wrinkles",
            "Improves skin texture and tone",
            "Minimizes pore appearance",
            "Boosts collagen production",
            "Gentle, encapsulated formula"
        ],
        howToUse: "Use at night only. Apply a pea-sized amount to clean, dry skin. Start 2-3 times per week, gradually increase frequency. Always use SPF during the day.",
        skinTypes: ["normal", "combination", "mature"],
        concerns: ["aging", "fine-lines", "wrinkles", "texture"],
        featured: true,
        bestseller: false,
        image: "download%20(1).jpg",
        images: [
            "https://images.unsplash.com/photo-1620916297397-fd5872c88a18?w=800",
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800"
        ],
        variants: [
            { id: "3-30ml", size: "30ml", price: 78.00, inStock: true }
        ],
        model3d: {
            url: "models/treatment-bottle.glb",
            fallbackImage: "https://images.unsplash.com/photo-1620916297397-fd5872c88a18?w=800"
        },
        stock: 124,
        new: false
    },
    {
        id: 4,
        name: "Gentle Foaming Cleanser",
        slug: "gentle-foaming-cleanser",
        category: "cleansers",
        price: 32.00,
        salePrice: null,
        rating: 4.6,
        reviewCount: 512,
        description: "pH-balanced foaming cleanser that gently removes makeup, dirt, and impurities without stripping skin's natural moisture. Enriched with chamomile and aloe vera for a soothing cleanse.",
        shortDescription: "pH-balanced gentle cleanse for all skin types",
        ingredients: [
            "Gentle Sulfate-Free Surfactants",
            "Chamomile Extract",
            "Aloe Vera",
            "Green Tea Extract",
            "Glycerin",
            "Panthenol",
            "Allantoin"
        ],
        benefits: [
            "Removes makeup and impurities",
            "Maintains skin's pH balance",
            "Non-stripping formula",
            "Soothes and calms skin",
            "Suitable for sensitive skin"
        ],
        howToUse: "Wet face with lukewarm water. Dispense cleanser onto hands and create lather. Massage gently onto face for 60 seconds. Rinse thoroughly. Use morning and evening.",
        skinTypes: ["all", "sensitive", "dry", "combination", "normal"],
        concerns: ["sensitivity", "dryness"],
        featured: true,
        bestseller: true,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        images: [
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800"
        ],
        variants: [
            { id: "4-150ml", size: "150ml", price: 32.00, inStock: true },
            { id: "4-250ml", size: "250ml", price: 48.00, inStock: true }
        ],
        model3d: {
            url: "models/cleanser-bottle.glb",
            fallbackImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"
        },
        stock: 203,
        new: false
    },
    {
        id: 5,
        name: "SPF 50 Mineral Sunscreen",
        slug: "spf-50-mineral-sunscreen",
        category: "suncare",
        price: 42.00,
        salePrice: null,
        rating: 4.8,
        reviewCount: 391,
        description: "Broad-spectrum mineral sunscreen with zinc oxide and titanium dioxide. Lightweight, non-greasy formula that leaves no white cast. Reef-safe and perfect for daily wear.",
        shortDescription: "Broad-spectrum mineral SPF 50 protection",
        ingredients: [
            "Zinc Oxide 20%",
            "Titanium Dioxide 6%",
            "Niacinamide",
            "Vitamin E",
            "Green Tea Extract",
            "Squalane",
            "Hyaluronic Acid"
        ],
        benefits: [
            "Broad-spectrum UVA/UVB protection",
            "No white cast formula",
            "Reef-safe ingredients",
            "Lightweight, non-greasy",
            "Suitable for sensitive skin"
        ],
        howToUse: "Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating. Use as the final step in your morning routine.",
        skinTypes: ["all", "sensitive", "normal", "combination"],
        concerns: ["sun-damage", "aging", "sensitivity"],
        featured: true,
        bestseller: true,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800",
        images: [
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800",
            "https://images.unsplash.com/photo-1614098653028-44f50f1f35b5?w=800"
        ],
        variants: [
            { id: "5-50ml", size: "50ml", price: 42.00, inStock: true }
        ],
        model3d: {
            url: "models/sunscreen-tube.glb",
            fallbackImage: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800"
        },
        stock: 178,
        new: false
    },
    {
        id: 6,
        name: "Eye Repair Cream",
        slug: "eye-repair-cream",
        category: "treatments",
        price: 56.00,
        salePrice: null,
        rating: 4.7,
        reviewCount: 284,
        description: "Intensive eye cream with caffeine, peptides, and ceramides to target dark circles, puffiness, and fine lines. Rich yet fast-absorbing formula for the delicate eye area.",
        shortDescription: "Targets dark circles, puffiness, and crow's feet",
        ingredients: [
            "Caffeine 2%",
            "Peptide Complex",
            "Ceramides",
            "Niacinamide",
            "Vitamin K",
            "Arnica Extract",
            "Hyaluronic Acid"
        ],
        benefits: [
            "Reduces dark circles and puffiness",
            "Smooths fine lines and crow's feet",
            "Firms and brightens eye area",
            "Fast-absorbing, non-greasy",
            "Ophthalmologist tested"
        ],
        howToUse: "Gently pat a small amount around the orbital bone morning and evening. Use ring finger for gentle application. Avoid direct contact with eyes.",
        skinTypes: ["all", "mature", "normal"],
        concerns: ["dark-circles", "puffiness", "fine-lines", "aging"],
        featured: false,
        bestseller: false,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800",
        images: [
            "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800"
        ],
        variants: [
            { id: "6-15ml", size: "15ml", price: 56.00, inStock: true }
        ],
        model3d: {
            url: "models/eye-cream.glb",
            fallbackImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800"
        },
        stock: 142,
        new: false
    },
    {
        id: 7,
        name: "Exfoliating Toner",
        slug: "exfoliating-toner",
        category: "treatments",
        price: 38.00,
        salePrice: null,
        rating: 4.6,
        reviewCount: 356,
        description: "Gentle exfoliating toner with 5% glycolic acid and lactic acid to refine texture, minimize pores, and reveal brighter, smoother skin. Alcohol-free formula with soothing botanicals.",
        shortDescription: "5% AHA blend for smoother, brighter skin",
        ingredients: [
            "Glycolic Acid 5%",
            "Lactic Acid 2%",
            "Niacinamide",
            "Witch Hazel",
            "Aloe Vera",
            "Chamomile Extract",
            "Rose Water"
        ],
        benefits: [
            "Gently exfoliates dead skin cells",
            "Refines texture and minimizes pores",
            "Brightens and evens tone",
            "Prepares skin for better absorption",
            "Alcohol-free, non-drying"
        ],
        howToUse: "After cleansing, apply to face and neck with cotton pad or hands. Use in the evening 2-3 times per week, gradually increase as tolerated. Always follow with SPF during the day.",
        skinTypes: ["normal", "combination", "oily"],
        concerns: ["texture", "dull-skin", "large-pores", "uneven-tone"],
        featured: false,
        bestseller: false,
        image: "download%20(2).jpg",
        images: [
            "download%20(2).jpg"
        ],
        variants: [
            { id: "7-120ml", size: "120ml", price: 38.00, inStock: true }
        ],
        model3d: {
            url: "models/toner-bottle.glb",
            fallbackImage: "download%20(2).jpg"
        },
        stock: 167,
        new: true
    },
    {
        id: 8,
        name: "Moisturizing Face Mask",
        slug: "moisturizing-face-mask",
        category: "masks",
        price: 45.00,
        salePrice: null,
        rating: 4.9,
        reviewCount: 423,
        description: "Intensive hydrating mask with hyaluronic acid, ceramides, and honey extract. Instantly plumps and revitalizes dry, dehydrated skin. Perfect for weekly treatment or SOS hydration boost.",
        shortDescription: "Intensive hydration mask for instant plumping",
        ingredients: [
            "Hyaluronic Acid",
            "Ceramide Complex",
            "Honey Extract",
            "Glycerin",
            "Allantoin",
            "Panthenol",
            "Cucumber Extract"
        ],
        benefits: [
            "Provides instant hydration boost",
            "Plumps and softens skin",
            "Restores moisture barrier",
            "Soothes and calms",
            "Visible results in 10 minutes"
        ],
        howToUse: "Apply a generous layer to clean face, avoiding eye area. Leave on for 10-15 minutes. Rinse with lukewarm water. Use 1-2 times per week or as needed.",
        skinTypes: ["all", "dry", "dehydrated", "normal"],
        concerns: ["dryness", "dull-skin", "dehydration"],
        featured: false,
        bestseller: false,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800",
        images: [
            "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800"
        ],
        variants: [
            { id: "8-75ml", size: "75ml", price: 45.00, inStock: true }
        ],
        model3d: {
            url: "models/mask-jar.glb",
            fallbackImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800"
        },
        stock: 98,
        new: true
    }
];

// Reviews Data
const reviewsData = {
    1: [
        {
            id: 101,
            productId: 1,
            rating: 5,
            title: "Holy Grail Serum!",
            comment: "This serum is absolutely amazing! My skin feels so hydrated and plump. I've noticed a significant reduction in fine lines after just 3 weeks.",
            author: "Emily R.",
            verified: true,
            date: "2025-09-15",
            helpful: 42
        },
        {
            id: 102,
            productId: 1,
            rating: 5,
            title: "Best hyaluronic acid serum",
            comment: "I've tried many HA serums and this one is by far the best. It doesn't pill under makeup and keeps my skin hydrated all day.",
            author: "Sarah M.",
            verified: true,
            date: "2025-09-10",
            helpful: 38
        },
        {
            id: 103,
            productId: 1,
            rating: 4,
            title: "Great product",
            comment: "Really good serum, my skin loves it. Only wish it came in a larger size!",
            author: "Jessica K.",
            verified: true,
            date: "2025-09-05",
            helpful: 15
        }
    ],
    2: [
        {
            id: 201,
            productId: 2,
            rating: 5,
            title: "Glowing skin in 2 weeks!",
            comment: "I was skeptical about vitamin C products, but this cream proved me wrong. My dark spots are fading and my skin looks so radiant!",
            author: "Maria G.",
            verified: true,
            date: "2025-09-18",
            helpful: 56
        },
        {
            id: 202,
            productId: 2,
            rating: 5,
            title: "Worth every penny",
            comment: "This is my third jar! The texture is luxurious and it doesn't irritate my sensitive skin. Highly recommend.",
            author: "Linda P.",
            verified: true,
            date: "2025-09-12",
            helpful: 44
        }
    ],
    3: [
        {
            id: 301,
            productId: 3,
            rating: 5,
            title: "Game changer for aging skin",
            comment: "I'm 45 and this retinol has transformed my skin. No irritation and visible results in reducing wrinkles.",
            author: "Patricia W.",
            verified: true,
            date: "2025-09-20",
            helpful: 67
        }
    ],
    4: [
        {
            id: 401,
            productId: 4,
            rating: 5,
            title: "Gentlest cleanser ever",
            comment: "Perfect for my sensitive skin. Removes all makeup without any tightness or irritation.",
            author: "Amanda T.",
            verified: true,
            date: "2025-09-17",
            helpful: 51
        }
    ],
    5: [
        {
            id: 501,
            productId: 5,
            rating: 5,
            title: "No white cast!",
            comment: "Finally, a mineral sunscreen that doesn't leave a white cast! Wears beautifully under makeup too.",
            author: "Rachel L.",
            verified: true,
            date: "2025-09-19",
            helpful: 72
        }
    ]
};

// Categories
const categories = [
    { id: "serums", name: "Serums", count: 1 },
    { id: "moisturizers", name: "Moisturizers", count: 1 },
    { id: "cleansers", name: "Cleansers", count: 1 },
    { id: "treatments", name: "Treatments", count: 3 },
    { id: "suncare", name: "Sun Care", count: 1 },
    { id: "masks", name: "Masks", count: 1 }
];

// Skin Types
const skinTypes = [
    { id: "all", name: "All Skin Types" },
    { id: "dry", name: "Dry" },
    { id: "oily", name: "Oily" },
    { id: "combination", name: "Combination" },
    { id: "sensitive", name: "Sensitive" },
    { id: "normal", name: "Normal" },
    { id: "mature", name: "Mature" }
];

// Skin Concerns
const skinConcerns = [
    { id: "dryness", name: "Dryness" },
    { id: "aging", name: "Aging" },
    { id: "dark-spots", name: "Dark Spots" },
    { id: "dull-skin", name: "Dull Skin" },
    { id: "fine-lines", name: "Fine Lines" },
    { id: "wrinkles", name: "Wrinkles" },
    { id: "texture", name: "Texture" },
    { id: "large-pores", name: "Large Pores" },
    { id: "sensitivity", name: "Sensitivity" },
    { id: "uneven-tone", name: "Uneven Tone" },
    { id: "dark-circles", name: "Dark Circles" },
    { id: "puffiness", name: "Puffiness" }
];

// Blog Posts
const blogPosts = [
    {
        id: 1,
        title: "The Complete Guide to Layering Skincare Products",
        slug: "guide-to-layering-skincare",
        excerpt: "Learn the correct order to apply your skincare products for maximum efficacy and results.",
        content: "Full blog content here...",
        image: "https://images.unsplash.com/photo-1556228841-5c5b6cf6dd52?w=800",
        author: "Dr. Sarah Johnson",
        date: "2025-09-25",
        category: "Education",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Understanding Vitamin C: Benefits and How to Use",
        slug: "understanding-vitamin-c",
        excerpt: "Everything you need to know about this powerful antioxidant and how to incorporate it into your routine.",
        content: "Full blog content here...",
        image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800",
        author: "Emily Chen",
        date: "2025-09-20",
        category: "Ingredients",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "Building Your First Skincare Routine",
        slug: "first-skincare-routine",
        excerpt: "A beginner's guide to creating an effective skincare routine that works for you.",
        content: "Full blog content here...",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800",
        author: "Dr. Michael Lee",
        date: "2025-09-15",
        category: "Routine",
        readTime: "6 min read"
    }
];

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, reviewsData, categories, skinTypes, skinConcerns, blogPosts };
}