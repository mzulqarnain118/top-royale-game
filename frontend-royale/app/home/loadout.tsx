import CustomText from "@/components/CustomText";
import DefaultButton from "@/components/DefaultButton";
import LoadoutButton from "@/components/LoadoutButton";
import ThemeButton from "@/components/ThemeButton";
import { chooseYourLoadout } from "@/constants/LoadoutsData";
import { backgroundGradient } from "@/utils/commonColors";
import { container, loadoutButton, loadoutButtonText, loadoutIcon, loadoutIconBox, themeButtonText } from "@/utils/commonStyles";
import { Entypo, Feather, FontAwesome6, Foundation, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Image as ExpoImage } from "expo-image";

export default function LoadoutScreen() {
    const loadoutAttackDefense = [
        {
            id: 1,
            icon: <Foundation name="shield" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 2,
            icon: <MaterialCommunityIcons name="shield-sword" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 3,
            icon: <Feather name="dollar-sign" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 4,
            icon: <Foundation name="shield" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 5,
            icon: <MaterialIcons name="airplanemode-active" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 6,
            icon: <Entypo name="heart" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 7,
            icon: <FontAwesome6 name="grip-lines-vertical" size={scale(20)} color="white" />,
            value: 50
        },
        {
            id: 8,
            icon: <Feather name="wifi" size={scale(20)} color="white" />,
            value: 50
        }
    ];

    const handleBackToHome = () => {
        router.navigate("/home");
    };

    return (
        <LinearGradient colors={backgroundGradient} style={container}>
            <Text style={{ height: scale(20), marginRight: 'auto' }} onPress={handleBackToHome}>
                <ExpoImage
                    source={require('../../assets/images/theme/Back.svg')}
                    style={{
                        width: scale(45),
                        height: scale(45)
                    }}
                    contentFit="contain"
                />
            </Text>
            <ScrollView contentContainerStyle={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <View style={styles.headerContainer}>
                    <CustomText style={styles.headerText}>Choose your loadout</CustomText>
                </View>
                <View style={styles.loadoutButtonGroup}>
                    {chooseYourLoadout.map((item: any, index) => (
                        <ThemeButton style={loadoutButton} key={index}>
                            <CustomText style={loadoutButtonText}>{item.name}</CustomText>
                        </ThemeButton>
                    ))}
                </View>
                <ThemeButton href="/home/stats">
                    Stats
                </ThemeButton>
                <View style={[styles.headerContainer, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <CustomText style={styles.headerText}>Attack</CustomText>
                    <CustomText style={styles.headerText}>Defense</CustomText>
                </View>
                <View style={styles.loadoutButtonGroup}>
                    {loadoutAttackDefense.map((item: any, index) => (
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
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: scale(46),
        lineHeight: scale(60)
    },
    loadoutButtonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10),
        padding: moderateScale(10),
        borderRadius: moderateScale(20),
        borderWidth: moderateScale(1),
        borderColor: 'white',
    }
});
