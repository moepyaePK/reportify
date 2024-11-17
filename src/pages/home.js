// src/Home.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig'; // Firebase configuration
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Load posts from Firestore
  useEffect(() => {
    const loadPosts = async () => {
      const postsContainer = [];
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"),);
      try {
        const snapshot = await getDocs(postsQuery);
        snapshot.forEach((doc) => {
          postsContainer.push(doc.data());
        });
        setPosts(postsContainer);
      } catch (error) {
        console.error("Error loading posts: ", error);
      }
    };

    loadPosts();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Reportify</span>
          <a href="#!" className="ms-auto">
            <i className="bi bi-person-circle fs-4" style={{ color: '#b80a21' }} onClick={() => window.location.href = 'user.html'}></i>
          </a>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            {posts.map((post, index) => (
              <div key={index} className="post mb-3">
                <h5>Report by: {post.Name}</h5>
                <p><strong>Content:</strong> {post.content}</p>
                <p><strong>Category:</strong> {post.Category}</p>
                <p><strong>Location:</strong> <a href={post.Location} target="_blank" rel="noopener noreferrer">{post.Location}</a></p>
                <p><strong>Critical Level:</strong> {post["Scale Critical Level"]}</p>
                <p><strong>Phone Number:</strong> {post["Phone Number"]}</p>
                <p><strong>Timestamp:</strong> {post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-md">
          <Button variant="outline-danger" href="/">Home</Button>
          <Button variant="outline-danger" href="/addpost">Add Post</Button>
          <Button variant="outline-danger">Maps</Button>
          <Button variant="outline-danger"  href="/user">User</Button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
