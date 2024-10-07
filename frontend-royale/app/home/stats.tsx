import CustomText from "@/components/CustomText";
import DefaultButton from "@/components/DefaultButton";
import ThemeButton from "@/components/ThemeButton";
import { reportsData } from "@/constants/ReportsData";
import { backgroundGradient } from "@/utils/commonColors";
import { container } from "@/utils/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

export default function StatsScreen() {
    return (
        <LinearGradient colors={backgroundGradient} style={container}>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <CustomText style={styles.statTitle}>XP</CustomText>
                    <Text style={styles.statValue}>603549</Text>
                </View>
                <View style={styles.statItem}>
                    <CustomText style={styles.statTitle}>Rank</CustomText>
                    <Text style={styles.statValue}>1</Text>
                </View>
                <View style={styles.statItem}>
                    <CustomText style={styles.statTitle}>XP to next rank</CustomText>
                    <Text style={styles.statValue}>123</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {reportsData.map((item, index) => {
                    return (
                        <View style={styles.reportRow} key={index}>
                            <View style={styles.reportCol}><CustomText style={styles.reportText}>{item.name}</CustomText></View>
                            <View style={styles.reportCol}><Text style={styles.reportText}>{item.isMoney ? `$${item.value}` : item.value}</Text></View>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.bottomButtons}>
                <ThemeButton href="/home/after-action-report">
                    Field Stats
                </ThemeButton>
                <ThemeButton href="/home">
                    Main Menu
                </ThemeButton>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'stretch',
    },
    statItem: {
        flex: 1,
    },
    statTitle: {
        fontSize: scale(30),
        lineHeight: scale(36),
        color: 'white',
        textAlign: 'center',
    },
    statValue: {
        fontSize: scale(30),
        color: 'white',
        textAlign: 'center',
        marginTop: 'auto'
    },
    scrollView: {
        width: '80%',
        maxHeight: '100%',
        flex: 1,
    },
    reportRow: {
        width: '100%',
        flexDirection: 'row',
        gap: moderateScale(20),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportCol: {},
    reportText: {
        fontSize: scale(26),
        color: 'white',
    },
    bottomButtons: {        
        gap: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
