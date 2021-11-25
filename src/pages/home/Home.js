import React, { useState } from 'react';

import Layout from 'components/shared/layout';
import Button from 'components/shared/elements/button';
import InfoElement from 'components/home/info-element';

import FormWrapper from 'components/shared/forms/form-wrapper';

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

import GithubIcon from 'assets/icons/Github.png';
import InstagramIcon from 'assets/icons/Instagram.png';
import TwitterIcon from 'assets/icons/Twitter.png';
import Kelvin from 'assets/images/Kelvin.png';

import {
  contentContainer,
  about,
  footer,
  imageGroup,
} from './home.module.scss';

const Home = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [editInfoOpen, setEditInfoOpen] = useState(false);

  const modal = (isContact) => (
    <FormWrapper
      initialValues={isContact ? contactFormValues : editInfoFormValues}
      schema={isContact ? contactFormSchema : editInfoFormSchema}
      title={isContact ? 'Contact Me' : 'Edit your info'}
      handle={() =>
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
    <Layout pageTitle="Home" hide>
      {contactOpen ? modal(true) : null}
      {editInfoOpen ? modal(false) : null}
      <section className={contentContainer}>
        <div className={about}>
          <h1>
            Hello, I'm <span>Kelvin</span>
          </h1>
          <h3>Frontend developer</h3>
          <p>
            A front-end developer at Redlight Software who loves to swim and
            wants to share his very good projects.
          </p>
          <br />
          <Button
            handle={() => setContactOpen(true)}
            text="Contact"
            img="right"
            color="green"
          />
          <Button
            handle={() => setEditInfoOpen(true)}
            text="Edit"
            color="white"
          />
          <br />

          <ul>
            <a href="github.com">
              <img src={GithubIcon} alt="Github icon" />
            </a>
            <a href="instagram.com">
              <img src={InstagramIcon} alt="Instagram icon" />
            </a>
            <a href="twitter.com">
              <img src={TwitterIcon} alt="Twitter icon" />
            </a>
          </ul>
        </div>
        <div className={imageGroup}>
          <div>
            <img src={Kelvin} alt="Placeholder" />
            <div></div>
          </div>
        </div>
        <div className={footer}>
          <InfoElement label="E-mail" content="miguelbnmv@redlight.dev" />
          <InfoElement label="Phone" content="+351 911 010 123" />
          <InfoElement label="Location" content="Rome" />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
