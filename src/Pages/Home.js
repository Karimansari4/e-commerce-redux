import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, List, ListItem, ListItemText, Paper, Radio, RadioGroup, Rating, Skeleton, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloseIcon from '@mui/icons-material/Close';
import {  Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const options = [
    'Low To High',
    'High To Low',
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false)
    const [customVariant, setCustomVariant] = useState('success')
    const [loading, setLoading] = useState(false)
    const [dailogOpen, setDailogOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [dailogValue, setDailogValue] = useState('Low To High')
    const [filterData, setFilterData] = useState([])

    // geting all data from fake json server
    const getAllData = async() => {
        return await axios.get('https://my-json-server.typicode.com/Karimansari4/e-commerce-redux/products').then((response) => {   /* json-server db.json --port 4000 */
        // return await axios.get('http://localhost:4000/products').then((response) => {  https://my-json-server.typicode.com/<your-github-username>/<your-repo-name>
            // console.log(response.data);
            setData(response.data)
            setLoading(true)
        }).catch((err) => {
            console.log("error: ", err);
            setError(err)
        })
    }

    useEffect(() => {
        getAllData()
    }, [dailogValue, refresh])

    // deleting product from fake json server
    const deleteProduct = async(id) => {
        return await axios.delete(`https://my-json-server.typicode.com/Karimansari4/e-commerce-redux/products/${id}`).then((response) => {
            setCustomVariant('success')
            setSuccess('Product deleted successfully')
            setOpen(true)
            setError('')
            if(refresh){
                setRefresh(false)
            }else{
                setRefresh(true)
            }
        }).catch((err) => {
            setSuccess('')
            setCustomVariant('error')
            setError('Failed to delete product?')
            setOpen(true)
        })

    }

    const handleClickListItem = () => {
        setDailogOpen(true)
    }

    const handleClose = (newValue) => {
        setDailogOpen(false)

        if(newValue){
            setDailogValue(newValue)
        }
    }

    // clearing data from filter array
    const handleClearFilterData = () => {
        setDailogValue('')
        setFilterData([])
    }

    // loading skeleton for loading animation
    const LoadingSkeleton = () => {
        return (
                <>
                    <Grid container spacing={2} sx={{ mt: 3, boxShadow: '3px 3px 15px 2px grey',}}>
                        <Grid item xs={7} /* style={{ border: '1px solid red'}} */>
                            <Grid container spacing={2}>
                                <Grid item xs={8} >
                                    <Paper elevation={2} sx={{ width: '100%', height: '200px'}} >
                                        <Skeleton variant="rounded" width={'100%'} height={'200px'} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={4} >
                                    <Box width={'100%'} position={'relative'} height={'200px'}>
                                        <Box sx={{ width: '100%', pl: 1.5}}>
                                            <Skeleton variant="rounded" width={'100%'} height={'30px'} />
                                            <Skeleton variant="rounded" width={'100%'} height={'30px'} sx={{ mt: 1}} />
                                        </Box>
                                        <Box width={'100%'} position={'absolute'} bottom={'10px'}>
                                            <Skeleton variant="rounded" width={'100%'} height={'30px'} sx={{ ml: 1.5, mt: 10}} />
                                        </Box>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Box width={'100%'} position={'relative'} height={'200px'}>
                                <Box sx={{ width: '100%'}}>
                                    <Skeleton variant="rounded" width={'95%'} height={'50px'} sx={{ ml: 1}} />
                                </Box>
                                <Box sx={{width: '100%', textAlign: 'right', display: 'flex'}} position={'absolute'} bottom={'10px'} >

                                    <Skeleton variant="rounded" width={'45%'} height={'30px'} sx={{ ml: 1, mr: 1}} />
                                    
                                    <Skeleton variant="rounded" width={'48%'} height={'30px'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </>
        )
    }

    // function of Dailog for filtering data
    function ConfirmationDialogRaw(props) {
        const { onClose, value: valueProp, open, ...other } = props;
        const [value, setValue] = useState(valueProp);
        const radioGroupRef = React.useRef(null);
      
        useEffect(() => {
          if (!open) {
            setValue(valueProp);
          }
        }, [valueProp, open]);
      
        const handleEntering = () => {
          if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
          }
        };
      
        const handleCancel = () => {
          onClose();
        };
      
        const handleOk = async() => {
          onClose(value);
          if(value === "Low To High"){
            const lth = data.sort((a, b) => a.price - b.price)
            setFilterData(lth)
          }
          if(value === "High To Low"){
            const htl = data.sort((a, b) => a.price - b.price).reverse()
            setFilterData(htl)
          }
        };
      
        const handleChange = (event) => {
          setValue(event.target.value);
        };
      
        return (
          <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" TransitionProps={{ onEntering: handleEntering }} open={open} {...other} > 
            <DialogTitle>Sort By Price</DialogTitle>
            <DialogContent dividers>
              <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange} >
                {options.map((option) => (
                  <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}> Cancel </Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
        );
      }

    // closing alert
    const alertHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    return (
        <Container>
            {/* alert message showing */}
            <Snackbar open={open} autoHideDuration={6000} onClose={alertHandleClose}>
              <Alert onClose={alertHandleClose} severity={customVariant} sx={{ width: '100%' }}>
                  {success ? success : error}
              </Alert>
            </Snackbar>

            {/* Sort Dailog Rendering */}
            <Box sx={{ width: '100%', maxWidth: 360,}} >
                <List component="div" role="group">
                    <ListItem button divider aria-haspopup="true" aria-controls="ringtone-menu" aria-label="phone ringtone"/*  onClick={handleClickListItem} */ >
                        <ListItemText primary="Sort By Price" secondary={dailogValue} onClick={handleClickListItem} />
                        <IconButton onClick={handleClearFilterData}> <CloseIcon color="error" /> </IconButton>
                    </ListItem>
                    <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={dailogOpen} onClose={handleClose} value={dailogValue} />
                </List>
            </Box>
            
            {/* Products rendering */}
            {loading ? filterData.length > 0 ? filterData?.map((item, ind) => {
                return (
                    <Grid key={ind} container spacing={2} sx={{ mt: 3, boxShadow: '3px 3px 15px 2px grey',}}>
                        <Grid item xs={7}>
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
                                        <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'black'}} >{item?.description.length <= 250 ? item?.description : (item?.description.substr(0, 250) + "...")}</Link>
                                    </Typography>
                                </Box>
                                <Box sx={{width: '100%', textAlign: 'right'}} position={'absolute'} bottom={'10px'} >
                                    <Link to={`updateProduct/${item.id}`} ><IconButton variant='outlined' sx={{ mr: 3}} color="warning"> <ModeEditIcon /> </IconButton></Link>
                                    
                                    <IconButton variant='outlined' sx={{ mr: 1}} color='error' onClick={() => deleteProduct(item.id)}> <DeleteForeverIcon /> </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }) : data?.map((item, ind) => {
                return (
                    <Grid key={ind} container spacing={2} sx={{ mt: 3, boxShadow: '3px 3px 15px 2px grey',}}>
                        <Grid item xs={7}>
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
                                        <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'black'}} >{item?.description.length <= 250 ? item?.description : (item?.description.substr(0, 250) + "...")}</Link>
                                    </Typography>
                                </Box>
                                <Box sx={{width: '100%', textAlign: 'right'}} position={'absolute'} bottom={'10px'} >
                                    <Link to={`updateProduct/${item.id}`} ><IconButton variant='outlined' sx={{ mr: 3}} color="warning"> <ModeEditIcon /> </IconButton></Link>
                                    
                                    <IconButton variant='outlined' sx={{ mr: 1}} color='error' onClick={() => deleteProduct(item.id)}> <DeleteForeverIcon /> </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }) : <LoadingSkeleton />}

        </Container>
    )
}

export default Home