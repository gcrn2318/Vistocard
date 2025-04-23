import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, User, Building2, Briefcase, Phone, Mail, Globe, Linkedin, Instagram, ArrowRight } from 'lucide-react-native';
import { CameraView } from 'expo-camera';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function AddScreen() {
  const [showCamera, setShowCamera] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    linkedin: '',
    instagram: '',
  });

  const handleSave = () => {
    // TODO: Implement save logic
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera}>
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>Position the card within the frame</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Add New Card</Text>
        <Text style={styles.headerSubtitle}>Scan or manually enter details</Text>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setShowCamera(true)}
        >
          <Camera size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Scan Business Card</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn} style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <User size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Building2 size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Company"
              placeholderTextColor="#999"
              value={formData.company}
              onChangeText={(text) => setFormData({ ...formData, company: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Briefcase size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Job Title"
              placeholderTextColor="#999"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Globe size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Website"
              placeholderTextColor="#999"
              value={formData.website}
              onChangeText={(text) => setFormData({ ...formData, website: text })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Linkedin size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="LinkedIn Username"
              placeholderTextColor="#999"
              value={formData.linkedin}
              onChangeText={(text) => setFormData({ ...formData, linkedin: text })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Instagram size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Instagram Handle"
              placeholderTextColor="#999"
              value={formData.instagram}
              onChangeText={(text) => setFormData({ ...formData, instagram: text })}
              autoCapitalize="none"
            />
          </View>
        </Animated.View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Card</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
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
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  form: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
  },
  cameraText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  cancelButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 48,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});