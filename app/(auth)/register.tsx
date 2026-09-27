import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nickname.trim()) {
      Alert.alert('Błąd', 'Podaj nickname');
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      Alert.alert('Błąd rejestracji', error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, nickname: nickname.trim() });

      if (profileError) {
        Alert.alert('Konto utworzone, ale błąd profilu', profileError.message);
      }
    }

    setLoading(false);
    Alert.alert('Sukces', 'Konto utworzone!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPOTED</Text>
      <Text style={styles.subtitle}>Załóż konto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nickname"
        placeholderTextColor="#666"
        autoCapitalize="none"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło (min. 6 znaków)"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Tworzenie konta...' : 'Zarejestruj się'}</Text>
      </Pressable>

      <Link href="/(auth)/login" style={styles.link}>
        Masz już konto? Zaloguj się
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#3b82f6', textAlign: 'center', marginTop: 20 },
});
