import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import CustomText from './CustomText';

type ToastNotificationType = {
    message?: string,
    duration?: number
}

const ToastNotification: React.FC<ToastNotificationType> = ({ message, duration }) => {
    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>
        if (message) {
          setVisible(true)
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start()

          timeoutId = setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              router.replace('/home/stats')
              setVisible(false)
            })
          }, duration || 3000) // Default duration is 3 seconds
        }

        return () => clearTimeout(timeoutId)
    }, [message]);

    if (!visible) {
        return null;
    }

    return (
        <Animated.View style={[styles.toast, { opacity }]}>
            <CustomText style={styles.toastText}>{message}</CustomText>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        width: '100%',
        position: 'absolute',
        top: '0%',
        bottom: '0%',
        left: '0%',
        right: '0%',
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    toastText: {
        color: '#fff',
        fontSize: 30,
    }
})

export default ToastNotification;