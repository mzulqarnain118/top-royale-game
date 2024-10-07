import CustomText from "@/components/CustomText";
import DefaultButton from "@/components/DefaultButton";
import ThemeButton from "@/components/ThemeButton";
import { afterActionReports } from "@/constants/AfterActionReports";
import { backgroundGradient } from "@/utils/commonColors";
import { container } from "@/utils/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function AfterActionReportScreen() {
    return (
        <LinearGradient colors={backgroundGradient} style={container}>
            <CustomText style={styles.title}>After Action Report</CustomText>
            <ScrollView horizontal>
                <View style={styles.headerRow}>
                    <CustomText style={[styles.headerCell, styles.firstCell]} weight="Bold">ID</CustomText>
                    <CustomText style={[styles.headerCell, styles.nameCell]}></CustomText>
                    <CustomText style={[styles.headerCell]} weight="Bold">Kills</CustomText>
                    <CustomText style={[styles.headerCell]} weight="Bold">Assists</CustomText>
                    <CustomText style={[styles.headerCell]} weight="Bold">Deaths</CustomText>
                    <CustomText style={[styles.headerCell]} weight="Bold">Money</CustomText>
                </View>
            </ScrollView>
            <ScrollView horizontal>
                <ScrollView style={styles.scrollView}>
                    <View>
                        {afterActionReports.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={[styles.tableCell, styles.firstCell]}>{index + 1}</Text>
                                <CustomText style={[styles.tableCell, styles.nameCell]}>{item.name}</CustomText>
                                <Text style={styles.tableCell}>{item.kills}</Text>
                                <Text style={styles.tableCell}>{item.assists}</Text>
                                <Text style={styles.tableCell}>{item.deaths}</Text>
                                <Text style={styles.tableCell}>{item.money}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
            <View style={styles.bottomButtons}>
                <ThemeButton href="/home/stats">
                    Personal Stats
                </ThemeButton>
                <ThemeButton href="/home">
                    Main Menu
                </ThemeButton>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: scale(40), // Responsive font size
        textAlign: 'center',
        color: 'white',
    },
    headerRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: verticalScale(40), // Responsive height
        flex: 1,
    },
    scrollView: {
        maxHeight: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        flex: 1,
        maxHeight: '100%',
        gap: 2
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(50), // Responsive width
        paddingBottom: verticalScale(16), // Responsive padding
        fontSize: moderateScale(16), // Responsive font size
        color: 'white',
    },
    headerCell: {
        fontSize: moderateScale(24), // Responsive font size
        color: 'white',
        width: scale(55), // Responsive width
        textAlign: 'center',
        flex: 1,
    },
    firstCell: {
        width: '100%',
        textAlign: 'left',
        verticalAlign: 'middle'
    },
    nameCell: {
        width: scale(70),
        fontSize: scale(24), // Responsive font size
        lineHeight: scale(28)
    },
    bottomButtons: {        
        gap: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
