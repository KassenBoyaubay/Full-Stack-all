import { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'

function Home() {

    const [listOfPosts, setListOfPosts] = useState([])

    // redirect url
    let history = useHistory()

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
        <div className="homeContainer">
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key} onClick={() => history.push(`/post/${value.id}`)}>
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
