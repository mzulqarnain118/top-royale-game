import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import { useEffect, useState } from "react";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import CustomText from "./CustomText";
import AttributeButton from "./AttributeButton";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { clearToken, loadUser } from "@/services/store";
import { Image as ExpoImage } from "expo-image";
import { labelTab, tabCount } from "@/utils/commonStyles";
import { router } from "expo-router";

type HeaderType = {
    showToast?: (message: string) => void
}

export default function Header({ showToast }: HeaderType) {
    const { name: routeName } = useRoute();
    const isDeathMatch = routeName === "home/deathmatch";
    const isIndex = routeName === "home/index";
    const [timeLeft, setTimeLeft] = useState(5 * 60);

    useEffect(() => {
        if (isDeathMatch) {
            if (timeLeft <= 0 && showToast) {
                showToast("Game Over!!")
                return;
            }

            const intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timeLeft]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleLogout = () => {
        router.navigate("/home");
        // const user: any = await loadUser();
        // if (user) {
        //     Alert.alert(JSON.parse(user)?.username, "Are you sure you want to logout", [
        //         {
        //             text: 'Cancel',
        //             onPress: () => console.log('Cancel Pressed'),
        //             style: 'cancel',
        //         },
        //         {
        //             text: 'OK',
        //             onPress: async () => {
        //                 await clearToken()
        //             }
        //         },
        //     ])
        // } else {
        //     await clearToken();
        // }
    }

    return (
        <View style={styles.topHeaderButtons}>
            <View style={{ gap: 15 }}>
                <AttributeButton name="K" value={2155} />
                {!isIndex && (
                    <>
                        <AttributeButton name="A" value={2155} />
                        <AttributeButton name="D" value={2155} />
                    </>
                )}
            </View>
            {!isIndex && (
                <View style={{ alignItems: 'center' }}>
                    <CustomText style={styles.rankBoxTitle}>Rank</CustomText>
                    <Text style={styles.rankBoxNumber}>25</Text>
                    {isDeathMatch && (
                        <Text style={{ fontSize: scale(30), color: 'white' }}>{formatTime(timeLeft)}</Text>
                    )}
                </View>
            )}
            {isIndex && (
                <View>
                    <ExpoImage
                        source={require('../assets/images/logo.svg')}
                        style={{
                            width: scale(60),
                            height: scale(60),
                            marginTop: scale(40)
                        }}
                        contentFit="contain"  // Adjust image fit within the view
                    />
                </View>
            )}
            <View style={{ gap: 15 }}>
                <TouchableOpacity>
                    <View style={styles.topWrapper}>
                        <ExpoImage
                            source={require('../assets/images/theme/dollar-icon.svg')}
                            style={[labelTab, {
                                width: moderateScale(40),
                                height: moderateScale(40)
                            }]}
                            contentFit="cover"
                        />
                        <View>
                            <ExpoImage
                                source={require('../assets/images/theme/dollar-box.svg')}
                                style={{
                                    width: moderateScale(100),
                                    height: moderateScale(30),
                                }}
                                contentFit="cover"
                            />
                            <Text style={tabCount}>2155</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {isIndex && (
                    <Text style={{ marginTop: 10, marginLeft: 'auto' }} onPress={handleLogout}>
                        <ExpoImage
                            source={require('../assets/images/theme/logout.svg')}
                            style={{
                                width: scale(45),
                                height: scale(45)
                            }}
                            contentFit="contain"  // Adjust image fit within the view
                        />
                    </Text>
                )}
                {!isIndex && (
                    <TouchableOpacity>
                        <View style={styles.topWrapper}>
                            <ExpoImage
                                source={require('../assets/images/theme/health-blue-icon.svg')}
                                style={[labelTab, {
                                    width: moderateScale(40),
                                    height: moderateScale(40)
                                }]}
                                contentFit="cover"
                            />
                            <View>
                                <ExpoImage
                                    source={require('../assets/images/theme/health-blue-box.svg')}
                                    style={{
                                        width: moderateScale(104),
                                        height: moderateScale(30),
                                    }}
                                    contentFit="cover"
                                />
                                <Text style={tabCount}>100</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rankBoxTitle: {
        fontSize: scale(35),
        lineHeight: scale(35),
        color: 'white'
    },
    rankBoxNumber: {
        fontSize: scale(45),
        lineHeight: scale(50),
        color: 'white'
    },
    topHeaderButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    themeBtn: {
        borderRadius: moderateScale(20)
    },
    topWrapper: {
        position: 'relative'
    },
    rightPointsTab: {
        borderRadius: 50,
        backgroundColor: '#1cc433',
        borderWidth: 1,
        padding: 0,
        width: verticalScale(26),
        height: verticalScale(26),
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: 'white'
    }
});
