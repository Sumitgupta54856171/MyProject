import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  NativeModules
} from 'react-native';
import { ChevronLeft, Fingerprint, Smile, ScanFace, Biohazard, User } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { BiomatericModule } = NativeModules;
import { getData } from '../Utils/storage';
const Login = ({ navigation }) => {
  
    useEffect(() =>{
        const checkBiometricSetup = async () => {
            try {
                const item = await AsyncStorage.getItem('biometricEnabled');
                
                const isEnabled = JSON.parse(item);
                if (!isEnabled) {
                    const value = await BiomatericModule.getBiometricMethod();
                    console.log("Biometric method from native module", value);
                    const item = await getData("userData");
                     const userinfo = {
                        name:item.name,
                        method:value,
                        loginData: new Date().toLocaleString()
                     }
                    await AsyncStorage.setItem('userInfo', JSON.stringify(userinfo));
                    navigation.replace('Home');

                }else{
                    console.log("Biometric enabled");
                }
            } catch (error) {
                console.log("Error checking biometric setup", error);
            }
        }

        checkBiometricSetup();
    })

     const handleBiometricSetup = async() => {
        
        try {
            const result = await BiomatericModule.isBiometricAvailable();
            if (!result) {
                Alert.alert("Error", "Biometric is not available");
            }  
            
            const success = await BiomatericModule.showBiometricPrompt("Set up biometric authentication", "Use your fingerprint or face to secure your account");
            if (success) {
                navigation.replace('Home')
                const value = BiomatericModule.getBiometricMethod();
                await AsyncStorage.setItem('method', value);
            } else {
                Alert.alert("Error", "Failed to set up biometric authentication");
            }

        }catch(error:any) {
                Alert.alert("Error", "Failed to check biometric availability",error);
            } finally{
                
            }
        }

     
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#111827" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SECURE LOGIN</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please verify your identity to continue</Text>

        {/* Biometric Graphic Container */}
        <View style={styles.graphicContainer}>
          {/* Outer Ring */}
          <View style={styles.outerRing}>
            {/* Inner Ring */}
            <View style={styles.innerRing}>
              <Fingerprint color="#1C77F2" size={60} strokeWidth={1.5} />
            </View>

            {/* Face ID Badge */}
            <View style={styles.faceIdBadge}>
              <Smile color="#1C77F2" size={20} strokeWidth={2} />
            </View>
          </View>
        </View>

        {/* Status Indicator */}
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Waiting for authentication...</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <ScanFace color="#FFFFFF" size={20} style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Login with Biometrics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6}>
            <Text style={styles.secondaryButtonText}>Login with Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Need help accessing your account?</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 60,
  },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  outerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#EBF3FF', // Light blue border
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#EBF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceIdBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#EBF3FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1C77F2',
    marginRight: 10,
  },
  statusText: {
    fontSize: 15,
    color: '#475569',
  },
  actionContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#1C77F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});

export default Login;