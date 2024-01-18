import { useField, useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import Alignments from '../../theme/Alignments';
import Fonts from '../../theme/Fonts';

export default function RadioGroupField({
  horizontal,
  title,
  values,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;

  function renderContent() {
    function onPress(item) {
      !meta.touched && helpers.setTouched(true);
      helpers.setValue(value === item ? '' : item);
    }

    return (
      <>
        <Text>{title}</Text>
        <RadioButton.Group
          onValueChange={(value) => onPress(value)}
          value={value}
        >
          <View
            style={[horizontal && Alignments.rowBetween, Alignments.flexWrap]}
          >
            {values.map((item) => (
              <RadioButton.Item
                position='leading' // leading|trailing -> default trailing
                mode='android'
                key={item}
                label={item}
                value={item}
                disabled={isSubmitting}
              />
            ))}
          </View>
        </RadioButton.Group>

        <Text style={Fonts.error}>{error}</Text>
      </>
    );
  }
  if (values.length) {
    return (
      // RadioButton.Group handle automatically unique value when not multiple
      <RadioButton.Group onValueChange={helpers.setValue} value={value}>
        {renderContent()}
      </RadioButton.Group>
    );
  } else {
    return <></>;
  }
}
