import { useEffect, useState } from 'react'
import './App.css';
import axios from "axios"

function App() {

  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data)
      })
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="App">
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
  );
}

export default App;
