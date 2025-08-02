import { SafeAreaView, ScrollView, TouchableOpacity, Dimensions, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface VApp {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  price: string;
  icon: string;
  gradient: string[];
  featured?: boolean;
}

const mockVApps: VApp[] = [
  {
    id: '1',
    name: 'Smart Summary',
    description: 'Automatically generates intelligent summaries after each conversation with key points and action items',
    category: 'Post-Processing',
    rating: 4.9,
    downloads: '2.1M',
    price: 'Free',
    icon: 'document-text-outline',
    gradient: ['#6366f1', '#8b5cf6'],
    featured: true,
  },
  {
    id: '2',
    name: 'Topic Spark',
    description: 'Real-time conversation assistant that suggests relevant topics and questions to keep discussions flowing',
    category: 'Real-Time',
    rating: 4.8,
    downloads: '1.8M',
    price: '2.5 SOL',
    icon: 'bulb-outline',
    gradient: ['#ec4899', '#f97316'],
    featured: true,
  },
  {
    id: '3',
    name: 'Mood Detector',
    description: 'Analyzes conversation tone and emotional context to provide insights and suggestions',
    category: 'Real-Time',
    rating: 4.7,
    downloads: '1.2M',
    price: 'Free',
    icon: 'happy-outline',
    gradient: ['#06b6d4', '#3b82f6'],
  },
  {
    id: '4',
    name: 'Voice Translator',
    description: 'Real-time translation plugin that breaks language barriers during conversations',
    category: 'Real-Time',
    rating: 4.6,
    downloads: '3.2M',
    price: '1.8 SOL',
    icon: 'language-outline',
    gradient: ['#10b981', '#059669'],
  },
  {
    id: '5',
    name: 'Meeting Notes',
    description: 'Converts conversations into structured meeting notes with timestamps and speaker identification',
    category: 'Post-Processing',
    rating: 4.8,
    downloads: '950K',
    price: '3.2 SOL',
    icon: 'clipboard-outline',
    gradient: ['#f59e0b', '#d97706'],
  },
  {
    id: '6',
    name: 'Awkward Silence Saver',
    description: 'Detects conversation lulls and suggests ice-breakers or topic transitions in real-time',
    category: 'Real-Time',
    rating: 4.5,
    downloads: '750K',
    price: '1.5 SOL',
    icon: 'time-outline',
    gradient: ['#8b5cf6', '#a855f7'],
  },
  {
    id: '7',
    name: 'Fact Checker',
    description: 'Real-time fact verification that discretely validates claims and statements during conversations',
    category: 'Real-Time',
    rating: 4.7,
    downloads: '680K',
    price: '4.0 SOL',
    icon: 'checkmark-circle-outline',
    gradient: ['#ef4444', '#dc2626'],
  },
  {
    id: '8',
    name: 'Memory Booster',
    description: 'Post-conversation analysis that highlights important details and creates searchable conversation history',
    category: 'Post-Processing',
    rating: 4.6,
    downloads: '890K',
    price: 'Free',
    icon: 'library-outline',
    gradient: ['#06b6d4', '#0891b2'],
  },
];

const categories = ['All', 'Real-Time', 'Post-Processing', 'Free', 'Premium'];

export default function VAppsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVApps = mockVApps.filter(app => {
    let matchesCategory = false;
    
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Free') {
      matchesCategory = app.price === 'Free';
    } else if (selectedCategory === 'Premium') {
      matchesCategory = app.price !== 'Free';
    } else {
      matchesCategory = app.category === selectedCategory;
    }
    
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredApps = mockVApps.filter(app => app.featured);

  const renderVAppCard = (app: VApp, featured = false) => (
    <TouchableOpacity key={app.id} activeOpacity={0.9}>
      <Card 
        className={`mb-3 ${featured ? 'mx-2' : ''}`}
        variant="elevated"
        style={{ 
          width: featured ? width * 0.85 : '100%',
          backgroundColor: '#ffffff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        <CardBody className="p-4">
          <Box className="flex-row items-start justify-between">
            <Box className="flex-row items-start flex-1">
              <Box 
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{
                  backgroundColor: app.gradient[0] + '15',
                }}
              >
                <Ionicons name={app.icon as any} size={28} color={app.gradient[0]} />
              </Box>
              
              <Box className="flex-1">
                <Box className="flex-row items-center mb-1">
                  <Heading size={featured ? 'lg' : 'md'} className="text-typography-900 font-semibold mr-2">
                    {app.name}
                  </Heading>
                  {app.category === 'Real-Time' && (
                    <Box className="bg-green-100 px-2 py-1 rounded-full">
                      <Text size="xs" className="text-green-700 font-medium">
                        LIVE
                      </Text>
                    </Box>
                  )}
                  {app.category === 'Post-Processing' && (
                    <Box className="bg-blue-100 px-2 py-1 rounded-full">
                      <Text size="xs" className="text-blue-700 font-medium">
                        AUTO
                      </Text>
                    </Box>
                  )}
                </Box>
                <Text size="xs" className="text-typography-500 mb-2 uppercase tracking-wide font-medium">
                  {app.category === 'Real-Time' ? 'Real-Time Plugin' : 'Post-Processing Plugin'}
                </Text>
                <Text size="sm" className="text-typography-600 leading-5 mb-3">
                  {app.description}
                </Text>
                <Box className="flex-row items-center">
                  <Box className="flex-row items-center mr-4">
                    <Ionicons name="star" size={12} color="#fbbf24" />
                    <Text size="xs" className="text-typography-700 ml-1 font-medium">
                      {app.rating}
                    </Text>
                  </Box>
                  <Text size="xs" className="text-typography-500">
                    {app.downloads}
                  </Text>
                </Box>
              </Box>
            </Box>
            
            <Box className="items-end ml-3">
              <Text size="sm" weight="bold" className="text-typography-900 mb-3">
                {app.price}
              </Text>
              <Button 
                size="sm" 
                className="rounded-full px-5 py-2"
              >
                <ButtonText size="sm" className="text-white font-semibold">
                  Install
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Box className="px-6 pt-16 pb-8">
          <Box className="flex-row items-center justify-between mb-6">
            <Box>
              <Heading size="3xl" className="text-typography-900 mb-2 font-bold">
                vApps Store
              </Heading>
              <Text size="md" className="text-typography-500">
                Conversation Enhancement Plugins
              </Text>
            </Box>
            <TouchableOpacity activeOpacity={0.7}>
              <Box className="w-12 h-12 bg-background-50 rounded-2xl items-center justify-center border border-outline-100">
                <Ionicons name="search-outline" size={22} color="#6b7280" />
              </Box>
            </TouchableOpacity>
          </Box>

          {/* Stats */}
          <Box className="flex-row justify-between">
            <Box className="items-center">
              <Text size="2xl" weight="bold" className="text-typography-900 mb-1">
                847
              </Text>
              <Text size="xs" className="text-typography-500 uppercase tracking-wide">
                Total Plugins
              </Text>
            </Box>
            <Box className="items-center">
              <Text size="2xl" weight="bold" className="text-primary-600 mb-1">
                23
              </Text>
              <Text size="xs" className="text-typography-500 uppercase tracking-wide">
                New This Week
              </Text>
            </Box>
            <Box className="items-center">
              <Text size="2xl" weight="bold" className="text-success-600 mb-1">
                99.1%
              </Text>
              <Text size="xs" className="text-typography-500 uppercase tracking-wide">
                Uptime
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Featured Section */}
        <Box className="mb-8">
          <Box className="px-6 mb-5">
            <Heading size="xl" className="text-typography-900 mb-2 font-semibold">
              Featured Plugins
            </Heading>
            <Text size="sm" className="text-typography-500">
              Most popular conversation enhancement plugins
            </Text>
          </Box>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {featuredApps.map(app => renderVAppCard(app, true))}
          </ScrollView>
        </Box>

        {/* Categories */}
        <Box className="px-6 mb-8">
          <Heading size="xl" className="text-typography-900 mb-5 font-semibold">
            Categories
          </Heading>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Box
                  className={`mr-3 px-5 py-3 rounded-2xl ${
                    selectedCategory === category
                      ? 'bg-primary-600'
                      : 'bg-background-50 border border-outline-100'
                  }`}
                >
                  <Text
                    size="sm"
                    weight="medium"
                    className={
                      selectedCategory === category
                        ? 'text-white'
                        : 'text-typography-600'
                    }
                  >
                    {category}
                  </Text>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Box>

        {/* All Apps */}
        <Box className="px-6">
          <Box className="flex-row items-center justify-between mb-5">
            <Heading size="xl" className="text-typography-900 font-semibold">
              {selectedCategory === 'All' ? 'All Apps' : selectedCategory}
            </Heading>
            <Text size="sm" className="text-typography-500">
              {filteredVApps.length} apps
            </Text>
          </Box>
          
          {filteredVApps.map(app => renderVAppCard(app))}
        </Box>

        {/* Bottom CTA */}
        <Box className="px-6 mt-8 mb-6">
          <Card 
            className="border-0"
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: 20,
            }}
          >
            <CardBody className="items-center py-8 px-6">
              <Box className="w-16 h-16 bg-primary-100 rounded-3xl items-center justify-center mb-4">
                <Ionicons name="code-slash-outline" size={32} color="#4f46e5" />
              </Box>
              <Heading size="xl" className="text-typography-900 mb-3 font-semibold text-center">
                Build Your Own Plugin
              </Heading>
              <Text size="sm" className="text-typography-500 text-center mb-6 leading-6 max-w-xs">
                Create conversation enhancement plugins and monetize your innovations in the decentralized ecosystem.
              </Text>
              <Button className="bg-primary-600 px-8 py-3 rounded-2xl">
                <ButtonText className="text-white font-semibold">
                  Start Building
                </ButtonText>
              </Button>
            </CardBody>
          </Card>
        </Box>
        <Box className="h-20"/>
      </ScrollView>
    </SafeAreaView>
  );
}
