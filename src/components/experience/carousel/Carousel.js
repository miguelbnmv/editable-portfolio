import Glide from '@glidejs/glide';
import {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from 'react';

import { timeline, slides, line, month } from './carousel.module.scss';

import '@glidejs/glide/dist/css/glide.core.css';

export const Carousel = forwardRef(({ options, children, years }, ref) => {
  const sliderRef = useRef();
  const [year, setYear] = useState(years[0]);

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(() => {
    const slider = new Glide(sliderRef.current, options);

    const totalMonths = 12 * years.length;

    slider.on(['mount.after', 'run'], () => {
      console.log(totalMonths/slider.index)
      if (totalMonths/slider.index <= 2) {
        setYear(2020);
      } else {
        setYear(2019);
      }
    });

    slider.mount();

    return () => slider.destroy();
  }, [years, options]);

  return (
    <>
      <div className="glide" ref={sliderRef}>
        <div className={`${timeline} ${'glide__track'}`} data-glide-el="track">
          <ul className={`${slides} ${'glide__slides'}`}>{children}</ul>
          <div className={line}></div>
        </div>
      </div>
      <h2>{year}</h2>
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
