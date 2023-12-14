import React, { Fragment } from 'react'
import ChooseUs from '../components/choose_us/ChooseUs'
import Download from '../components/download_section/Download'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HeroSilder from '../components/hero_slider/HeroSilder'
import MenuPack from '../components/menu_pack/MenuPack'
import PopularMenu from '../components/popular-menu/PopularMenu'
import Testimonials from '../components/testimonials/Testimonials'
const Home = () => {
       return (
              <Fragment>
                     <div className='mt-3'>
                     <Header />
                     </div>
                     <HeroSilder/>
                     <PopularMenu/>
                     <ChooseUs/>
                     <MenuPack/>
                     <Testimonials/>
                     <Download/>
                     <Footer/>
              </Fragment>
       )
}

export default Home