import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any) => {
    const userData = {
        name: value.name,
        email: value.email,
        password: value.password,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
};

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { storeData, getData };
