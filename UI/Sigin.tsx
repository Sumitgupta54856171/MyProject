import * as Yup from 'yup';
import { View,Text,TextInput, Button,Alert, NativeModules,ActivityIndicator,TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stooreData } from '../Utils/storage';
import { useState,useEffect} from 'react';
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';

import BiometricToggle from './components/BiometricToggle';



const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const { BiomatericModule } = NativeModules;





const Sigin = ({navigation}: any) =>{
    const insets = useSafeAreaInsets()
    const [isSettingup,setisSettingup] = useState(false);
    console.log("check native module",BiomatericModule)
   useEffect(()=>{
    const checkBiometricSetup = async () => {
        try {
            const item = await AsyncStorage.getItem('biometricEnabled');
            const isEnabled = JSON.parse(item);
            if (isEnabled) {
                navigation.replace('Login');
            }else{
                console.log("Biometric not enabled");
            }
        } catch (error) {
            console.log("Error checking biometric setup", error);
        }
    }

    checkBiometricSetup();
})
      const enablebiometric = async () => {
        try {
            const result = await BiomatericModule.isBiometricAvailable();
            if (!result) {
                Alert.alert("Error", "Biometric is not available");
                await AsyncStorage.setItem('biometricEnabled', JSON.stringify(false));
        }else{
            setisSettingup(true);
        }
      }catch(error:any) {
                Alert.alert("Error", "Failed to check biometric availability",error);
            }
    }
   
    

    const handleSubmit = async (values: any) => {
try {
    await stooreData(values)
    .then(()=>{
        Alert.alert("Success", "User data saved successfully");
        navigation.replace('Login');
    })
}catch(error){
   Alert.alert("Error", "Failed to save user data");
   
}
}
    return (
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingTop: insets.top,backgroundColor: 'white',flex:1}}>
           <View style={{marginBottom: 20,padding:10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold',color:"black"}}>Create Account</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Sign up to get started with secure access</Text>
           </View>
           <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
           >
                {({ handleChange, handleBlur, values,handleSubmit ,errors}) => (
           <>           <View>
                           <TextInput value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')} placeholder="Name" style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 ,margin:10}} />

                        </View><View>
                            <TextInput value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="Email" style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10,margin:10 }} />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        </View><View>
                            <TextInput value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder="Password" secureTextEntry={true} style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10,margin:10 }} />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        </View><View>
                            <TextInput value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} placeholder="Confirm Password" secureTextEntry={true} style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10,margin:10 }} />
                            {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
                        </View>
                        <View>
                            
            <BiometricToggle isEnabled={isSettingup} toggleSwitch={enablebiometric} />
           
           <View>
              <TouchableOpacity style={{margin:10,backgroundColor:'#007BFF',padding:10,borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={handleSubmit}>
                <Text style={{color: 'white'}}>Sign Up</Text>
              </TouchableOpacity>
           </View>
                        </View>
                       
                        </>

        )}
           </Formik>
           
           <View>
            <Text>Already have an account?</Text><Button title="Sign In" onPress={() => navigation.navigate('Login')} />
           </View>
        </View>
    )
}

export default Sigin;