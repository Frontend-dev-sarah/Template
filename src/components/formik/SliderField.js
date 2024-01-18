import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';

import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import Alignments from '../../theme/Alignments';

export default function SliderField(props) {
  const [field, , helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const [xDefaultValue, setXDefaultValue] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  function getValueXPosition() {
    return (
      xDefaultValue -
      ((value - props.min) / props.max) * xDefaultValue +
      ((value - props.min) / props.max) * sliderWidth +
      5
    );
  }

  return (
    <View style={[{ ...props.style }]}>
      <Text>{props.label}</Text>
      <View style={[Alignments.rowBetween, styles.slideCtnr]}>
        <View style={[styles.valueCtnr, { left: getValueXPosition() }]}>
          <Text
            style={[
              Fonts.title,
              props.limit !== (null || undefined) &&
                value > props.limit &&
                Fonts.error,
            ]}
          >
            {`${value} ${value <= 0 ? props.unitDefault : props.unit || ''}`}
          </Text>
        </View>
        <Text>{`${props.min} ${props.hideUnit ? '' : props.unit || ''}`}</Text>
        <View
          style={Alignments.fill}
          onLayout={(event) => {
            var { x, width } = event.nativeEvent.layout;
            x !== xDefaultValue && setXDefaultValue(x);
            width !== sliderWidth && setSliderWidth(width);
          }}
        >
          <Slider
            containerStyle={styles.slider}
            minimumValue={props.min}
            maximumValue={props.max}
            minimumTrackTintColor={Colors.black}
            maximumTrackTintColor={Colors.primary30}
            thumbTintColor={Colors.primary}
            onValueChange={helpers.setValue}
            value={value}
            disabled={isSubmitting}
            step={props.step || 1}
          />
        </View>
        <Text>{`${props.max} ${props.hideUnit ? '' : props.unit || ''}`}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  slider: { flex: 1, marginHorizontal: 5 },
  slideCtnr: { marginVertical: 25 },
  valueCtnr: {
    minWidth: 30,
    textAlign: 'center',
    position: 'absolute',
    top: -20,
  },
});
