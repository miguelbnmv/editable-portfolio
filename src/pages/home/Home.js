import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useMightyMouse from 'react-hook-mighty-mouse';
import { getDatabase, ref, update } from 'firebase/database';
import { ref as sRef, uploadBytes, deleteObject } from 'firebase/storage';
import { useParams } from 'react-router-dom';

import GithubIcon from 'assets/icons/Github.svg';
import InstagramIcon from 'assets/icons/Instagram.svg';
import TwitterIcon from 'assets/icons/Twitter.svg';
import BehanceIcon from 'assets/icons/behance.png';
import LinkedinIcon from 'assets/icons/linkedin.png';
import DribbleIcon from 'assets/icons/dribble.png';

import { Context } from 'context/userContext';
import { storage } from 'firebase/firebase.js';

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
  socialIcon,
} from './home.module.scss';
import { useEffect } from 'react/cjs/react.development';

const icons = {
  github: GithubIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  behance: BehanceIcon,
  linkedin: LinkedinIcon,
  dribble: DribbleIcon,
};

const Home = ({ hasId }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [images, setImages] = useState([]);
  const db = getDatabase();
  const user = useContext(Context);
  const info = user?.info?.info;

  const { userId } = useParams();

  const {
    selectedElement: {
      position: { angle },
    },
  } = useMightyMouse(true, 'notGoodPractice', {
    x: -window.innerWidth / 3,
    y: -window.innerHeight / 3,
  });

  const rotateWrapper = `rotate(${angle}deg)`;
  const rotateImage = `rotate(${-angle}deg)`;

  const getImageInfo = () => {
    if (photoChanged) {
      if (images.length !== 0) {
        return `users/${user?.id}/${images[0]?.name}`;
      } else {
        return '';
      }
    } else {
      return info?.image;
    }
  };

  const editFunction = (values) => {
    uploadBytes(
      sRef(storage, 'users/' + user?.id + '/' + images[0].name),
      images[0]
    ).finally(() => {
      update(ref(db, 'users/' + user?.id), {
        info: {
          name: values.userName,
          username: values.userUsername,
          image: getImageInfo(),
          bio: values.userBio,
          role: values.userRole,
          location: values.userLocation,
          email: values.userEmail,
          phone: values.userPhone,
          color: values.userColor,
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

      setPhotoChanged(false);
      setEditInfoOpen(false);
    });
  };

  const editUser = (values) => {
    if (photoChanged && images.length !== 0) {
      if (info?.image === '') {
        editFunction(values);
      } else {
        deleteObject(sRef(storage, info?.image))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            editFunction(values);
          });
      }
    } else {
      update(ref(db, 'users/' + user?.id), {
        info: {
          name: values.userName,
          image: getImageInfo(),
          bio: values.userBio,
          role: values.userRole,
          location: values.userLocation,
          email: values.userEmail,
          phone: values.userPhone,
          color: values.userColor,
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
      setPhotoChanged(false);
      setEditInfoOpen(false);
    }
  };

  const modal = (isContact) => (
    <FormWrapper
      initialValues={isContact ? contactFormValues : editInfoFormValues(info)}
      schema={isContact ? contactFormSchema : editInfoFormSchema}
      title={isContact ? 'Contact Me' : 'Edit your info'}
      handleSubmit={editUser}
      handleClose={() =>
        isContact ? setContactOpen(false) : setEditInfoOpen(false)
      }
    >
      {(formik) =>
        isContact ? (
          <ContactForm formik={formik} />
        ) : (
          <EditInfoForm
            formik={formik}
            urls={images.length === 0 ? [user?.image] : images}
            setImages={setImages}
            setPhotoChanged={setPhotoChanged}
          />
        )
      }
    </FormWrapper>
  );

  useEffect(() => {
    document
      .querySelector('body')
      .classList.add(info?.color === '' ? 'green-theme' : info?.color);
    user?.setId(userId);
  }, [user, userId]);

  if (!info) return <div id="notGoodPractice"></div>;

  return (
    <Layout
      pageTitle="Home"
      hide
      hasId={hasId}
      openModal={() => setEditInfoOpen(true)}
    >
      {contactOpen ? modal(true) : null}
      {editInfoOpen ? modal(false) : null}
      <section className={contentContainer}>
        <div className={about}>
          <h1>
            Hello, I'm <span>{info?.name?.split(' ')[0]}</span>
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
            {Object.entries(info?.social).map((social) => {
              if (social[1] !== '') {
                return (
                  <a href={social[1]} key={social[0]}>
                    <img
                      className={socialIcon}
                      src={icons[social[0]]}
                      alt={social[0] + ' Icon'}
                    />
                  </a>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className={footer}>
            <InfoElement label="E-mail" content={info?.email} />
            <InfoElement label="Phone" content={info?.phone} />
            <InfoElement label="Location" content={info?.location} />
          </div>
        </div>
        <div
          id="notGoodPractice"
          className={imageGroup}
          style={{ transform: rotateWrapper }}
        >
          <img
            src={user?.image ?? InstagramIcon}
            alt={user?.image ? 'User' : 'Placeholder'}
            style={{ transform: rotateImage }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Home;

Home.propTypes = {
  hasId: PropTypes.bool,
};
