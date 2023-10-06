import React, {useCallback, useState} from 'react'
import {
    FavoriteBorderOutlined,
    Favorite,
    SearchOutlined,
  } from '@mui/icons-material';
  import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicRequest } from "../requestMethods";
import {setFavorite} from "../redux/userSlice"
import { useEffect } from 'react';
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
    color: black;
    &:visited {
        text-decoration:none;
        color: black; 
    };
`;

export default function ProductCard({item, user}) {
    const dispatch = useDispatch()
    const [isFavorite, setIsFavorite] = useState(false)
    const favList = useSelector(state => state.user.favoriteProducts);
    //convert object to array then search for id
    useEffect(() => {
        setIsFavorite((Object.values(favList)).includes(item.id))
    },[favList])
    const handleFavorite = 
        async (e) => {
            e.preventDefault();
            if (user){
                if(isFavorite){
                    const res = await publicRequest.post(
                        '/setFavorite',
                        {'user': user, 'product': item.id, 'keyword':'remove'})
                        .then(res => dispatch(setFavorite(res.data.favoriteProducts)));
                }else{
                    try {
                        const res = await publicRequest.post(
                        '/setFavorite',
                        {'user': user, 'product': item.id, 'keyword':'add'})
                        .then(res => dispatch(setFavorite(res.data.favoriteProducts)));
                        
                    } catch (error) {
                        console.log(error)
                    }
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
                {isFavorite ? <Favorite/> : <FavoriteBorderOutlined /> }
            </Icon>
        </Info>
    </Container>
  )
}
