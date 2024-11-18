import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {  onAuthStateChanged } from "firebase/auth";
import {collection, query, where,getDocs,} from "firebase/firestore";
import {db, auth} from "../firebaseconfig";

const PostHistory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid; // Get the UID of the logged-in user
        await fetchUserPosts(uid);
      } else {
        navigate("/login"); // Redirect to login page if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserPosts = async (uid) => {
    try {
      const postsQuery = query(collection(db, "posts"), where("uid", "==", uid));
      const querySnapshot = await getDocs(postsQuery);

      if (querySnapshot.empty) {
        setPosts([]);
      } else {
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-history-container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Reportify</span>
          <i
            className="bi bi-person-circle fs-4"
            style={{ color: "#b80a21", cursor: "pointer" }}
            onClick={() => navigate("/")}
          ></i>
        </div>
      </nav>

      <div className="content">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.Name}</h3>
              <p>Category: {post.Category}</p>
              <p>Location: {post.Location}</p>
              <p>Content: {post.content}</p>
              <p>Posted on: {new Date(post.timestamp?.seconds * 1000).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default PostHistory;
