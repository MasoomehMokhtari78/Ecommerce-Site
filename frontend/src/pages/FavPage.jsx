import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import React, {useEffect }  from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from "../redux/cartSlice"
import { publicRequest } from "../requestMethods";
import { setProducts } from '../redux/productSlice';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import ProductCard from "../Components/ProductCard";

const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const FavContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1vh;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``;

const ProductId = styled.span``;

const Hr = styled.hr`
    font-size: 30px;
    font-weight: 200;
`

const RemoveButton = styled.button`

    padding: 15px;
    height: 7vh;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-right: 10px;
    &:hover{
        background-color: #f8f4f4;
    }
`
const StyledLink  = styled(Link)`
    &:visited {
        color: black; 
    };
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
`

export default function Cart() {
    const favs = useSelector(state => state.user.favoriteProducts);
    var total = 0;
    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user.id);
    useEffect(() => {
        publicRequest.get(`/productsId?ids=${favs}`)
        .then(res => 
            setProducts(res.data));
    },[favs]);
  return (
    <Container>
        <Navbar></Navbar>
        <Wrapper>
            <Title>Wishlist</Title>
            <ProductsContainer>
                    {
                    products.map((item) =>
                        (
                            <ProductCard item={item} user={user} key={item.id}></ProductCard>
                        )
                    )}
            </ProductsContainer>
        </Wrapper>
        <Footer />
    </Container>
  )
}
