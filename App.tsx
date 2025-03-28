import React, { useState, useEffect, useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

// Import icons
import { 
  MapPinIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon,
  TruckIcon,
  PlusIcon
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

// Define types for our data
interface CarouselItem {
  id: string;
  image: any;
  title: string;
  buttonText: string;
}

interface CategoryItem {
  id: string;
  title: string;
  image: any;
  badge?: string;
}

interface OfferItem {
  id: string;
  title: string;
  image: any;
  badge?: string;
}

interface MealItem {
  id: string;
  title: string;
  image: any;
  price: string;
  originalPrice?: string;
  deliveryTime: string;
  distance: string;
  freeDelivery: boolean;
}

interface RestaurantItem {
  id: string;
  name: string;
  image: any;
  logo: any;
  rating: string;
  reviews: string;
  categories: string[];
  deliveryTime: string;
  price: string;
  offer: string;
  topChoice: boolean;
  freeDelivery: boolean;
  minSpend: string;
}

interface CuisineItem {
  id: string;
  title: string;
  image: any;
}

export default function App() {
  // State for carousel
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);
  const progressValue = useSharedValue<number>(0);
  
  // State for HMarket image animation
  const [currentHMarketImage, setCurrentHMarketImage] = useState<number>(0);
  const hMarketImages = [
    require('./assets/hmarket1.png'),
    require('./assets/hmarket2.png'),
    require('./assets/hmarket3.png'),
  ];
  
  // Carousel data
  const carouselData: CarouselItem[] = [
    { 
      id: '1', 
      image: require('./assets/carousel1.png'),
      title: 'Schedule your orders for this Ramadan',
      buttonText: 'Schedule Now'
    },
    { 
      id: '2', 
      image: require('./assets/carousel2.png'),
      title: 'Special Ramadan Offers',
      buttonText: 'View Offers'
    },
    { 
      id: '3', 
      image: require('./assets/carousel3.png'),
      title: 'Free Delivery on Selected Restaurants',
      buttonText: 'Order Now'
    },
  ];
  
  // Category data
  const categories: CategoryItem[] = [
    {
      id: '1',
      title: 'Restaurants',
      image: require('./assets/restaurant.png'),
      badge: '+50,000'
    },
    {
      id: '2',
      title: 'HMarket',
      image: hMarketImages[currentHMarketImage],
      badge: '20 Mins'
    },
    {
      id: '3',
      title: 'Supermarkets',
      image: require('./assets/supermarket1.png'),
    },
    {
      id: '4',
      title: 'Self Pick-Up',
      image: require('./assets/pickup.png'),
      badge: 'Up to 20% off'
    },
    {
      id: '5',
      title: 'Coffee & Sweets',
      image: require('./assets/coffee.png'),
    },
    {
      id: '6',
      title: 'Pharmacies',
      image: require('./assets/pharmacy1.png'),
    },
    {
      id: '7',
      title: 'Flowers & More',
      image: require('./assets/flowers1.png'),
    },
  ];
  
  // Daily offers data
  const dailyOffers: OfferItem[] = [
    {
      id: '1',
      title: 'Zakat Al Fitr',
      image: require('./assets/scheduled.png'),
    },
    {
      id: '2',
      title: 'Ramadaniat',
      image: require('./assets/carousel3.png'),
      badge: 'Up to 30% Off'
    },
    {
      id: '3',
      title: 'Scheduled Orders',
      image: require('./assets/carousel1.png'),
    },
    {
      id: '4',
      title: 'Make a Difference',
      image: require('./assets/charity.png'),
    },
  ];
  
  // Meals data
  const mealsData: MealItem[] = [
    {
      id: '1',
      title: 'Abo Al Sawarikh And Garsah Offer',
      image: require('./assets/meal1.png'),
      price: '29 SR',
      deliveryTime: '45-60min',
      distance: '5.5km',
      freeDelivery: true
    },
    {
      id: '2',
      title: 'Abo Al Sawarikh And Sabbosa Offer',
      image: require('./assets/carousel3.png'),
      price: '29 SR',
      deliveryTime: '45-60min',
      distance: '5.5km',
      freeDelivery: true
    },
    {
      id: '3',
      title: 'Premium Combo',
      image: require('./assets/meal3.png'),
      price: '29 SR',
      originalPrice: '58 SR',
      deliveryTime: '30-40min',
      distance: '6.5km',
      freeDelivery: true
    },
  ];
  
  // Featured restaurants data
  const featuredRestaurants: RestaurantItem[] = [
    {
      id: '1',
      name: 'Pianta Caffe',
      image: require('./assets/pianta.png'),
      logo: require('./assets/piantalogo.png'),
      rating: '4.2',
      reviews: '(305)',
      categories: ['Sandwich', 'Desserts', 'Beverages'],
      deliveryTime: '40 - 55 mins',
      price: '24 SR',
      offer: '20% off on selected items',
      topChoice: true,
      freeDelivery: true,
      minSpend: '15 SAR'
    },
    {
      id: '2',
      name: 'Etoile',
      image: require('./assets/carousel3.png'),
      logo: require('./assets/etoilelogo.png'),
      rating: '4.5',
      reviews: '(420)',
      categories: ['Desserts', 'Bakery'],
      deliveryTime: '40 - 50 mins',
      price: '',
      offer: '20% Off Your Order',
      topChoice: true,
      freeDelivery: true,
      minSpend: '20 SAR'
    },
  ];
  
  // Cuisine data
  const cuisines: CuisineItem[] = [
    {
      id: '1',
      title: 'Fast Food',
      image: require('./assets/carousel1.png'),
    },
    {
      id: '2',
      title: 'Desserts',
      image: require('./assets/desert.png'),
    },
    {
      id: '3',
      title: 'Arabic',
      image: require('./assets/arabic.png'),
    },
    {
      id: '4',
      title: 'Healthy',
      image: require('./assets/home-active.png'),
    },
    {
      id: '5',
      title: 'Coffee',
      image: require('./assets/coffee.png'),
    },
  ];
  
  // HMarket image animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHMarketImage((prev) => (prev + 1) % hMarketImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Carousel auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Render category item
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity className="items-center mr-4 w-24">
      <View className="relative">
        <View className="bg-blue-50 rounded-xl overflow-hidden w-24 h-24 items-center justify-center">
          <Image 
            source={item.image} 
            className="w-16 h-16" 
            resizeMode="contain" 
          />
        </View>
        {item.badge ? (
          <View className={`absolute bottom-1 ${item.id === '4' ? 'left-0 right-0 mx-auto w-24' : 'left-1'} bg-yellow-400 rounded-full px-2 py-0.5`}>
            <Text className="text-xs font-bold text-center">{item.badge}</Text>
          </View>
        ) : null}
      </View>
      <Text className="text-center mt-1 text-gray-700 font-medium">{item.title}</Text>
    </TouchableOpacity>
  );

  // Render daily offer item
  const renderDailyOfferItem = ({ item }: { item: OfferItem }) => (
    <TouchableOpacity className="mr-4">
      <View className="bg-white rounded-xl overflow-hidden w-28 h-28 items-center justify-center">
        <Image 
          source={item.image} 
          className="w-28 h-28" 
          resizeMode="cover" 
        />
        {item.badge ? (
          <View className="absolute top-2 right-2 bg-yellow-400 rounded-full px-2 py-0.5">
            <Text className="text-xs font-bold">{item.badge}</Text>
          </View>
        ) : null}
      </View>
      <Text className="text-center mt-1 text-gray-800 font-medium">{item.title}</Text>
    </TouchableOpacity>
  );

  // Render meal item
  const renderMealItem = ({ item }: { item: MealItem }) => (
    <TouchableOpacity className="mr-4 bg-white rounded-xl overflow-hidden w-44 shadow-sm border border-gray-100">
      <Image 
        source={item.image} 
        className="w-44 h-44" 
        resizeMode="cover" 
      />
      <View className="p-2">
        <Text className="text-gray-800 font-medium" numberOfLines={2}>{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Text className={`font-bold text-lg ${item.originalPrice ? 'text-pink-500' : 'text-gray-900'}`}>{item.price}</Text>
          {item.originalPrice && (
            <Text className="ml-2 text-gray-400 line-through">{item.originalPrice}</Text>
          )}
        </View>
        <View className="bg-blue-500 rounded-md mt-1 py-1">
          <Text className="text-white text-center font-medium">Free delivery</Text>
        </View>
        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-500">{item.deliveryTime}</Text>
          <Text className="text-gray-500">{item.distance}</Text>
        </View>
      </View>
      <TouchableOpacity className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
        <PlusIcon size={16} color="#333" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render featured restaurant item
  const renderFeaturedItem = ({ item }: { item: RestaurantItem }) => (
    <TouchableOpacity className="mr-4 bg-white rounded-xl overflow-hidden w-64 shadow-sm border border-gray-100">
      <View className="relative">
        <Image 
          source={item.image} 
          className="w-64 h-40" 
          resizeMode="cover" 
        />
        <View className="absolute top-2 left-2 bg-white rounded-md p-1">
          <Image 
            source={item.logo} 
            className="w-12 h-12" 
            resizeMode="contain" 
          />
        </View>
        <View className="absolute top-2 right-2 bg-white rounded-md px-2 py-1 flex-row items-center">
          <StarIcon size={16} color="#FFD700" fill="#FFD700" />
          <Text className="ml-1 font-medium">{item.rating} {item.reviews}</Text>
        </View>
        {item.topChoice && (
          <View className="absolute bottom-2 left-2 bg-white rounded-md px-2 py-1 flex-row items-center">
            <StarIcon size={14} color="#3B82F6" fill="#3B82F6" />
            <Text className="ml-1 text-blue-500 font-medium">Top Choice</Text>
          </View>
        )}
        <View className="absolute bottom-2 left-0 right-0 mx-8 bg-white/90 rounded-md px-2 py-1">
          <Text className="text-red-500 font-medium text-center">{item.offer}</Text>
        </View>
      </View>
      <View className="p-3">
        <Text className="text-xl font-bold">{item.name}</Text>
        <Text className="text-gray-500">{item.categories.join(', ')}</Text>
        <View className="flex-row justify-between mt-2 items-center">
          <View className="flex-row items-center">
            <ClockIcon size={16} color="#666" />
            <Text className="ml-1 text-gray-600">{item.deliveryTime}</Text>
          </View>
          {item.price && (
            <View className="flex-row items-center">
              <Text className="text-gray-600 font-medium">{item.price}</Text>
            </View>
          )}
        </View>
        <Text className="text-blue-500 mt-2">Free delivery (Spend {item.minSpend})</Text>
      </View>
    </TouchableOpacity>
  );

  // Render cuisine item
  const renderCuisineItem = ({ item }: { item: CuisineItem }) => (
    <TouchableOpacity className="items-center mr-6">
      <View className="bg-pink-50 rounded-full overflow-hidden w-20 h-20 items-center justify-center">
        <Image 
          source={item.image} 
          className="w-16 h-16" 
          resizeMode="contain" 
          
        />
      </View>
      <Text className="text-center mt-1 text-gray-800 font-medium">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="bg-blue-50 px-4 pt-2 pb-0 mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-green-500 p-2 rounded-full mr-2 ">
              <MapPinIcon size={20} color="white" />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-800 ">Aqiq</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-600">Aqiq</Text>
                <ChevronDownIcon size={16} color="#666" />
              </View>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <View className="bg-white w-10 h-10 rounded-full items-center justify-center border border-gray-200">
              <MagnifyingGlassIcon size={24} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Carousel with Search Bar Overlay */}
        <View className="relative">
          <Carousel
            loop
            width={width}
            height={200}
            autoPlay={true}
            data={carouselData}
            scrollAnimationDuration={1000}
            autoPlayInterval={5000}
            onProgressChange={(_, absoluteProgress) => {
              progressValue.value = absoluteProgress;
            }}
            onSnapToItem={(index) => setActiveCarouselIndex(index)}
            renderItem={({ item }: { item: CarouselItem }) => (
              <View className="flex-1 bg-blue-50 justify-center items-center">
                <View className="flex-row items-center">
                  <View className="flex-1 pl-4">
                    <Text className="text-lg font-bold text-gray-800 mb-2 mt-14">{item.title}</Text>
                    <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-full w-40">
                      <Text className="text-gray-800 font-bold text-center">{item.buttonText}</Text>
                    </TouchableOpacity>
                    <Text className="text-xs text-gray-500 mt-2">*T&C's apply</Text>
                  </View>
                  <Image 
                    source={item.image} 
                    className="w-40 h-37 mt-14"  
                    resizeMode="contain" 
                  />
                </View>
              </View>
            )}
          />
          
          {/* Search Bar Overlay */}
          <View className="absolute top-4 left-4 right-4 ">
            <View className="bg-white rounded-md shadow-sm flex-row items-center px-4 py-1 border-b-4 border-yellow-400">
              <MagnifyingGlassIcon size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-gray-500"
                placeholder="Search for a restaurant or store"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          
          {/* Carousel Indicators */}
          <View className="flex-row justify-center -mt-10 mb-2">
            {carouselData.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 mx-1 rounded-full ${
                  activeCarouselIndex === index ? 'w-6 bg-blue-500' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>
        
        {/* What would you like to order? */}
        <View className="mt-6 px-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">What would you like to order?</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* First Row */}
            <View className="flex-row justify-between w-full mb-4">
              <TouchableOpacity className="items-center w-[30%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-24 items-center justify-center">
                  <Image source={require('./assets/restaurant.png')} className="w-16 h-16" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Restaurants</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center w-[30%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-24 items-center justify-center">
                  <Image source={require('./assets/hmarket1.png')} className="w-16 h-16" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">HMarket</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center w-[30%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-24 items-center justify-center">
                  <Image source={require('./assets/supermarket1.png')} className="w-16 h-16" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Supermarkets</Text>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View className="flex-row justify-between w-full">
              <TouchableOpacity className="items-center w-[22%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-20 items-center justify-center">
                  <Image source={require('./assets/pickup.png')} className="w-14 h-14" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Self Pick-Up</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center w-[22%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-20 items-center justify-center">
                  <Image source={require('./assets/coffee.png')} className="w-14 h-14" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Coffee & Sweets</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center w-[22%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-20 items-center justify-center">
                  <Image source={require('./assets/pharmacy1.png')} className="w-14 h-14" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Pharmacies</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center w-[22%]">
                <View className="bg-blue-50 rounded-xl overflow-hidden w-full h-20 items-center justify-center">
                  <Image source={require('./assets/flowers1.png')} className="w-14 h-14" resizeMode="contain" />
                </View>
                <Text className="text-center mt-1 text-gray-700 font-medium">Flowers & More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Daily Offers */}
        <View className="mt-6 px-4 pt-4 bg-gray-100">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Daily offers</Text>
          <FlatList
            data={dailyOffers}
            renderItem={renderDailyOfferItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          />
          
          {/* Carousel Indicators */}
          <View className="flex-row justify-center mt-2 mb-2">
            <View className="h-1.5 w-6 mx-1 rounded-full bg-blue-500" />
            <View className="h-1.5 w-1.5 mx-1 rounded-full bg-gray-300" />
            <View className="h-1.5 w-1.5 mx-1 rounded-full bg-gray-300" />
          </View>
        </View>
        
        {/* Meals at 29 & Less */}
        <View className="mt-4 px-4 pt-2 bg-yellow-50">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-gray-800">Meals at </Text>
              <View className="bg-yellow-400 px-2 py-1 rounded-md">
                <Text className="font-bold">29 & Less</Text>
              </View>
              <Text className="text-red-500 ml-1">✨</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-500 text-lg font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mealsData}
            renderItem={renderMealItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-4"
          />
        </View>
        
        {/* Featured */}
        <View className="mt-4 px-4">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Featured</Text>
          <FlatList
            data={featuredRestaurants}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          />
        </View>
        
        {/* Explore cuisines */}
        <View className="mt-6 px-4 mb-20">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Explore cuisines</Text>
          <FlatList
            data={cuisines}
            renderItem={renderCuisineItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          />
          
          {/* Carousel Indicators */}
          <View className="flex-row justify-center mt-2">
            <View className="h-1.5 w-6 mx-1 rounded-full bg-blue-500" />
            <View className="h-1.5 w-1.5 mx-1 rounded-full bg-gray-300" />
            <View className="h-1.5 w-1.5 mx-1 rounded-full bg-gray-300" />
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around py-2">
        <TouchableOpacity className="items-center">
          <Image source={require('./assets/home-active.png')} className="w-8 h-8" />
          <Text className="text-xs font-bold text-gray-800">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <MaterialIcons name="shopping-cart" size={30} color="#666"/>
          <Text className="text-xs text-gray-400">Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
        <FontAwesome name="tags" size={30} color="#666" />
          <Text className="text-xs text-gray-400">Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
        <MaterialIcons name="more-horiz" size={30} color="#666" />
          <Text className="text-xs text-gray-400">More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}