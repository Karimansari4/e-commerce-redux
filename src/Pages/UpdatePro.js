import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import {  Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdatePro() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = React.useState({
        name: '',
        description: '',
        price: '',
        rate: '',
    })
    const [valErr, setValErr] = React.useState({
        name: '',
        description: '',
        price: '',
        rate: '',
    })

    const [open, setOpen] = React.useState(false);
    const [customVariant, setCustomVariant] = React.useState('success')
    const [success, setSuccess] = React.useState('')
    const [error, setError] = React.useState('')


    // closing alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    // onChange of text filed
    const handleOnChange = (evt) => {
        setProducts({
          ...products,
          [evt.target.name]: evt.target.value
        })
    
        setValErr({
            name: '',
            description: '',
            price: '',
            rate: '',
        })
    }

    // submiting data
    const handleUpdateProduct = async(evt) => {
        evt.preventDefault()
        if(!products.name){
            setValErr({name: 'Please enter product name?'})
        }else if(!products.description){
            setValErr({description: 'Please enter product description?'})
        }else if(!products.price){
            setValErr({price: 'Please enter product price?'})
        }else if(isNaN(products.price)){
            setValErr({price: 'Please enter price in number?'})
            console.log("isNaN");
        }else if(!products.rate){
            setValErr({rate: 'Please rate the product?'})
        }else if(isNaN(products.rate)){
            setValErr({rate: 'Please enter rate in number?'})
        }else if(products.rate > 5){
            setValErr({rate: 'Please rate the product 0 to 5!'})
        }else{
            return await axios.put(`http://localhost:4000/products/${id}`, products).then((response) => {
                setSuccess('Product added successfully.')
                setCustomVariant('success')
                setOpen(true)
                setProducts({
                    name: '',
                    description: '',
                    price: '',
                    rate: '' 
                })
                navigate('/')
            }).catch((err) => {
                setError(err.response.message)
                setCustomVariant('error')
                setOpen(true)
                console.log("error: ", err);

            })
        }
        // console.log("data: ", products);
    }

    const getSingleProduct = async() => {
        return await axios.get(`http://localhost:4000/products/${id}`).then((response) => {
            setProducts(response.data)
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={customVariant} sx={{ width: '100%' }}>
                  {success ? success : error}
              </Alert>
            </Snackbar>
            <Box component="form" noValidate onSubmit={handleUpdateProduct} sx={{ mt: 3, p: 2, backgroundColor: "lightgray", borderRadius: '10px'}}>

                <Grid container spacing={2} sx={{ mt: 3}}>
                    <Typography component={'h3'} variant='body' sx={{ ml: 2}} >Add Product</Typography>

                    {/* product name */}
                    <Grid item  xs={12} >
                        <TextField type='text' style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.name ? true : false} autoComplete="given-name" name="name" value={products.name} onChange={handleOnChange} required fullWidth id="name" label="Name" autoFocus />
                        <Typography variant='body1' color={'error'} component="p" >{valErr.name ? valErr.name : ''}</Typography>
                    </Grid>

                    {/* product description */}
                    <Grid item  xs={12} >
                        <TextField type='text' style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.description ? true : false} autoComplete="given-name" name="description" value={products.description} onChange={handleOnChange} required fullWidth id="description" label="Description" autoFocus />
                        <Typography variant='body1' color={'error'} component="p" >{valErr.description ? valErr.description : ''}</Typography>
                    </Grid>

                    {/* product price */}
                    <Grid item  xs={12} >
                        <TextField type='number' style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.price ? true : false} autoComplete="given-name" name="price" value={products.price} onChange={handleOnChange} required fullWidth id="price" label="Price" autoFocus />
                        <Typography variant='body1' color={'error'} component="p" >{valErr.price ? valErr.price : ''}</Typography>
                    </Grid>

                    {/* product rating */}
                    <Grid item  xs={12} >
                        <TextField  pattern="[0-5]" type='number' style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.rate ? true : false} autoComplete="given-name" name="rate" value={products.rate} onChange={handleOnChange} required fullWidth id="rate" label="Rate" autoFocus />
                        <Typography variant='body1' color={'error'} component="p" >{valErr.rate ? valErr.rate : ''}</Typography>
                    </Grid>

                    <Grid item  xs={12} >
                        <Button type='submit' variant='contained' color='success' fullWidth >ADD</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default UpdatePro