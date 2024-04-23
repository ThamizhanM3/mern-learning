import React, { useEffect, useState } from 'react'
import './assets/Album.css'
import Image from './components/Image'

export default function Album() {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const resp = await fetch('https://jsonplaceholder.typicode.com/photos')
            const data = await resp.json()
            setAlbums(data)
        }
            // .then((res) => {
            //     // console.log(resp.data);
            //     console.log(res.data);
            // })
        // fetchData()
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res => res.json())
        .then(alb => setAlbums(alb))
    }, [])
    return (
        <div className='Album'>
            {
                albums.map((item) => {
                    return (
                        <div className='box0'>
                            <p> { item.title.toUpperCase() } </p>
                            <Image source={item.url} size={300} />
                            {/* <img src={item.thumbnailUrl} alt="" /> */}
                            {/* <img src={item.url} alt="" /> */}
                        </div>
                    )
                })
            }
        </div>
    )
}
