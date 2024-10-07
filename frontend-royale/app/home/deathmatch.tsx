import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import { playerBoxes } from '@/constants/PlayerBoxes';
import LoadoutButton from '@/components/LoadoutButton';
import { MaterialCommunityIcons, MaterialIcons, Foundation, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import ToastNotification from '@/components/ToastNotification';
import { container, loadoutButton, loadoutIcon, loadoutIconBox } from '@/utils/commonStyles';
import { backgroundGradient } from '@/utils/commonColors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Image as ExpoImage } from "expo-image";
import ThemeButton from '@/components/ThemeButton';
import CustomText from '@/components/CustomText';

export default function DeathMatchScreen() {
    const [toastMessage, setToastMessage] = useState<string>('');

    const showToast = (message: string) => {
        setToastMessage(message);
    };

    const loadoutAttackDefense = [
        {
            id: 1,
            icon: <MaterialCommunityIcons name="shield-sword" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 2,
            icon: <Feather name="dollar-sign" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 3,
            icon: <Foundation name="shield" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 4,
            icon: <MaterialIcons name="airplanemode-active" size={scale(20)} color="white" />,
            value: 50
        }
    ];

    return (
        <>
            <LinearGradient colors={backgroundGradient} style={container}>
                <Header showToast={showToast} />
                <View style={styles.centerBoxes}>
                    {playerBoxes.map((box, index) => (
                        <TouchableOpacity style={styles.playerBox} key={index}>
                            <ExpoImage
                                source={require('../../assets/images/theme/player-box.svg')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                contentFit="contain"  // Adjust image fit within the view
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.loadoutButtonGroup}>
                    {loadoutAttackDefense.map((item: any, index: number) => (
                        <ThemeButton style={loadoutButton} key={index}>
                            <View style={loadoutIconBox}>
                                <CustomText style={loadoutIcon}>
                                    {item.icon}
                                </CustomText>
                                <Text style={{ fontSize: scale(26), color: 'white' }}>${item.value}</Text>
                            </View>
                        </ThemeButton>
                    ))}
                </View>
            </LinearGradient>
            {toastMessage && (
                <ToastNotification message={toastMessage} duration={3000} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    centerBoxes: {
        flex: 1,
        flexWrap: 'wrap',
        gap: scale(10), // Responsive gap
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    playerBox: {
        width: '17%',
        height: verticalScale(50), // Scaled height
    },
    loadoutButtonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10)
    }
});

