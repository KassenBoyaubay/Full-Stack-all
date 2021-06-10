import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'

function Post() {
    // id from url
    let { id } = useParams()

    const [postObject, setPostObject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data)
        })
    }, [id])

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">
                        {postObject.title}
                    </div>
                    <div className="body">
                        {postObject.postText}
                    </div>
                    <div className="footer">
                        {postObject.username}
                    </div>
                </div>
            </div>
            <div className="rightSide">
                Comment Section
            </div>
        </div>
    )
}

export default Post
