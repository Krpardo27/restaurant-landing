import React from 'react'
import HeroSlider from '../sections/HeroSlider'
import Pizzas from '../sections/Pizzas'
import GallerySlider from '../sections/GallerySlider'
import About from '../sections/About'
import Menu from '../sections/Menu'

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Pizzas />
      <Menu /> 
      <About />
      <GallerySlider />
    </>
  )
}

export default Home
