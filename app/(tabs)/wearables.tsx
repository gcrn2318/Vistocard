import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Nfc, ShoppingBag, ChevronRight, Plus } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const WEARABLES = [
  {
    id: '1',
    name: 'Smart Ring',
    status: 'Connected',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&q=80',
  },
  {
    id: '2',
    name: 'NFC Bracelet',
    status: 'Connected',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&q=80',
  },
];

export default function WearablesScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Wearables</Text>
        <Text style={styles.headerSubtitle}>Manage your smart devices</Text>

        <TouchableOpacity style={styles.shopButton}>
          <ShoppingBag size={24} color="#fff" />
          <Text style={styles.shopButtonText}>Shop Devices</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn} style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          
          {WEARABLES.map((device) => (
            <TouchableOpacity key={device.id} style={styles.deviceCard}>
              <Image source={{ uri: device.image }} style={styles.deviceImage} />
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{device.status}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addDeviceButton}>
            <Plus size={24} color="#007AFF" />
            <Text style={styles.addDeviceText}>Add New Device</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>NFC Settings</Text>
          <View style={styles.settingCard}>
            <Nfc size={24} color="#fff" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>NFC Status</Text>
              <Text style={styles.settingSubtitle}>Tap to toggle NFC</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleDot} />
            </View>
          </View>
        </Animated.View>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>How to Share</Text>
          <View style={styles.demoCard}>
            <Text style={styles.demoText}>
              Tap your wearable device against another phone to instantly share your digital card
            </Text>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1622782262245-bfb660f4ff93?w=400&h=400&q=80' }}
              style={styles.demoImage}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    marginBottom: 24,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  shopButtonText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  deviceImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  deviceName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#4CAF50',
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginTop: 12,
  },
  addDeviceText: {
    color: '#007AFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#999',
  },
  toggle: {
    width: 48,
    height: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  demoSection: {
    marginTop: 8,
  },
  demoTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 16,
  },
  demoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  demoText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    marginBottom: 16,
    lineHeight: 24,
  },
  demoImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});