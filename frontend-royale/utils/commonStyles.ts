import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";

export const container: any = {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
    padding: 20
}

export const gameTitle: any = {
    fontSize: scale(60),
    lineHeight: scale(60),
    color: 'white',
    textAlign: 'center',
}

export const inputField: any = {
    height: moderateVerticalScale(80),
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 25,
    borderRadius: 10,
    color: 'black',
    fontSize: scale(20),
    textAlign: 'left',
    backgroundColor: 'white'
};

export const errorMessage: any = {
    color: '#dc3545',
    marginBottom: 8,
    fontSize: 20
};

export const authScreensSubmitBtns: any = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%'
};

export const contentContainerStyle: any = { 
    justifyContent: 'center', 
    alignItems: 'stretch',
    flex: 1, 
    gap: moderateScale(40) 
};

export const tabCount: any = {
    color: "#ffffff",
    position: 'absolute',
    top: 3,
    left: '50%',
    transform: 'translate(-15px, 0)',
    zIndex: 999,
    textAlign: 'center',
    fontSize: scale(16)
};

export const labelTab: any = {
    fontSize: scale(50),
    color: "#ffffff",
    position: 'absolute',
    top: -3,
    left: -15,
    zIndex: 999,
    padding: moderateScale(10),
};

export const themeButtonText: any = {
    fontSize: scale(30), // Scaled font size
    lineHeight: scale(45),
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    width: '100%',
    height: '100%'
};

export const loadoutButtonText: any = {
    fontSize: scale(20), // Scaled font size
    lineHeight: scale(24),
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
};

export const loadoutButton: any = {
    width: verticalScale(120),
    maxHeight: verticalScale(50),
    borderWidth: 1,
    borderRadius: moderateScale(20),
    borderColor: 'white',
    overflow: 'hidden'
};

export const loadoutIconBox: any = { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    width: '100%', 
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center' 
};

export const loadoutIcon: any = { 
    borderRadius: verticalScale(50),
    backgroundColor: '#1cc433',
    borderWidth: 1,
    padding: 0,
    height: verticalScale(30),
    width: verticalScale(30),
    borderColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
};