import React from 'react';
import { Button } from 'react-native-paper';
import AppStyle from '../../theme/AppStyle';

export default function CustomButton(props) {
  return (
    <Button
      mode={'contained'}
      style={[AppStyle.button, props.customStyle]}
      dark
      theme={{
        fonts: {
          medium: {
            fontSize: 12,
          },
        },
      }}
      {...props}
    >
      {props.label}
    </Button>
  );
}
