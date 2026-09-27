import { View, Text, Pressable, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil — wkrótce</Text>
      <Pressable style={styles.button} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.buttonText}>Wyloguj się</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#ef4444', padding: 14, borderRadius: 8, paddingHorizontal: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
