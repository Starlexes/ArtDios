import { HTMLProps, ReactNode } from 'react';

export interface SwiperItemProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode,
    sliderCount?: number,
    betweenSlider?: number,
    slidesPerView?: number
}