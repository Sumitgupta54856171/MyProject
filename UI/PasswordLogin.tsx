import * as Yup from 'yup';
import { View,Text,TextInput, Button,Alert, NativeModules,ActivityIndicator,TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, stooreData } from '../Utils/storage';
import { useState,useEffect} from 'react';
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';

import BiometricToggle from './components/BiometricToggle';



const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6).required()
 
});

const { BiomatericModule } = NativeModules;





const PasswordLogin = ({navigation}: any) =>{
    const insets = useSafeAreaInsets()
   
    

   
    

    const handleSubmit = async (values: any) => {
try {
    const result =await getData()
    if(result == null){
        Alert.alert("Error", "No user data found, please sign up first");
        return;
    }
    if(result.email !== values.email || result.password !== values.password){
        Alert.alert("Error", "Invalid email or password");
        return;
     }
     navigation.replace('Home');
}catch(error){
   Alert.alert("Error", "Failed to login user");
   
}
}
    return (
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingTop: insets.top,backgroundColor: 'white',flex:1}}>
           <View style={{marginBottom: 20,padding:10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold',color:"black"}}>Login Account</Text>
            <Text style={{fontSize: 16, color: '#666'}}>Login up to get started with secure access</Text>
           </View>
           <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
           >
                {({ handleChange, handleBlur, values,handleSubmit ,errors}) => (
           <>        <View>
                            <TextInput value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="Email" style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10,margin:10 }} />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        </View><View>
                            <TextInput value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder="Password" secureTextEntry={true} style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10,margin:10 }} />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        </View>
                        <View>
                            
            
           
           <View>
              <TouchableOpacity style={{margin:10,backgroundColor:'#007BFF',padding:10,borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={handleSubmit}>
                <Text style={{color: 'white'}}>Login</Text>
              </TouchableOpacity>
           </View>
                        </View>
                       
                        </>

        )}
           </Formik>
            
        
        </View>
    )
}

export default PasswordLogin;