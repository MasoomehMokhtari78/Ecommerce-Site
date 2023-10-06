import styled from "styled-components";
import React, {useEffect, useState } from 'react'
import { popularProducts } from "../data";
import ProductCard from "./ProductCard";
import Card from './Card';
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from 'react-redux';
import {setProducts} from "../redux/productSlice"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function NewProducts() {

  const [newProducts, setNewProducts] = useState([])

  const user = useSelector(state => state.user.id);
  const dispatch = useDispatch()
  useEffect(()=> {
    publicRequest.get(`/products?category=new`)
    .then(res => 
      dispatch(setProducts(res.data))
    )
    },[]);
    const products = useSelector(state => state.products);
    
  return (
    <Container>
        {products.products.map((item) => (
            <ProductCard item={item} user={user} key={item.id}/>
        ))}
    </Container>
  )
}
