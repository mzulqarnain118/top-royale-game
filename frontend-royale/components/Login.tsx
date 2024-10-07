import { authScreensSubmitBtns, container, contentContainerStyle, errorMessage, gameTitle, inputField } from '@/utils/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import DefaultButton from './DefaultButton';
import { backgroundGradient } from '@/utils/commonColors';
import CustomText from './CustomText';
import { login } from '@/services/api';
import { loadToken, storeToken, storeUser } from '@/services/store';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await loadToken();
            if (token) {
                router.navigate("/home");
            }
        };
        fetchToken();
    }, []);
    
    const validateEmail = (email: string) => {
        // Basic email validation regex
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    };

    const handleValidation = () => {
        let valid = true;
        let tempErrors: { email?: string; password?: string } = {};

        if (!email) {
            tempErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            tempErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!password) {
            tempErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            if (handleValidation()) {
                // Proceed with form submission
                const response: any = await login(email, password);
                console.log(response.data, "response");
                if (response.status === 200 && response.data.token) {
                    await storeToken(response.data.token);
                    await storeUser(response.data.user);
                }
                router.navigate("/home");
                setIsLoading(false);
            }
        } catch (error: any) {
            setIsLoading(false);
            Alert.alert('Error', error?.response?.data?.error || 'Invalid credentials');
        }
    };

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <LinearGradient colors={backgroundGradient} style={{ ...container, alignItems: 'stretch' }}>
            <ScrollView contentContainerStyle={contentContainerStyle}>
                <CustomText style={gameTitle}>Tap Royale</CustomText>
                <CustomText style={{ color: 'white', fontSize: 24 }}>Log In</CustomText>
                <View>
                    <TextInput
                        style={inputField}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <CustomText style={errorMessage}>{errors.email}</CustomText>}
                </View>
                <View>
                    <TextInput
                        style={inputField}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <CustomText style={errorMessage}>{errors.password}</CustomText>}
                </View>
                <View style={authScreensSubmitBtns}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <DefaultButton name="Log In" onPress={handleLogin} />
                    )}
                    <CustomText style={{ color: 'white' }}>Continue as <Link href="/home" style={{ color: 'orange' }}>Guest</Link></CustomText>
                </View>
                <CustomText style={{ color: 'white' }}>Create an account? <Link href="/" style={{ color: 'orange' }}>Sign Up</Link></CustomText>
            </ScrollView>
        </LinearGradient>
    )
};

export default Login;
