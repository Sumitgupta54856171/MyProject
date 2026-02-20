import React, { useEffect,useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  NativeModules,
  Platform
} from 'react-native';
import { ChevronLeft, Fingerprint, Smile, ScanFace, Biohazard, User } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { BiomatericModule } = NativeModules;
import { getData } from '../Utils/storage';
import PasswordLogin from './PasswordLogin';

const Login = ({ navigation }) => {
  const [passwordlogin, setPasswordLogin] = useState(false);
   

     const handleBiometricSetup = async() => {
        
        try {
            const item = await AsyncStorage.getItem('biometricEnableds');
             const value =await BiomatericModule.getBiometricMethod();
             const userInfo = {
                method:value,
                loggingdate: new Date().toISOString()
             }
             await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
             if (item === null) {
                Alert.alert("Error", "Biometric is not available");
                await AsyncStorage.setItem('biometricEnableds', JSON.stringify(false));
                return;
             }
             const isEnabled = JSON.parse(item);
             console.log("Biometric enabled status:", isEnabled);
           
            if (!isEnabled) {
                Alert.alert("Error", "Biometric is not available");
            }  
            if(Platform.OS === 'ios'){
              setTimeout(async () => {
                
             
               const success = await BiomatericModule.showBiometricPrompt("Set up biometric authentication", "Use your fingerprint or face to secure your account");
            if (success) {
                navigation.replace('Home')
                const value = BiomatericModule.getBiometricMethod();
                await AsyncStorage.setItem('method', value);
            } else {
                Alert.alert("Error", "Failed to set up biometric authentication");
            }
            }, 400);
            }
            setTimeout(async () => {
            
                const success = await BiomatericModule.showBiometricPrompt("Set up biometric authentication", "Use your fingerprint or face to secure your account");
            if (success) {
                navigation.replace('Home')
                const value = BiomatericModule.getBiometricMethod();
                await AsyncStorage.setItem('method', value);
            } else {
                Alert.alert("Error", "Failed to set up biometric authentication");
            }
            }, 400);
            

        }catch(error:any) {
                Alert.alert("Error", "Failed to check biometric availability",error);
            } 
        }
        
const handlePasswordLogin = () => {
    setPasswordLogin(true);
}
     
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        {passwordlogin ? (<PasswordLogin navigation={navigation} /> ):(<>
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
           
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleBiometricSetup}>
            <ScanFace color="#FFFFFF" size={20} style={styles.buttonIcon}  />
            <Text style={styles.primaryButtonText}>Login with Biometrics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6} onPress={handlePasswordLogin}>
            <Text style={styles.secondaryButtonText}>Login with Password</Text>
          </TouchableOpacity>
        </View>
        </>)}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text>Create a account?</Text><TouchableOpacity title="Login" onPress={() => navigation.navigate('SignUp')} style={{margin:10,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center'}}><Text style={{color: 'blue'}}>Sign Up</Text></TouchableOpacity>
           </View>
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