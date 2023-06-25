import { Box, Container, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from 'react-redux';
import { AddCart } from '../redux/cartSystem';

function DetailsPro() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const [product, setProduct] = useState('')

    const getSingleProduct = async() => {
        return await axios.get(`https://my-json-server.typicode.com/Karimansari4/e-commerce-redux/products/${id}`).then((response) => {
            setProduct(response.data)
        }).catch((err) => {
            // setError(err.response)
            console.log("get single error: ", err);
        })
    }

    useEffect(() => {
        getSingleProduct()
    }, [id])

    return (
        <Container>
            <Card sx={{ maxWidth: '100%', mt: 1 }}>
                <CardMedia component="img" alt="green iguana" height="140" image="/images/sofa.jpg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div"> {product.name} </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}> {product.description} </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ width: '100%', display: 'flex', p: 1, mt: 2}} >
                        <Box sx={{ width: '50%'}}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1}}> {product.price} <CurrencyRupeeIcon sx={{fontSize: '15px'}} /> </Typography>
                            
                            <Typography variant='body' component={'div'} sx={{ ml: 1.5}}> <Rating name='read-only' value={product.rate} readOnly /> </Typography>
                        </Box>
                        <Box sx={{ width: '50%', textAlign: 'right'}}>
                            <Button variant='outlined' color='warning' onClick={() => dispatch(AddCart(product))} >Add to cart</Button>
                        </Box>
                    </Box>
                </CardActions>
                </Card>
        </Container>
    )
}

export default DetailsPro