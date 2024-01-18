import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../../theme/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  getStatusBarHeight,
  isIphoneX,
  getBottomSpace,
} from 'react-native-iphone-x-helper';

export default function DropDownPickerField(props) {
  const [field, , helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;

  const [open, setOpen] = useState(false);

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={props.items}
        setOpen={setOpen}
        setValue={(val) => helpers.setValue(val())}
        disabled={isSubmitting || props.disabled}
        style={[styles.picker, props.style]}
        placeholder={value || props.placeholder || ''}
        placeholderStyle={{ color: Colors.grey }}
        dropDownContainerStyle={styles.dropDown}
        modalContentContainerStyle={styles.modalStyle}
        listMode='SCROLLVIEW'
        labelStyle={{ color: Colors.black }}
        dropDownDirection='BOTTOM'
      />
    </>
  );
}
const styles = StyleSheet.create({
  label: {
    lineHeight: 15,
  },
  picker: {
    marginTop: 10,
    marginBottom: 18,
  },
  dropDown: { marginTop: 10 },
  modalStyle: {
    marginTop: isIphoneX() ? getStatusBarHeight() : 0,
    paddingBottom: getBottomSpace(),
  },
});
