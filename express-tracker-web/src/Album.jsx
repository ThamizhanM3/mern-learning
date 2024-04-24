import React, { useEffect, useState } from 'react'
import './assets/Album.css'
import Image from './components/Image'

export default function Album() {
    const [albums, setAlbums] = useState([])
    const [fontCase, setFontCase] = useState('Upper Case')
    const [imageSize, setImageSize] = useState(true)

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

    const switchCase = () => {
        if (fontCase === 'Upper Case') {
            setFontCase('Lower Case')
        } else {
            setFontCase('Upper Case')
        }
    }

    const imageSwitch = () => {
        if (imageSize) {
            setImageSize(false)
        } else {
            setImageSize(true)
        }
    }

    return (
        <div className='Album'>
            <input type="button" value={fontCase === 'Upper Case' ? 'Lower Case' : 'Upper Case'} id='switchCase' onClick={switchCase}/>
            <input type="button" value={imageSize ? 'Small Image' : 'Large Image'} id='imageSize' onClick={imageSwitch}/>
            {
                albums.map((item) => {
                    return (
                        <div className='box0' key={item.id}>
                            <p> { fontCase === 'Upper Case' ? item.title.toUpperCase() : item.title } </p>
                            <Image source={ imageSize ? item.url : item.thumbnailUrl} size={imageSize ? 600 : 150} />
                            {/* <img src={item.thumbnailUrl} alt="" /> */}
                            {/* <img src={item.url} alt="" /> */}
                        </div>
                    )
                })
            }
        </div>
    )
}
