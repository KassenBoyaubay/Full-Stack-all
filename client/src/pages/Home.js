import { useEffect, useState } from 'react'
import axios from "axios"

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])

    useEffect(() => {
        const getPosts = () => {
            axios.get("http://localhost:3001/posts").then((response) => {
                setListOfPosts(response.data)
            })
        }

        getPosts()

        const timer = setTimeout(() => {
            getPosts()
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key}>
                            <div className="title">
                                {value.title}
                            </div>
                            <div className="body">
                                {value.postText}
                            </div>
                            <div className="footer">
                                {value.username}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
