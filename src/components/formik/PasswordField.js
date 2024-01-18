import { useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text, Platform } from 'react-native';
import Fonts from '../../theme/Fonts';

function PasswordField(props) {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const [field, meta, helpers] = useField(props);
  const { isSubmitting } = useFormikContext();
  const { value } = field;
  const error = meta.touched ? meta.error : undefined;

  function switchDisplayPassword() {
    setHiddenPassword(!hiddenPassword);
  }

  return (
    <View>
      <TextInput
        {...props}
        disabled={isSubmitting}
        value={value}
        onChangeText={helpers.setValue}
        error={error}
        onBlur={helpers.setTouched}
        secureTextEntry={hiddenPassword}
        ref={props.innerRef}
        returnKeyType={Platform.OS === 'ios' ? 'next' : 'default'}
        right={
          <TextInput.Icon
            icon={hiddenPassword ? 'eye' : 'eye-off'}
            onPress={switchDisplayPassword}
          />
        }
      />
      <Text style={Fonts.error}>{error}</Text>
    </View>
  );
}

export default PasswordField;
