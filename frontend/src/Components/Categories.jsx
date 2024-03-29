import React from 'react'
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

export default function Categories() {
  return (
    
    <Container>
        {categories.map((item) => (
            <CategoryItem item={item} key={item.id}></CategoryItem>
        ))}
    </Container>
  )
}
