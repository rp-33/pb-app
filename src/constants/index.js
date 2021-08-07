import * as Yup from 'yup';
import {width} from './dimensions';

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
            .email('Invalid email')
            .required('Required email')
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

export const ChangePetNameSchema = Yup.object().shape({
    petName: Yup.string()
        .required('Field is required'),
});

export const ChangeAgeSchema = Yup.object().shape({
    age: Yup.number()
        .required('Field is required')
        .positive()
        .integer()
});


export const SignUpSchema = Yup.object().shape({
    displayName: Yup.string()
        .required("Displayname required"),
    petName: Yup.string()
        .required("Pet's name required"),
    pet: Yup.string()
        .required("Pet type required"),
    email: Yup.string()
        .email('Email invalid')
        .required('Email required'),
    age : Yup.number()
        .required("Pet's name required"),
    password: Yup.string()
        .min(6, 'The password must be at least 6 characters')
        .max(16, 'Password must be less than 16 characters')
        .required('Required password'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Both passwords must match')
        .required('Repeat Password is required'),
});


export const SignUpSchemaBusiness = Yup.object().shape({
    displayName: Yup.string()
        .required("Business name required"),
    type: Yup.string()
        .required("Displayname required"),
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


export const ProductSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name required"),
    price: Yup.string()
        .required("Price required"),
    description: Yup.string()
        .required('Description required'),
    photos : Yup.array()
        .required('Photos required'),
    pet : Yup.string()
        .required("Price required")
});

