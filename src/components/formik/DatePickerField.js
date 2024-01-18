import { useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { Platform, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import I18n from 'i18n-js';

import Fonts from '../../theme/Fonts';
import CustomButton from '../Button/CustomButton';

function DatePickerField(props) {
  const [showPicker, setShowPicker] = useState(false);
  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;
  const valid = meta.touched ? !meta.error : undefined;

  function showDatePicker() {
    Keyboard.dismiss();
    setShowPicker(true);
  }

  return (
    <>
      <TextInput
        {...props}
        onFocus={showDatePicker}
        disabled={isSubmitting}
        value={value !== '' ? moment(value).format('DD/MM/YYYY') : ''}
        error={value && error}
        valid={valid}
        onBlur={helpers.setTouched}
        ref={props.innerRef}
      />
      <Text style={Fonts.error}>{!showPicker && error}</Text>
      {showPicker ? (
        <>
          {Platform.OS === 'ios' ? (
            <CustomButton
              label={I18n.t('app.ok')}
              onPress={() => {
                value === '' && helpers.setValue(new Date());
                setShowPicker(false);
              }}
            />
          ) : null}
          <DateTimePicker
            locale='fr'
            value={value !== '' ? value : new Date()}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, date) => {
              Platform.OS !== 'ios' && setShowPicker(false);
              date && helpers.setValue(moment(date).toDate());
            }}
            disabled={isSubmitting}
          />
        </>
      ) : null}
    </>
  );
}

export default DatePickerField;
