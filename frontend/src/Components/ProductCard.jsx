import React, {useCallback} from 'react'
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from '@mui/icons-material';
  import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicRequest } from "../requestMethods";
import {addFavorite} from "../redux/userSlice"
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
    opacity: 1;
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* z-index: 2; */
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
    }
`
const StyledLink  = styled(Link)`
    text-decoration: none;
    &:visited {
        text-decoration:none;
        color: black; 
    };
`;

export default function ProductCard({item, user}) {
    const dispatch = useDispatch()
    const handleFavorite = 
        async (e) => {
            e.preventDefault();
            console.log(user)
            if (user){
                try {
                    const res = await publicRequest.post(
                    '/addFavorite',
                    {'user': user, 'product': item.id})
                    .then(res => dispatch(addFavorite(res.data.favoriteProducts)));
                    
                } catch (error) {
                    console.log(error)
                }
            }else{
                alert('please login first.')
            }
        }
      
  return (
    <Container>
        {/* <Circle /> */}
        <Image src={item.img}/>
        <Info>
            {/* <Icon>
                <ShoppingCartOutlined />
            </Icon> */}
            <StyledLink to={`/${item.id}`}>
                <Icon>
                    <SearchOutlined />
                </Icon>
            </StyledLink>
            
            <Icon onClick={handleFavorite}>
                <FavoriteBorderOutlined />
            </Icon>
        </Info>
    </Container>
  )
}
