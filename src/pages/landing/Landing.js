import React, { useState } from 'react';

import MockupLanding from 'assets/images/MockupLanding.png';

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
  landing,
  circle,
  buttons,
  landingInfo,
  landingImage,
} from './landing.module.scss';

const Landing = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleButton = (isRegister) => {
    setLoginOpen(!isRegister);
    setRegisterOpen(isRegister);
  };

  const footerContent = (isRegister) =>
    isRegister ? (
      <>
        Already have an account?{' '}
        <Button
          text="Log in"
          type="button"
          handle={() => handleButton(false)}
        />
      </>
    ) : (
      <>
        Don’t have and account?{' '}
        <Button
          text="Sign up"
          type="button"
          handle={() => handleButton(true)}
        />
      </>
    );

  const modal = (isRegister) => (
    <FormWrapper
      initialValues={isRegister ? registerValues : loginValues}
      schema={isRegister ? registerFormSchema : loginFormSchema}
      title={isRegister ? 'Add experience' : 'Add experience'}
      handleClose={() =>
        isRegister ? setRegisterOpen(false) : setLoginOpen(false)
      }
      footerContent={footerContent(isRegister)}
    >
      {(formik) =>
        isRegister ? (
          <RegisterForm formik={formik} />
        ) : (
          <LoginForm formik={formik} />
        )
      }
    </FormWrapper>
  );

  return (
    <section className={landing}>
      {loginOpen ? modal(false) : null}
      {registerOpen ? modal(true) : null}
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
            handle={() => handleButton(true)}
          />
          <Button
            text="Login"
            color="green"
            handle={() => handleButton(false)}
          />
        </div>
      </div>
      <img src={MockupLanding} alt="Mockup" className={landingImage} />
    </section>
  );
};

export default Landing;
