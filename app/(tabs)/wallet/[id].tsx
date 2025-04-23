import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Mail, Globe, Linkedin, Instagram, ArrowLeft, Share2, Trash2 } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// Sample cards data
const CARDS = [
  {
    id: '1',
    name: 'Sarah Wilson',
    title: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
    tags: ['Marketing', 'Tech'],
    socials: {
      phone: '+1234567890',
      email: 'sarah@techcorp.com',
      website: 'techcorp.com',
      linkedin: 'sarahwilson',
      instagram: '@sarahw',
    },
    notes: 'Met at TechConf 2024. Interested in collaboration on digital marketing initiatives.',
    location: 'San Francisco, CA',
    department: 'Marketing',
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Software Engineer',
    company: 'DevLabs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80',
    tags: ['Engineering', 'Software'],
    socials: {
      phone: '+1234567891',
      email: 'michael@devlabs.com',
      website: 'devlabs.com',
      linkedin: 'michaelchen',
      instagram: '@mikechen',
    },
    notes: 'Expert in React Native development. Potential technical advisor for mobile projects.',
    location: 'Seattle, WA',
    department: 'Engineering',
    languages: ['English', 'Mandarin'],
  },
];

export { CARDS };

export default function CardDetail() {
  const { id } = useLocalSearchParams();
  const card = CARDS.find((c) => c.id === id);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Card not found</Text>
      </View>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handleDelete = () => {
    // Implement delete functionality
    router.back();
  };

  const handleSocialPress = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'website':
        Linking.openURL(`https://${value}`);
        break;
      case 'linkedin':
        Linking.openURL(`https://linkedin.com/in/${value}`);
        break;
      case 'instagram':
        Linking.openURL(`https://instagram.com/${value.replace('@', '')}`);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Share2 size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
              <Trash2 size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn} style={styles.profileSection}>
          <Image source={{ uri: card.image }} style={styles.profileImage} />
          <Text style={styles.name}>{card.name}</Text>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.company}>{card.company}</Text>

          <View style={styles.tags}>
            {card.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSocialPress('phone', card.socials.phone)}
            >
              <Phone size={24} color="#007AFF" />
              <Text style={styles.contactLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSocialPress('email', card.socials.email)}
            >
              <Mail size={24} color="#007AFF" />
              <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSocialPress('website', card.socials.website)}
            >
              <Globe size={24} color="#007AFF" />
              <Text style={styles.contactLabel}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSocialPress('linkedin', card.socials.linkedin)}
            >
              <Linkedin size={24} color="#007AFF" />
              <Text style={styles.contactLabel}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleSocialPress('instagram', card.socials.instagram)}
            >
              <Instagram size={24} color="#007AFF" />
              <Text style={styles.contactLabel}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{card.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{card.department}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Languages</Text>
            <Text style={styles.infoValue}>{card.languages.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notes}>{card.notes}</Text>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
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
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
  },
  notes: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    lineHeight: 24,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 24,
  },
});
