import AsyncStorage from '@react-native-async-storage/async-storage';


const stooreData = async (value: any) => {
    try {
        const userData = {
            name: value.name,
            email: value.email,
            password: value.password
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.log(error);
    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }
}

export { stooreData, getData };