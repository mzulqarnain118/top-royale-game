import React from 'react';
import { Text } from 'react-native';

const CustomText: React.FC<any> = ({ style, weight = 'Regular', ...props }) => {
  let fontFamily;
  switch (weight) {
    case 'Bold':
      fontFamily = 'AdleryProBlockletter';
      break;
    default:
      fontFamily = 'AdleryProBlockletter';
  }

<<<<<<< HEAD
  return <Text {...props} style={[style, { fontFamily }]} />;
=======
  return <Text {...props} style={[style, { fontFamily,paddingTop:3 }]} />;
>>>>>>> origin/develop
};

export default CustomText;
