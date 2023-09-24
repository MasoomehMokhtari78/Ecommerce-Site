import styled from "styled-components";
import React, {useEffect, useState } from 'react'
import { popularProducts } from "../data";
import ProductCard from "./ProductCard";
import Card from './Card';
import { publicRequest } from "../requestMethods";
import { useSelector} from 'react-redux';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function NewProducts() {

  const [newProducts, setNewProducts] = useState([])

  const user = useSelector(state => state.user.id);
  
  useEffect(()=> {
    publicRequest.get(`/products?category=new`)
    .then(res => 
      setNewProducts(res.data))
    },[]);
  return (
    <Container>
        {newProducts.map((item) => (
            <ProductCard item={item} user={user} key={item.id}/>
        ))}
    </Container>
  )
}
