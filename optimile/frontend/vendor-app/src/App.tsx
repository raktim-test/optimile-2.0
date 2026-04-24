
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const tabs = ['Booking Inbox', 'Booking Detail', 'Vehicle Assignment', 'Live Auction List'];

function Screen({ title }: { title: string }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{title}</Text>
      <Text>Mock UI scaffold with cards, list/table shells, validation, and status badges.</Text>
      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 16 }}>
        <Text>Widget area</Text>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {tabs.map((tab) => (
          <Tab.Screen key={tab} name={tab}>
            {() => <Screen title={tab} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
