import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_WEB_KEY || '';

export default function Map() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg('Przeglądarka nie wspiera geolokalizacji');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setErrorMsg('Brak zgody na lokalizację')
    );
  }, []);

  if (loadError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Błąd ładowania mapy: {loadError.message}</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!isLoaded || !location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#3b82f6" size="large" />
        <Text style={styles.loadingText}>Ustalanie lokalizacji...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GoogleMap
        mapContainerStyle={styles.map}
        center={location}
        zoom={13}
      >
        <Marker position={location} title="Tu jesteś" />
      </GoogleMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  center: { flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#aaa', marginTop: 12 },
  errorText: { color: '#ef4444', fontSize: 16, textAlign: 'center', padding: 20 },
});
