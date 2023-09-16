import React from 'react'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import Categories from '../Components/Categories'
import Footer from "../Components/Footer";
import styled from "styled-components";
import Slider from '../Components/Slider';
const Container = styled.div``


function Home() {
  return (
    <Container>
        <Navbar></Navbar>
        <Slider></Slider>
        <Categories></Categories>
        <Products></Products>
        <Footer></Footer>
    </Container>
  )
}

export default Home