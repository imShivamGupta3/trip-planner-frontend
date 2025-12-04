

// --- IMAGE COLLECTIONS ---
const IMAGE_CATEGORIES = {
    // FOR DESTINATIONS (Dashboard)
    CITYSCAPE: [
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop', // Chicago
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop', // NYC
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop', // Seattle
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop', // Paris
        'https://images.unsplash.com/photo-1538964173425-93884d739596?q=80&w=2000&auto=format&fit=crop', // Beach City
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000&auto=format&fit=crop'  // Dubai vibe
    ],
    // FOR SPECIFIC VENUES (Inside Trip View)
    BEACH: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473116763249-56386a4629bfc?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop', // Tropical island
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=2070&auto=format&fit=crop'
    ],
    MOUNTAIN: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486870591958-9b9d011cd540?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2031&auto=format&fit=crop' // Green hills
    ],
    HOTEL: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', // Resort pool
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop'
    ],
    RESTAURANT: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop', // Fine dining
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop'
    ],
    PARK: [
        'https://images.unsplash.com/photo-1476994230281-1448088947db?q=80&w=2067&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504542982118-59308b40fe0c?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596324540876-2e3e7a80c824?q=80&w=2070&auto=format&fit=crop' // Wildlife/Zoo vibe
    ],
    TEMPLE: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598890777032-bde835442c38?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604580832000-3721906a7246?q=80&w=2070&auto=format&fit=crop', // Indian temple vibe
        'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop'
    ],
    BAR: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2057&auto=format&fit=crop', // Drinks close up
    ],
    GENERIC_TRAVEL: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop', // Traveler feet
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop'  // Travel accessories
    ]
};

// Helper to pick random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * ✅ NEW FUNCTION FOR DASHBOARD (All Trips Page)
 * Selects an image suitable for a Destination name (e.g., "Paris", "Goa").
 */
export const getDestinationImage = (destinationName) => {
    if (!destinationName) return getRandom(IMAGE_CATEGORIES.GENERIC_TRAVEL);

    const name = destinationName.toLowerCase();

    // Check for broad destination types first
    if (name.includes('beach') || name.includes('island') || name.includes('goa') || name.includes('maldives')) {
        return getRandom(IMAGE_CATEGORIES.BEACH);
    }
    if (name.includes('mountain') || name.includes('hill') || name.includes('manali') || name.includes('shimla') || name.includes('himalaya')) {
        return getRandom(IMAGE_CATEGORIES.MOUNTAIN);
    }

    // If it's not obviously a beach or mountain, assume it's a city/urban destination
    // and return a random cityscape image.
    return getRandom(IMAGE_CATEGORIES.CITYSCAPE);
};


/**
 * FUNCTION FOR INSIDE A TRIP (Hotels, Restaurants, etc.)
 * Selects an image based on specific venue keywords.
 */
export const getSmartPlaceImg = (placeName) => {
    if (!placeName) return getRandom(IMAGE_CATEGORIES.GENERIC_TRAVEL);

    const name = placeName.toLowerCase();

    // Specific Venue Checks
    if (name.includes('hotel') || name.includes('resort') || name.includes('stay') || name.includes('inn') || name.includes('hostel')) {
        return getRandom(IMAGE_CATEGORIES.HOTEL);
    }
    if (name.includes('restaurant') || name.includes('cafe') || name.includes('diner') || name.includes('bakery') || name.includes('bistro')) {
        return getRandom(IMAGE_CATEGORIES.RESTAURANT);
    }
    if (name.includes('temple') || name.includes('church') || name.includes('cathedral') || name.includes('mosque') || name.includes('shrine')) {
        return getRandom(IMAGE_CATEGORIES.TEMPLE);
    }
    if (name.includes('park') || name.includes('garden') || name.includes('zoo') || name.includes('forest') || name.includes('jungle') || name.includes('falls')) {
        return getRandom(IMAGE_CATEGORIES.PARK);
    }
    if (name.includes('bar') || name.includes('club') || name.includes('pub') || name.includes('nightlife')) {
        return getRandom(IMAGE_CATEGORIES.BAR);
    }
     if (name.includes('beach') || name.includes('sea')) {
        return getRandom(IMAGE_CATEGORIES.BEACH);
    }

    // Default fallback for venues
    return getRandom(IMAGE_CATEGORIES.GENERIC_TRAVEL);
};