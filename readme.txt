HungerStationClone/
├── .expo/                  # Expo configuration files
├── assets/                 # All app images and assets
│   ├── adaptive-icon.png   # Adaptive icon for Android
│   ├── favicon.png         # Favicon for web
│   ├── icon.png            # App icon
│   ├── splash.png          # Splash screen
│   │
│   ├── carousel1.png       # Carousel images
│   ├── carousel2.png
│   ├── carousel3.png
│   │
│   ├── restaurant.png      # Category icons
│   ├── hmarket1.png        # HMarket rotating images
│   ├── hmarket2.png
│   ├── hmarket3.png
│   ├── supermarket.png
│   ├── pickup.png
│   ├── coffee.png
│   ├── pharmacy.png
│   ├── flowers.png
│   │
│   ├── zakat.png           # Daily offers images
│   ├── ramadaniat.png
│   ├── scheduled.png
│   ├── charity.png
│   │
│   ├── meal1.png           # Meal images
│   ├── meal2.png
│   ├── meal3.png
│   │
│   ├── pianta.png          # Restaurant images
│   ├── piantalogo.png
│   ├── etoile.png
│   ├── etoilelogo.png
│   │
│   ├── fastfood.png        # Cuisine category images
│   ├── desserts.png
│   ├── arabic.png
│   ├── healthy.png
│   ├── coffeecuisine.png
│   │
│   ├── home-active.png     # Navigation icons
│   ├── orders.png
│   ├── offers.png
│   └── more.png
│
├── components/             # Reusable components (optional)
│   ├── CategoryItem.tsx    # Component for category items
│   ├── MealCard.tsx        # Component for meal cards
│   ├── OfferCard.tsx       # Component for offer cards
│   └── RestaurantCard.tsx  # Component for restaurant cards
│
├── node_modules/           # Dependencies (auto-generated)
├── .gitignore              # Git ignore file
├── app-env.d.ts            # TypeScript environment declarations
├── app.json                # Expo app configuration
├── App.tsx                 # Main application file
├── babel.config.js         # Babel configuration
├── global.css              # Global CSS styles
├── metro.config.js         # Metro bundler configuration
├── nativewind-env.d.ts     # NativeWind TypeScript declarations
├── package-lock.json       # NPM lock file
├── package.json            # NPM package configuration
├── prettier.config.js      # Prettier configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration


## for creating new expo project

npx create-expo-app HungerStationClone
cd HungerStationClone


## for installing dependencies

## For installing dependencies

# Install NativeWind and TailwindCSS
npm install nativewind@2.0.11 tailwindcss@^3.4.17

# Install React Native Reanimated and Safe Area Context
npm install react-native-reanimated@3.16.2 react-native-safe-area-context

# Install React Native Gesture Handler
npm install react-native-gesture-handler

# Install React Native Heroicons and React Native SVG
npm install react-native-heroicons react-native-svg

# Install React Native Reanimated Carousel
npm install react-native-reanimated-carousel