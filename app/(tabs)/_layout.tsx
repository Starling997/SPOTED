import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f0f0f', borderTopColor: '#222' },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen name="map" options={{ title: 'Mapa' }} />
      <Tabs.Screen name="discover" options={{ title: 'Odkrywaj' }} />
      <Tabs.Screen name="add" options={{ title: 'Dodaj' }} />
      <Tabs.Screen name="messages" options={{ title: 'Wiadomości' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
