import { LinearGradient } from "expo-linear-gradient";
import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import { buttonGradient } from "@/utils/commonColors";

type DefaultButtonType = {
  href?: Href<string | object>;
  name?: string;
  onPress?: () => void;
};

const DefaultButton: React.FC<DefaultButtonType> = ({
  href,
  name,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      {href ? (
        <Link
          href={href}
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          <LinearGradient
            colors={buttonGradient}
            style={{
              ...styles.actionButtonView,
              minWidth: href ? moderateScale(180) : "auto",
            }}
            start={[0, 1]}
            end={[1, 0]}
          >
            <CustomText style={styles.actionButtonText} weight="Bold">
              {name}
            </CustomText>
          </LinearGradient>
        </Link>
      ) : (
        <LinearGradient
          colors={buttonGradient}
          style={{
            ...styles.actionButtonView,
            minWidth: href ? moderateScale(180) : "auto",
          }}
          start={[0, 1]}
          end={[1, 0]}
        >
          <CustomText style={styles.actionButtonText} weight="Bold">
            {name}
          </CustomText>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButtonText: {
    fontSize: scale(30), // Scaled font size
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
    // paddingVertical: 2,
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
    // paddingLeft: moderateScale(20),
    // paddingRight: moderateScale(20),
    lineHeight: 20,
    // backgroundColor: "red",
  },
  actionButtonView: {
    width: "100%",
    paddingVertical: verticalScale(11),
    borderRadius: moderateScale(10), // Scaled border radius
    borderWidth: 2,
    borderColor: "white",
    // flex: 1, // why used this
  },
  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: verticalScale(60), // Scaled max height
  },
});

export default DefaultButton;
