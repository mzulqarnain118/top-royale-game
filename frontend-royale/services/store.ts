import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const storeUser = async (user: any) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const loadToken = async () => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
};

export const loadUser = async () => {
    try {
        return await AsyncStorage.getItem('user');
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
}

export const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      router.navigate("/signupform")
    } catch (error) {
      console.error('Error clearing token:', error);
    }
};

