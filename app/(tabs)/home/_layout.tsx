import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return <Stack screenOptions={{ animation: 'none', headerShown: false }} />;
}