import './App.css';
import React, {useState, useEffect} from 'react';

const Posts = () => {

//Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

  useEffect(() =>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //muutetaan json data javascriptiksi
    .then(oliot => setPosts(oliot))
  },[]
  )

  return (
    <>
        <h2 onClick={() =>setShowPosts(!showPosts)}>Show posts from typicode. Press here.</h2>

        {
          showPosts && posts && posts.map(p => 
            <div className='posts' key={p.id}>
            <h2>ID: {p.id}</h2>
            <h5>User ID: {p.userId}</h5>
            <h4>TITLE: {p.title}</h4>
            <p>{p.body}</p>
            </div>
            )
        }

    </>
  );
}

export default Posts;