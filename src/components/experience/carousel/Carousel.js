import React, {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from 'react';
import Helmet from 'react-helmet';
import Glide from '@glidejs/glide';

import '@glidejs/glide/dist/css/glide.core.css';

import {
  timeline,
  slides,
  line,
  month,
  yearText,
} from './carousel.module.scss';

export const Carousel = forwardRef(({ options, children, dates }, ref) => {
  const [year, setYear] = useState(dates[0].split('_')[0]);
  const sliderRef = useRef();
  const refEl = useRef();

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);

    slider.on(['mount.after', 'run'], () =>
      setYear(dates[slider.index].split('_')[0])
    );

    slider.mount();

    return () => slider.destroy();
  }, [options, dates]);

  return (
    <>
      <Helmet>
        <style>
          {`
        .glide {
          height: 75vh;
          position: absolute !important;
          bottom: 0;
          z-index: 4;
        }
        @media only screen and (max-width: 48rem) {
          .glide{
            height: calc(100% - 10.5rem);
            bottom: initial;
          }
        }
        .glide * {
          position: unset !important
        }
        .glide__slide--active .experiencePop{
          display: flex;
        }
        .glide__slide--active .monthWrapper{
          position: absolute !important;
          top: 50%;
          margin-top: -0.75rem;
          transform: translateY(-50%);
        }
        `}
        </style>
      </Helmet>
      <div className="glide" ref={sliderRef}>
        <div className={`${timeline} ${'glide__track'}`} data-glide-el="track">
          <ul ref={refEl} className={`${slides} ${'glide__slides'}`}>
            {children}
          </ul>
          <div className={line}></div>
        </div>
      </div>
      <h2 className={yearText}>{year}</h2>
    </>
  );
});

export const Slide = forwardRef(({ children }, ref) => (
  <li className={`${month} ${'glide__slide'}`} ref={ref}>
    {children}
  </li>
));
