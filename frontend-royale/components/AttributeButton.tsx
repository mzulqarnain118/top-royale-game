import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import CustomText from "./CustomText";
import { Image as ExpoImage } from "expo-image";
import { labelTab, tabCount } from "@/utils/commonStyles";

type AttributeButtonType = {
    name?: string;
    value?: string | number
}

const AttributeButton: React.FC<AttributeButtonType> = ({ name, value }) => {
    return (
        <TouchableOpacity>
            <View style={styles.topWrapper}>
                <CustomText style={[labelTab, { top: -35 }]}>{name}</CustomText>
                <View>
                    <ExpoImage
                        source={require('../assets/images/theme/points-box.svg')}
                        style={{
                            width: moderateScale(100),
                            height: moderateScale(31),
                        }}
                        contentFit="cover"
                    />
                    <Text style={tabCount}>{value}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    themeBtn: {
        borderRadius: moderateScale(20)
    },
    topWrapper: {
        position: 'relative',
    }
});

export default AttributeButton;