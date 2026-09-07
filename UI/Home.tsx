import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NavigationProp } from '@react-navigation/native';
import {
  Smile,
  Mail,
  Edit2,
  LogOut,
  Trash2,
  Home,
  Fingerprint,
  Settings,
  CheckCircle2,
} from 'lucide-react-native';
import { getData } from '../Utils/storage';

type UserData = { name: string; email: string };
type UserInfo = { method: string; loggingdate: string };

const Homescreen = ({ navigation }: { navigation: NavigationProp }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [method, setmethod] = useState<UserInfo | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const item = await getData();
        const info: string | null = await AsyncStorage.getItem('userInfo');
        if (item == null) {
          navigation.replace('SignUp');
          return;
        }
        setUserData(item);
        setmethod(info ? JSON.parse(info) : null);
      } catch (error) {
        console.log('Error loading user data', error);
      }
    };
    checkUser();
  }, []);

  const handledelete = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('biometricEnabled');
      navigation.replace('SignUp');
      Alert.alert('Success', 'User data deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user data');
    }
  };

  const handlelogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Avatar Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
            <View style={styles.badgeContainer}>
              <CheckCircle2 color="#22C55E" fill="#FFFFFF" size={24} />
            </View>
          </View>
          <Text style={styles.greetingTitle}>
            Welcome back, {userData?.name || 'User'}
          </Text>
          <Text style={styles.greetingSubtitle}>
            Manage your secure identity
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.card, styles.biometricCard]}
            activeOpacity={0.7}>
            <View style={styles.cardIconContainer}>
              <Smile color="#1C77F2" size={24} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>LOGIN METHOD</Text>
              <Text style={styles.cardValue}>
                Biometric ({method?.method})
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <CheckCircle2 color="#22C55E" size={20} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View
              style={[styles.cardIconContainer, { backgroundColor: '#F1F5F9' }]}>
              <Mail color="#475569" size={24} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>EMAIL ADDRESS</Text>
              <Text style={styles.cardValue}>
                {userData?.email || 'john.doe@example.com'}
              </Text>
            </View>
            <Edit2 color="#94A3B8" size={18} />
          </TouchableOpacity>

          {/* Last login timestamp */}
          {method?.loggingdate && (
            <View style={styles.lastLoginContainer}>
              <Text style={styles.lastLoginLabel}>Last login</Text>
              <Text style={styles.lastLoginTime}>
                {new Date(method.loggingdate).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handlelogout}
            activeOpacity={0.7}>
            <LogOut color="#EF4444" size={20} style={styles.buttonIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handledelete}
            activeOpacity={0.8}>
            <Trash2 color="#FFFFFF" size={20} style={styles.buttonIcon} />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 2.4.0 (Build 202)</Text>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavIconBg}>
            <Home color="#1C77F2" size={24} />
          </View>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
            <Fingerprint color="#FFFFFF" size={28} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navItem}>
          <Settings color="#94A3B8" size={24} style={{ marginBottom: 4 }} />
          <Text style={styles.inactiveNavText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1C77F2',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#64748B',
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  biometricCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  verifiedBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  lastLoginLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  lastLoginTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  actionButtons: {
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  activeNavIconBg: {
    backgroundColor: '#EBF3FF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },
  activeNavText: {
    fontSize: 12,
    color: '#1C77F2',
    fontWeight: '600',
  },
  inactiveNavText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  fabContainer: {
    position: 'relative',
    top: -25,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Homescreen;
