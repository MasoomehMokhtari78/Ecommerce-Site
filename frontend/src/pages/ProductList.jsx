import styled from "styled-components";
import Navbar from "../Components/Navbar";
import React, {useEffect } from 'react'
import { publicRequest } from "../requestMethods";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {setProducts} from "../redux/productSlice"
import ProductCard from "../Components/ProductCard";

const Container = styled.div``

const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`
const Option = styled.option``

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
`



export default function ProductList() {
    
    const location = useLocation()
    // TODO: cleaner way to get category
    const array = location.pathname.split("products/"); 
    const category = array.pop();

    const dispatch = useDispatch()
    
    useEffect(()=> {
        publicRequest.get(`/products?category=${category}`)
        .then(res => dispatch(setProducts(res.data)));

        },[]);
        
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.user.id);
    console.log("productList")
    console.log(user)

  return (
    <Container>
        <Navbar />
        <Title>{category}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select>
                    <Option disabled selected>
                        Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select>
                <Select>
                    <Option disabled selected>
                    Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select>
                    <Option selected>Newest</Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <ProductsContainer>
            {products.products.map((item) => (
                <ProductCard item={item} user={user} key={item.id}></ProductCard>
            ))}
        </ProductsContainer>
    </Container>
  )
}
