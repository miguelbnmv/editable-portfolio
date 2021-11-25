import React, { useState, useContext } from 'react';

import GithubIcon from 'assets/icons/Github.svg';
import InstagramIcon from 'assets/icons/Instagram.svg';
import TwitterIcon from 'assets/icons/Twitter.svg';
import Kelvin from 'assets/images/Kelvin.png';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout';
import Button from 'components/shared/elements/button';
import FormWrapper from 'components/shared/forms/form-wrapper';
import InfoElement from 'components/home/info-element';

import ContactForm from 'components/home/forms/contact-form';
import {
  initialValues as contactFormValues,
  contactFormSchema,
} from 'components/home/forms/contact-form/utils';
import EditInfoForm from 'components/home/forms/edit-info-form';
import {
  initialValues as editInfoFormValues,
  editInfoFormSchema,
} from 'components/home/forms/edit-info-form/utils';

import {
  contentContainer,
  about,
  footer,
  imageGroup,
} from './home.module.scss';

const icons = {
  Github: GithubIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

const Home = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const { info } = useContext(Context);

  const modal = (isContact) => (
    <FormWrapper
      initialValues={isContact ? contactFormValues : editInfoFormValues(info)}
      schema={isContact ? contactFormSchema : editInfoFormSchema}
      title={isContact ? 'Contact Me' : 'Edit your info'}
      handleClose={() =>
        isContact ? setContactOpen(false) : setEditInfoOpen(false)
      }
    >
      {(formik) =>
        isContact ? (
          <ContactForm formik={formik} />
        ) : (
          <EditInfoForm formik={formik} />
        )
      }
    </FormWrapper>
  );

  return (
    <Layout pageTitle="Home" hide openModal={() => setEditInfoOpen(true)}>
      {contactOpen ? modal(true) : null}
      {editInfoOpen ? modal(false) : null}
      <section className={contentContainer}>
        <div className={about}>
          <h1>
            Hello, I'm <span>{info?.name.split(' ')[0]}</span>
          </h1>
          <h3>{info?.role}</h3>
          <p>{info?.bio}</p>
          <Button
            handle={() => setContactOpen(true)}
            text="Contact"
            img="right"
            color="green"
          />
          <div>
            {Object.entries(info?.social).map((x) => {
              if (x[1] !== '') {
                return (
                  <a href={x[1]} key={x[0]}>
                    <img src={icons[x[0]]} alt={x[0] + ' Icon'} />
                  </a>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className={imageGroup}>
          <div>
            <img src={Kelvin} alt="User" />
            <div></div>
          </div>
        </div>
        <div className={footer}>
          <InfoElement label="E-mail" content={info?.email} />
          <InfoElement label="Phone" content={info?.phone} />
          <InfoElement label="Location" content={info?.location} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
