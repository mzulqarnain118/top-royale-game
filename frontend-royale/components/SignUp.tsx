import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, ScrollView, Animated, Alert, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { authScreensSubmitBtns, container, contentContainerStyle, errorMessage, gameTitle, inputField } from '@/utils/commonStyles';
import { backgroundGradient } from '@/utils/commonColors';
import CustomText from './CustomText';
import DefaultButton from './DefaultButton';
import { signup } from '@/services/api';
import { loadToken } from '@/services/store';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
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
        let tempErrors: { email?: string; password?: string; username?: string } = {};

        if (!username) {
            tempErrors.username = 'Username is required';
            valid = false;
        } else if (username.length > 20) {
            tempErrors.username = 'Username must be less then 20 characters';
            valid = false;
        }

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

    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            if (handleValidation()) {
                await signup(username, email, password);
                Alert.alert('Success', 'Signup successful! Please check your email to verify your account.');
                router.navigate("/login");
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
                <CustomText style={{ color: 'white', fontSize: 24 }}>Sign Up</CustomText>
                <View>
                    <TextInput
                        style={inputField}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.username && <CustomText style={errorMessage}>{errors.username}</CustomText>}
                </View>
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
                        <DefaultButton name="Sign Up" onPress={handleSignUp} />
                    )}
                    <CustomText style={{ color: 'white' }}>Continue as <Link href="/home" style={{ color: 'orange' }}>Guest</Link></CustomText>
                </View>
                <CustomText style={{ color: 'white' }}>Already have an account? <Link href="/login" style={{ color: 'orange' }}>Log In</Link></CustomText>
            </ScrollView>
        </LinearGradient>
    );
}

export default SignUp;
