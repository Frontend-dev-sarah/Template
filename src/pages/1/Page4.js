import React from 'react';
import { Text } from 'react-native';
import * as Yup from 'yup';
import I18n from 'i18n-js';

import Alignments from '../../theme/Alignments';
import FormView from '../../components/formik/FormView';
import Form from '../../components/formik/Form';
import TextField from '../../components/formik/TextField';
import PasswordField from '../../components/formik/PasswordField';
import SubmitButton from '../../components/formik/SubmitButton';
import CheckboxField from '../../components/formik/CheckBoxField';
import RadioGroupField from '../../components/formik/RadioGroupField';
import DatePickerField from '../../components/formik/DatePickerField';
import DropDownPickerField from '../../components/formik/DropDownPickerField';
import { screenHeight } from '../../utils/constants';
import SliderField from '../../components/formik/SliderField';

const schema = Yup.object().shape({
  login: Yup.string()
    .email(I18n.t('error.notValidEmail'))
    .required(I18n.t('error.notBlankEmail')),
  password: Yup.string()
    .min(8, I18n.t('error.notEnoughChar', { count: 8 }))
    .required(I18n.t('error.notBlankPassword')),
  checkBox: Yup.bool().oneOf([true], I18n.t('error.requiredField')),
  radioButton: Yup.string().required(I18n.t('error.requiredField')),
  date: Yup.string().required(I18n.t('error.requiredField')),
  pickerValue: Yup.string().required(I18n.t('error.requiredField')),
  distance: Yup.number(),
});

export default function Page4({ navigation }) {
  const initialValues = {
    login: (__DEV__ && 'test@test.test') || '',
    password: (__DEV__ && 'test1234') || '',
    checkBox: false,
    radioButton: '',
    date: '',
    pickerValue: '',
    distance: 0,
  };

  function onSubmit(values) {
    console.log('==form values==>', values);
    navigation.goBack();
  }

  return (
    <FormView>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        schema={schema}
        style={[Alignments.fill, { minHeight: screenHeight }]}
      >
        <>
          <Text style={Alignments.textCenter}>Form example</Text>
          <TextField name='login' label={I18n.t('auth.email')} />
          <PasswordField name='password' label={I18n.t('auth.password')} />
          <CheckboxField name='checkBox' label='checkbox example' />
          <RadioGroupField
            name='radioButton'
            horizontal
            values={['1', '2', '3', '4']}
          />
          <DatePickerField name='date' label='date' />
          <DropDownPickerField
            name='pickerValue'
            placeholder='Ville'
            items={[
              { label: 'Lyon', value: 'Lyon' },
              { label: 'Marseille', value: 'Marseille' },
              { label: 'Paris', value: 'Paris' },
              { label: 'Nantes', value: 'Nantes' },
              { label: 'Bordeaux', value: 'Bordeaux' },
              { label: 'Lille', value: 'Lille' },
            ]}
            label='Ville'
          />
          <SliderField
            name='distance'
            label='distance'
            unitDefault={'Km'}
            min={0}
            max={30}
            unit={'Km'}
          />
          <SubmitButton label={I18n.t('app.save')} />
        </>
      </Form>
    </FormView>
  );
}
