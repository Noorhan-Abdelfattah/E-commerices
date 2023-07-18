import React from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return<>
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>
  <h2>Home</h2>
  </>
}
