import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomText from "./CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundGradient, bgGradientForPlayerBox, buttonGradient } from "@/utils/commonColors";
import { container, contentContainerStyle, gameTitle } from "@/utils/commonStyles";
import { moderateScale } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { loadToken } from "@/services/store";
import { Link, router } from "expo-router";
import { Image as ExpoImage } from 'expo-image';

const Welcome = () => {
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        // if (!isNavigating) {
            const loadTokenAsync = async () => {
                const token = await loadToken();
                if (token) {
                    router.navigate("/home");
                } else {
                    router.navigate("/home");
                }
                // setIsNavigating(true); // Update state after navigation
            };
            setTimeout(() => {
                loadTokenAsync();
            }, 2000);
        // }
    }, []);

    return (
        <LinearGradient colors={backgroundGradient} style={{ ...container, alignItems: 'stretch' }}>
            <ScrollView contentContainerStyle={{ ...contentContainerStyle, alignItems: 'center', gap: 0 }}>
                <CustomText style={[gameTitle, { paddingBottom: 0 }]}>WELCOME</CustomText>
                <CustomText style={[gameTitle, { paddingBottom: 0 }]}>TO</CustomText>
                <CustomText style={[gameTitle, { paddingBottom: 0 }]}>ROYALE</CustomText>
                <ExpoImage
                    source={require('../assets/images/logo.svg')}
                    style={{
                        width: 100,
                        height: 100,
                        marginTop: 30
                    }}
                    contentFit="contain"  // Adjust image fit within the view
                />
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    logoBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 130,
        borderRadius: moderateScale(20),
        borderWidth: 2,
        borderColor: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: 30
    },
    logoContainer: {
        // flex: 1,
        // backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100
        // backgroundColor: '#0553',
    },
});

export default Welcome;