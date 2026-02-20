import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { Fingerprint } from 'lucide-react-native';

const BiometricToggle = ({isEnabled, toggleSwitch}) => {
  return (
    <View style={[styles.container, {marginBottom: 20}]}>
      <TouchableOpacity 
        style={[styles.card]} 
        activeOpacity={0.7} 
        onPress={toggleSwitch}
      >
        {/* Left Icon Container */}
        <View style={styles.iconBackground}>
          <Fingerprint color="#4A90E2" size={28} strokeWidth={1.5} />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Enable Biometric Login</Text>
          <Text style={styles.subtitle}>
            Use Face ID or Fingerprint for faster access
          </Text>
        </View>

        {/* Toggle Switch */}
        <Switch
          trackColor={{ false: '#E0E6ED', true: '#4A90E2' }}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#E0E6ED"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F9FF', // Light blueish tint from your image
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2, // Shadow for Android
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Takes up remaining space between icon and switch
    marginLeft: 16,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B48',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#7B8DAB',
    lineHeight: 18,
  },
});

export default BiometricToggle;