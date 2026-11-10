export interface EventItem {
  time: string;
  title: string;
  subtitle: string;
  location: string;
  attire: string;
  description: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  orientation: 'portrait' | 'landscape' | 'square';
  tag: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      title: string;
      bio: string;
      image: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      title: string;
      bio: string;
      image: string;
    };
    tagline: string;
    hashtag: string;
  };
  weddingDate: {
    targetIso: string; // 2027-02-14T10:00:00+05:30
    displayDate: string;
    dayOfWeek: string;
    timeString: string;
    calendarNote: string;
  };
  venue: {
    church: {
      name: string;
      address: string;
      city: string;
      state: string;
      coordinates: string;
      directionsUrl: string;
    };
    reception: {
      name: string;
      address: string;
      city: string;
      state: string;
      coordinates: string;
      directionsUrl: string;
    };
  };
  schedule: EventItem[];
  gallery: GalleryPhoto[];
  videoAsset: {
    src: string;
    poster: string;
    title: string;
    duration: string;
  };
  disclaimer: {
    isFictional: boolean;
    badgeText: string;
    subText: string;
    attribution: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "JUSTIN",
      fullName: "Justin Giri",
      title: "The Groom",
      bio: "Gentle soul, quiet smile, and passionate agro-botanist with an unwavering heart.",
      image: "/assets/groom-justin.jpg",
    },
    bride: {
      firstName: "ASHLEY",
      fullName: "Ashley Mathew",
      title: "The Bride",
      bio: "Fierce dreamer, brilliant physician, and the one whose laughter fills every silent room.",
      image: "/assets/bride-ashley.jpg",
    },
    tagline: "A Beautiful Beginning",
    hashtag: "#JustinWedsAshley",
  },
  weddingDate: {
    targetIso: "2027-02-14T10:00:00+05:30",
    displayDate: "February 14, 2027",
    dayOfWeek: "Sunday Morning",
    timeString: "10:00 AM IST",
    calendarNote: "Save the auspicious date for our lifelong union.",
  },
  venue: {
    church: {
      name: "St. Jude's Royal Cathedral",
      address: "Hill View Sanctuary, Palm Valley Road",
      city: "Kottayam",
      state: "Kerala, India",
      coordinates: "9.5916° N, 76.5222° E",
      directionsUrl: "https://maps.google.com/?q=St+Jude+Cathedral",
    },
    reception: {
      name: "Emerald Palms Grand Lawn",
      address: "Backwater Pavilion, Riverside Boulevard",
      city: "Kumarakom",
      state: "Kerala, India",
      coordinates: "9.6175° N, 76.4300° E",
      directionsUrl: "https://maps.google.com/?q=Kumarakom+Kerala",
    },
  },
  schedule: [
    {
      time: "09:30 AM",
      title: "The Sacred Holy Matrimony",
      subtitle: "Solemn Exchange of Vows & Rings",
      location: "St. Jude's Cathedral Sanctuary",
      attire: "Traditional Kerala Kasavu & Formal Festive",
      description: "Witness the lifelong pledge of unity amidst choral hymns, sacred incense, and blessed rings.",
      iconName: "Church",
    },
    {
      time: "12:30 PM",
      title: "The Royal Kerala Sadya",
      subtitle: "Traditional Grand Banquet on Plantain Leaf",
      location: "The Heritage Banquets, Kumarakom",
      attire: "Elegant Festive",
      description: "An authentic culinary feast of 24 traditional delicacies served with aromatic payasam.",
      iconName: "UtensilsCrossed",
    },
    {
      time: "04:30 PM",
      title: "Sunset Serenade & High Tea",
      subtitle: "Golden Hour Melodies by the Water",
      location: "Lakeside Palms Promenade",
      attire: "Garden Party Chic / Champagne Hues",
      description: "Artisanal teas, fresh bridal cakes, and live acoustic violin as the sun dips below the palms.",
      iconName: "Sparkles",
    },
    {
      time: "07:00 PM",
      title: "The Grand Reception Gala",
      subtitle: "Champagne Toast, First Dance & Festivities",
      location: "Grand Ballroom & Starlit Amphitheatre",
      attire: "Black Tie & Evening Glamour",
      description: "An enchanting evening of heartfelt toasts, live jazz, dazzling lights, and celebratory dancing.",
      iconName: "GlassWater",
    },
  ],
  gallery: [
    {
      id: "heritage-tradition",
      src: "/assets/couple-traditional.jpg",
      title: "Heritage & Gold",
      caption: "Dressed in handwoven ivory Kasavu and pure champagne gold, honoring timeless Kerala roots.",
      orientation: "portrait",
      tag: "Traditional Ceremony",
    },
    {
      id: "unscripted-laughter",
      src: "/assets/couple-candid.jpg",
      title: "Unspoken Words",
      caption: "An intimate sunlit afternoon shared between tea and quiet glances across the old cedar table.",
      orientation: "portrait",
      tag: "Candid Moments",
    },
    {
      id: "mountain-breeze",
      src: "/assets/couple-outdoor.jpg",
      title: "Endless Horizons",
      caption: "Back-to-back under open blue skies, smiling at memories made and thousands yet to come.",
      orientation: "landscape",
      tag: "Outdoor Reverie",
    },
    {
      id: "the-groom-portrait",
      src: "/assets/groom-justin.jpg",
      title: "The Patient Wait",
      caption: "Justin's warmth and quiet confidence—ready to welcome his soulmate to forever.",
      orientation: "portrait",
      tag: "The Groom",
    },
    {
      id: "the-bride-portrait",
      src: "/assets/bride-ashley.jpg",
      title: "Pure Grace",
      caption: "Ashley in hand-crafted gold jhumkas and emerald accents, radiating bridal tranquility.",
      orientation: "portrait",
      tag: "The Bride",
    },
  ],
  videoAsset: {
    src: "/assets/couple-film.mp4",
    poster: "/assets/couple-outdoor.jpg",
    title: "Forever In Motion — Justin & Ashley",
    duration: "Cinematic Film Preview",
  },
  disclaimer: {
    isFictional: true,
    badgeText: "FICTIONAL FAN-MADE CONCEPT",
    subText: "Created as an ultra-luxury digital invitation homage celebrating iconic cinema characters Giri & Pooja.",
    attribution: "All character references, dates and event venues are artistic fan-created concepts for creative showcase.",
  },
};
