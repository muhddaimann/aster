import { Ionicons } from '@expo/vector-icons';
import { appAbout } from '../src/constants/about';
import { StyleSheet, Text, View } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View accessible accessibilityLabel="Aster support ticket icon" style={styles.iconContainer}>
          <Ionicons color="#22D3EE" name="ticket-outline" size={42} />
        </View>

        <Text style={styles.eyebrow}>CELCOMDIGI SUPPORT</Text>
        <Text style={styles.title}>{appAbout.name}</Text>
        <Text style={styles.description}>{appAbout.about}</Text>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionLabel}>VERSION</Text>
        <Text style={styles.version}>{appAbout.version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    gap: 16,
  },
  description: {
    color: '#C7D8EE',
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    lineHeight: 27,
    maxWidth: 360,
  },
  eyebrow: {
    color: '#67E8F9',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    letterSpacing: 1.8,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#10345F',
    borderColor: '#1E5B8E',
    borderRadius: 24,
    borderWidth: 1,
    height: 88,
    justifyContent: 'center',
    marginBottom: 8,
    width: 88,
  },
  screen: {
    backgroundColor: '#071A33',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 44,
    letterSpacing: -1.4,
  },
  version: {
    color: '#E0F2FE',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  versionContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  versionLabel: {
    color: '#7FA8D0',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 1.2,
  },
});