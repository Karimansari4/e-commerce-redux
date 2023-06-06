import { Container } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Home() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const getAllData = async() => {
        return await axios.get('https://my-json-server.typicode.com/typicode/demo/posts').then((response) => {
            console.log(response);
            // setData(response.data.posts)
        }).catch((err) => {
            // console.log("error: ", err);
            setError(err)
        })
    }

    useEffect(() => {
        getAllData()
    }, [])

    console.log("data: ", data);
    console.log("error: ", error);
    return (
        <Container>
            {/* data.map((item, ind) => {
                return (
                    <div>{item.title}</div>
                )
            }) */}
        </Container>
    )
}

export default Home