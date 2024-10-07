import { backgroundGradient } from "@/utils/commonColors";
import { authScreensSubmitBtns, container, contentContainerStyle, errorMessage, gameTitle, inputField } from "@/utils/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Alert, Animated, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import CustomText from "./CustomText";
import DefaultButton from "./DefaultButton";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { loadToken } from "@/services/store";
import CountryPickerField from "./CountryPickerField";
import { moderateScale, scale } from "react-native-size-matters";
import BorderedText from "./BorderedText";
import ThemeButton from "./ThemeButton";
import { signuptaproyale } from "@/services/api";

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState<{ username?: string; country?: string }>({});
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

    useEffect(() => {
        if (errors.username || errors.country) {
            handleValidation();
        }
    }, [username, country]);

    const handleValidation = () => {
        let valid = true;
        let tempErrors: { username?: string; country?: string } = {};

        if (!username) {
            tempErrors.username = 'Username is required';
            valid = false;
        } else if (username.length > 20) {
            tempErrors.username = 'Username must be less then 20 characters';
            valid = false;
        }

        if (!country) {
            tempErrors.country = 'Country is required';
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            if (handleValidation()) {
                // const response = await signuptaproyale(username, country);
                // console.log(response, "res");
                // Alert.alert('Success', 'Signup successful! Please check your email to verify your account.');
                router.navigate("/signupform");
            }
            setIsLoading(false);
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
            <ScrollView 
                contentContainerStyle={contentContainerStyle}>
                <View>
                    {/* <BorderedText text="CREATE USERNAME" /> */}
                    <CustomText 
                        style={{ 
                            fontSize: scale(55), 
                            color: 'white', 
                            textAlign: 'center', 
                            paddingBottom: moderateScale(20), 
                        }}>
                        CREATE USERNAME
                    </CustomText>
                    <TextInput
                        style={inputField}
                        placeholder=""
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.username && <CustomText style={errorMessage}>{errors.username}</CustomText>}
                </View>
                <SafeAreaView>
                    <CustomText 
                        style={{ 
                            fontSize: scale(55), 
                            color: 'white', 
                            textAlign: 'center', 
                            paddingBottom: moderateScale(20), 
                        }}>
                        CHOOSE COUNTRY
                    </CustomText>
                    <CountryPickerField selectedCountry={country} setSelectedCountry={setCountry} />
                    {errors.country && <CustomText style={errorMessage}>{errors.country}</CustomText>}
                </SafeAreaView>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <View style={{ marginHorizontal: 'auto' }}><ThemeButton onPress={handleSignUp}>Get Started</ThemeButton></View>
                )}
            </ScrollView>
        </LinearGradient>
    )
}

export default SignUpForm;

