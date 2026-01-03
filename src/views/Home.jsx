import React from 'react'
import HeroSlider from '../sections/HeroSlider'
import Pizzas from '../sections/Pizzas'
import GallerySlider from '../sections/GallerySlider'
import About from '../sections/About'

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Pizzas />
      <About />
      <GallerySlider />
    </>
  )
}

export default Home
