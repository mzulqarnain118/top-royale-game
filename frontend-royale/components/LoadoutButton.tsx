import { Foundation } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native"
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomText from "./CustomText";
import { buttonGradient } from "@/utils/commonColors";

type LoadoutButtonType = {
    IconComponent?: React.ReactNode,
    value?: number | string,
    loadoutButtonStyle?: StyleProp<ViewStyle>,
    text?: string
}

const LoadoutButton: React.FC<LoadoutButtonType> = ({ IconComponent, value, loadoutButtonStyle, text }) => {
    return (
        <View style={[styles.widgetButtonView, loadoutButtonStyle]}>
            <TouchableOpacity style={styles.widgetButton}>
                <LinearGradient 
                    colors={buttonGradient} 
                    style={{ 
                        width: '100%',
                        height: '100%', 
                        borderRadius: moderateScale(20), 
                        display: 'flex',
                        flexDirection: 'row',
                        gap: moderateScale(20),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} 
                    start={[0, 1]} 
                    end={[1, 0]}
                >
                    {IconComponent && (
                        <CustomText 
                            style={{ 
                                borderRadius: verticalScale(50),
                                backgroundColor: '#1cc433',
                                borderWidth: 1,
                                padding: 0,
                                height: verticalScale(30),
                                width: verticalScale(30),
                                borderColor: 'white',
                                textAlign: 'center',
                                textAlignVertical: 'center'
                            }}
                        >
                            {IconComponent}
                        </CustomText>
                    )}
                    {text ? <CustomText style={styles.loadoutText}>{text}</CustomText> : <Text style={styles.widgetButtonText}>{`$${value}`}</Text>}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    widgetButton: {},
    widgetButtonView: {
        width: verticalScale(120),
        maxHeight: verticalScale(50),
        borderWidth: 1,
        borderRadius: moderateScale(20),
        borderColor: 'white'
    },
    widgetButtonText: {
        fontSize: scale(26),
        color: 'white',
    },
    loadoutText: {
        padding: moderateScale(10),
        fontSize: scale(20),
        color: 'white',
        flex: 1,
        textAlign: 'center',
        flexWrap: 'wrap',
    }
})

export default LoadoutButton;
