import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import MobileHeadline from '../MobileHeadlines/MobileHeadline'
import { translate } from '@/utils'
import CustomCategorySkeleton from '../Skeleton/CustomCategorySkeleton'
import CategoryCard from '../Cards/CategoryCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const HomeCategory = ({ isLoading, categoryData, language, breakpoints }) => {
    return (
        <div>
        </div>
    )
}

export default HomeCategory