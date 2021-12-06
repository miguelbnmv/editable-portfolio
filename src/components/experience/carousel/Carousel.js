import Glide from '@glidejs/glide';
import Helmet from 'react-helmet';
import {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from 'react';

import { timeline, slides, line, month, yearText } from './carousel.module.scss';

import '@glidejs/glide/dist/css/glide.core.css';

export const Carousel = forwardRef(({ options, children, years }, ref) => {
  const sliderRef = useRef();
  const [year, setYear] = useState(years[0]);

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);

    const totalMonths = 12 * years.length;

    slider.on(['mount.after', 'run'], () => {
      // console.log(totalMonths/slider.index)
      if (totalMonths/slider.index <= 2) {
        setYear(2020);
      } else {
        setYear(2019);
      }
      console.log(slider.index)
    });

    slider.mount();

    return () => slider.destroy();
  }, [years, options]);

  return (
    <>
      <Helmet>
        <style>
          {`
          .glide {
            height: 75vh;
            position: absolute !important;
            bottom:0;
          }
          @media only screen and (max-width: 48rem) {
            .glide{
              height:90vh;
            }
          }
          .glide * {
            position: unset !important
          }
          .glide__slide .experiencePop{
            display:none;
          }
          .glide__slide--active .experiencePop{
            display:flex;
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
          <ul className={`${slides} ${'glide__slides'}`}>{children}</ul>
          <div className={line}></div>
        </div>
      </div>
      <h2 className={yearText}>{year}</h2>
    </>
  );
});

export const Slide = forwardRef(({ children }, ref) => {
  return (
    <li className={`${month} ${'glide__slide'}`} ref={ref}>
      {children}
    </li>
  );
});
