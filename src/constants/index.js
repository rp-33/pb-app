import * as Yup from 'yup';

import {
    Dimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

export const Width = (width < 540) ? width : 540;

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required email'),
    password: Yup.string()
      .required('Required password'),
});

export const FargotPasswordSchema = {
    email: Yup.object().shape({
        email: Yup.string()
          .email('Correo electrónico invalido')
          .required('Correo electrónico es obligatorio'),
    }),
    code: Yup.object().shape({
        code: Yup.string()
          .required('Código de verificación es obligatorio'),
    })
};

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'The password must be at least 6 characters')
        .max(16, 'Password must be less than 16 characters')
        .required('Required password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Both passwords must match')
        .required('Required password'),
});

export const ChangeHobbieSchema = Yup.object().shape({
    hobbie: Yup.string()
        .required('hobbie is required'),
});


export const ChangeBiographySchema = Yup.object().shape({
    biography: Yup.string()
        .required('Biography is required'),
});

export const ChangeDisplayNameSchema = Yup.object().shape({
    displayName: Yup.string()
        .required('Field is required'),
});

export const SignUpSchema = Yup.object().shape({
    displayName: Yup.string()
        .required("Pet's name required"),
    email: Yup.string()
        .email('Email invalid')
        .required('Email required'),
    password: Yup.string()
        .min(6, 'The password must be at least 6 characters')
        .max(16, 'Password must be less than 16 characters')
        .required('Required password'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Both passwords must match')
        .required('Repeat Password is required'),
});
