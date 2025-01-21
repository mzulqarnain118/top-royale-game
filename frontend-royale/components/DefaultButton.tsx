import { LinearGradient } from "expo-linear-gradient";
import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
<<<<<<< HEAD
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
=======
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
>>>>>>> origin/develop
import CustomText from "./CustomText";
import { buttonGradient } from "@/utils/commonColors";

type DefaultButtonType = {
<<<<<<< HEAD
    href?: Href<string | object>,
    name?: string,
    onPress?: () => void
}
=======
  href?: Href<string | object>;
  name?: string;
  onPress?: () => void;
};
>>>>>>> origin/develop

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
<<<<<<< HEAD
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
=======
            width: "100%",
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
>>>>>>> origin/develop
          }}
        >
          <LinearGradient
            colors={buttonGradient}
            style={{
              ...styles.actionButtonView,
<<<<<<< HEAD
              minWidth: href ? moderateScale(180) : 'auto',
=======
              minWidth: href ? moderateScale(180) : "auto",
>>>>>>> origin/develop
            }}
            start={[0, 1]}
            end={[1, 0]}
          >
<<<<<<< HEAD
            <CustomText style={styles.actionButtonText} weight='Bold'>
=======
            <CustomText style={styles.actionButtonText} weight="Bold">
>>>>>>> origin/develop
              {name}
            </CustomText>
          </LinearGradient>
        </Link>
      ) : (
        <LinearGradient
          colors={buttonGradient}
          style={{
            ...styles.actionButtonView,
<<<<<<< HEAD
            minWidth: href ? moderateScale(180) : 'auto',
=======
            minWidth: href ? moderateScale(180) : "auto",
>>>>>>> origin/develop
          }}
          start={[0, 1]}
          end={[1, 0]}
        >
<<<<<<< HEAD
          <CustomText style={styles.actionButtonText} weight='Bold'>
=======
          <CustomText style={styles.actionButtonText} weight="Bold">
>>>>>>> origin/develop
            {name}
          </CustomText>
        </LinearGradient>
      )}
    </TouchableOpacity>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> origin/develop

const styles = StyleSheet.create({
  actionButtonText: {
    fontSize: scale(30), // Scaled font size
<<<<<<< HEAD
    color: 'white',
    textAlign: 'center',
=======
    color: "white",
    textAlign: "center",
>>>>>>> origin/develop
    paddingHorizontal: 20,
    // paddingVertical: 2,
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
    // paddingLeft: moderateScale(20),
    // paddingRight: moderateScale(20),
<<<<<<< HEAD
  },
  actionButtonView: {
    borderRadius: moderateScale(10), // Scaled border radius
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',
    // flex: 1, // why used this
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: verticalScale(60), // Scaled max height
  },
})
=======
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
>>>>>>> origin/develop

export default DefaultButton;
