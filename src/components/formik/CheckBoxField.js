import React from 'react';
import { Checkbox } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { useField, useFormikContext } from 'formik';
import { Text } from 'react-native';
import Fonts from '../../theme/Fonts';
import Alignments from '../../theme/Alignments';

export default function CheckboxField(props) {
  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;

  return (
    <>
      <Checkbox.Item
        {...props}
        label={props.label}
        status={value ? 'checked' : 'unchecked'}
        color={Colors.primary}
        position='leading' // leading|trailing -> default trailing
        mode='android'
        labelStyle={Alignments.textLeft}
        onPress={() => {
          !meta.touched && helpers.setTouched(true);
          helpers.setValue(!value);
        }}
        disabled={isSubmitting || props.disabled}
      />
      <Text style={Fonts.error}>{error}</Text>
    </>
  );
}
