import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { inputField } from '@/utils/commonStyles';
import { moderateScale, scale } from 'react-native-size-matters';

type CountryPickerFieldProps = {
    selectedCountry: string;
    setSelectedCountry: (country: string) => void;
}

const CountryPickerField: React.FC<CountryPickerFieldProps> = ({ selectedCountry, setSelectedCountry }) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch countries from REST Countries API
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const countryData = response.data.map((country: any) => ({
                    label: country.name.common,
                    value: country.cca2, // Country code
                }));
                setCountries(countryData);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    // if (loading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //             <Text>Loading countries...</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={[inputField]}>
            <RNPickerSelect
                onValueChange={(value: any) => setSelectedCountry(value)}
                items={countries.sort((a: any, b: any) => a.label.localeCompare(b.label))}
                style={pickerSelectStyles}
                placeholder={{
                    label: "",
                    value: "",
                    color: 'black'
                }}
                value={selectedCountry}
                Icon={() => null}
                useNativeAndroidPickerStyle={false}
            />
            {/* <Text style={styles.selection}>Selected Country: {selectedCountry || 'None'}</Text> */}
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 4,
        color: 'black',
        minHeight: scale(60),
    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 4,
        color: 'black',
        minHeight: scale(60),
    }
});

export default CountryPickerField;
