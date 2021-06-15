import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Profile() {

    // redirect url
    let history = useHistory()

    let { id } = useParams()
    const [username, setUsername] = useState('')
    const [listOfPosts, setListOfPosts] = useState([])
    const [currentUserId, setCurrentUserId] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })

        axios.get('http://localhost:3001/auth/validate', {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setCurrentUserId(response.data.id)
        })
    }, [id])

    const LikePost = (postId) => {
        axios.post("http://localhost:3001/likes",
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) return { ...post, Likes: [...post.Likes, { "UserId": currentUserId }] }
                    else {
                        const likeArray = post.Likes
                        likeArray.pop()
                        return { ...post, Likes: likeArray }
                    }
                } else {
                    return post
                }
            }))
        })
    }

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username}</h1>
            </div>
            <div className="listOfPosts">
                {
                    listOfPosts.map((value, key) => {
                        return (
                            <div className="post" key={key} >
                                <div className="title" onClick={() => history.push(`/post/${value.id}`)}>
                                    {value.title}
                                </div>
                                <div className="body" onClick={() => history.push(`/post/${value.id}`)}>
                                    {value.postText}
                                </div>
                                <div className="footer">
                                    <div className="username">{value.username}</div>
                                    <div className="buttons">
                                        {
                                            value.Likes.filter(v => v.UserId === currentUserId).length > 0 ?
                                                <FavoriteIcon onClick={() => LikePost(value.id)} />
                                                :
                                                <FavoriteBorderIcon onClick={() => LikePost(value.id)} />
                                        }
                                        <label>{value.Likes.length}</label>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile
