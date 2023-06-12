import { Box, Container, Grid, Paper, Rating, Typography, Button } from '@mui/material'
import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RemoveCart } from '../redux/cartSystem';


function CartPro() {
    const { cart } = useSelector(item=>item.products)
    const dispatch = useDispatch()

    return (
        <Container>
            { cart.length > 0 ? cart.map((item, ind) => {
                return (
                    <Grid key={ind} container spacing={2} sx={{ mt: 3, boxShadow: '3px 3px 15px 2px grey',}}>
                        <Grid item xs={7} /* style={{ border: '1px solid red'}} */>
                            <Grid container spacing={2}>
                                <Grid item xs={8} >
                                    <Paper elevation={2} sx={{ width: '100%', height: '200px'}} >
                                        <img src={'/images/sofa.jpg'} alt='pro img' style={{ width: '100%', height: '200px'}} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={4} >
                                    <Box width={'100%'} position={'relative'} height={'200px'}>
                                        <Box sx={{ width: '100%', pl: 1.5}}>
                                            <Typography variant="h5" component="div"> {item.name} </Typography>
                                            <Typography variant='body' component={'div'} sx={{ mt: 1}}>{item.price} <CurrencyRupeeIcon sx={{fontSize: '15px'}} /></Typography>
                                        </Box>
                                        <Box width={'100%'} position={'absolute'} bottom={'10px'}>
                                            <Typography variant='body' component={'p'} sx={{ ml: 1.5, mb: 1}}> Quantity: {item.quantity}</Typography>
                                            <Typography variant='body' component={'div'} sx={{ ml: 1.5}}> <Rating name='read-only' value={item.rate} readOnly /> </Typography>

                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Box width={'100%'} position={'relative'} height={'200px'}>
                                <Box sx={{ width: '100%'}}>
                                    <Typography variant='body' component={'p'} sx={{ textAlign: 'justify', mr: 1}}>
                                        <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'black'}} >{item.description.length <= 250 ? item.description : (item.description.substr(0, 250) + "...")}</Link>
                                    </Typography>
                                </Box>
                                <Box sx={{width: '100%', textAlign: 'right'}} position={'absolute'} bottom={'10px'} >
                                    
                                    <Button variant="outlined" color="error" sx={{ mr: 1}} onClick={() => dispatch(RemoveCart(item.id))}>Remove</Button>
                                    
                                </Box>
                                
                            </Box>
                        </Grid>
                    </Grid>
                    
                )
            }) : <Typography variant='h4' component={'div'} color={'error'} sx={{ textAlign: 'center', mt: 1}}>No Product in Cart</Typography>}
        </Container>
    )
}

export default CartPro