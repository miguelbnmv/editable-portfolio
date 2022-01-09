import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';

import MockupLanding from 'assets/images/MockupLanding.png';

import { auth, registerUser, loginUser } from 'firebase/firebase.js';

import Button from 'components/shared/elements/button';
import FormWrapper from 'components/shared/forms/form-wrapper';

import {
  initialValues as registerValues,
  registerFormSchema,
} from 'components/landing-page/forms/register-form/utils';
import RegisterForm from 'components/landing-page/forms/register-form';
import {
  initialValues as loginValues,
  loginFormSchema,
} from 'components/landing-page/forms/login-form/utils';
import LoginForm from 'components/landing-page/forms/login-form';
import {
  initialValues as completeValues,
  editInfoFormSchema,
} from 'components/home/forms/edit-info-form/utils';
import EditInfoForm from 'components/home/forms/edit-info-form';

import {
  landing,
  circle,
  buttons,
  landingInfo,
  landingImage,
} from './landing.module.scss';

const Landing = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState(false);
  const [user] = useAuthState(auth);
  const db = getDatabase();
  const id = user?.uid;

  const register = (values) => {
    const user = registerUser(values);
    if (user) setFormType('complete');
  };

  const login = (values) => {
    loginUser(values);
    if (user) navigate('/home');
  };

  const complete = (values) => {
    console.log(values);
    set(ref(db, 'users/' + id), {
      info: {
        name: values.userName,
        image: values.userPhoto,
        bio: values.userBio,
        role: values.userRole,
        location: values.userLocation,
        email: values.userEmail,
        phone: values.userPhone,
        social: {
          behance: values.userBehance,
          github: values.userGitHub,
          linkedin: values.userLinkedIn,
          instagram: values.userInstagram,
          twitter: values.userTwitter,
          dribble: values.userDribble,
        },
      },
    });
    if (user) navigate('/home');
  };

  const getForm = (formType, formik) => {
    if (formType === 'login') {
      return <LoginForm formik={formik} />;
    } else if (formType === 'register') {
      return <RegisterForm formik={formik} />;
    } else if (formType === 'complete') {
      return <EditInfoForm formik={formik} />;
    } else {
      return null;
    }
  };

  const formContent = {
    login: {
      initialValues: loginValues,
      schema: loginFormSchema,
      title: 'Login',
      handleSubmit: login,
    },
    register: {
      initialValues: registerValues,
      schema: registerFormSchema,
      title: 'Register',
      handleSubmit: register,
    },
    complete: {
      initialValues: completeValues(null),
      schema: editInfoFormSchema,
      title: 'Complete your profile',
      handleSubmit: complete,
    },
  };

  const footerContent = (formType) => {
    if (formType === 'register') {
      return (
        <>
          Already have an account?{' '}
          <Button
            text="Log in"
            type="button"
            handle={() => setFormType('login')}
          />
        </>
      );
    } else if (formType === 'login') {
      return (
        <>
          Don’t have and account?{' '}
          <Button
            text="Sign up"
            type="button"
            handle={() => setFormType('register')}
          />
        </>
      );
    }
  };

  const modal = (formType) => (
    <FormWrapper
      initialValues={formContent[formType]?.initialValues}
      schema={formContent[formType]?.schema}
      title={formContent[formType]?.title}
      handleClose={() => setFormType(false)}
      handleSubmit={formContent[formType]?.handleSubmit}
      footerContent={footerContent(formType)}
    >
      {(formik) => getForm(formType, formik)}
    </FormWrapper>
  );

  return (
    <section className={landing}>
      {formType ? modal(formType) : null}
      <div className={circle}></div>
      <div className={landingInfo}>
        <h1>
          Editable
          <br />
          Portfolio
        </h1>
        <h3>
          The platform that makes it easy to create your personal portfolio site
          in just a few minutes. Create yours <span>now</span>!
        </h3>
        <div className={buttons}>
          <Button
            text="Register"
            color="green"
            handle={() => setFormType('register')}
          />
          <Button
            text="Login"
            color="green"
            handle={() => setFormType('login')}
          />
        </div>
      </div>
      <img src={MockupLanding} alt="Mockup" className={landingImage} />
    </section>
  );
};

export default Landing;
