import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebaseconfig'; // Firebase configuration
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css'; // Import custom CSS
import ReportifyLogo from '../assets/ReportifyLogo.png';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const PostHistory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRefs = useRef([]);
  const navigate = useNavigate();

  // Dynamically load Google Maps API
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDj1K-TPYo4CP503mBHL-n5Fhzr1kV4XKs`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded');
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []); // Load the API only once when component mounts

  // Fetch user posts on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid; // Get the UID of the logged-in user
        await loadPosts(uid);
      } else {
        navigate("/login"); // Redirect to login page if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]); // Runs when the user logs in

  const loadPosts = async (uid) => {
    const postsContainer = [];
    const postsQuery = query(collection(db, "posts"), where("uid", "==", uid));
    try {
      const snapshot = await getDocs(postsQuery);
      snapshot.forEach((doc) => {
        postsContainer.push({ id: doc.id, ...doc.data() });
      });
  
      // Sort the posts array by timestamp (in descending order)
      postsContainer.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
  
      setPosts(postsContainer);
    } catch (error) {
      console.error("Error loading posts: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle deletion of a post
  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId)); // Remove post from the state
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Helper function to determine critical level color
  const getCriticalLevelClass = (level) => {
    switch (level) {
      case 'High':
        return 'high-level';
      case 'Medium':
        return 'medium-level';
      case 'Low':
        return 'low-level';
      default:
        return ''; // Default if no critical level is found
    }
  };

  useEffect(() => {
    posts.forEach((post, index) => {
      const mapElement = mapRefs.current[index];
      if (mapElement && window.google) { // Ensure Google Maps API is loaded
        const coords = post.Location.split(',');
        const latLng = { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) };
        const map = new window.google.maps.Map(mapElement, {
          center: latLng,
          zoom: 8,
        });

        const marker = new window.google.maps.Marker({
          position: latLng,
          map: map,
          title: post.Location,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<p>${post.Location}</p>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    });
  }, [posts]);

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#b80a21' }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="preview.html">
            <img
              src={ReportifyLogo}
              alt="Reportify Logo"
              width="80"
              height="40"
              className="d-inline-block me-2"
            />
            <span className="text-white">Reportify</span>
          </a>
        </div>
      </nav>
      <div className="content">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post">
              <h5>Report by: {post.Name}</h5>
              <p><strong>Content:</strong> {post.content}</p>
              <p><strong>Category:</strong> {post.Category}</p>
              <p><strong>Location:</strong> <a href={post.Location} target="_blank" rel="noopener noreferrer">{post.Location}</a></p>

              {/* Critical Level with colored dot */}
              <p>
                <strong>Critical Level:</strong> 
                <span 
                  className={`critical-level ${getCriticalLevelClass(post["Scale Critical Level"])}`}
                ></span> 
                {post["Scale Critical Level"]}
              </p>

              <p><strong>Phone Number:</strong> {post["Phone Number"]}</p>
              <p><strong>Timestamp:</strong> {post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>

              {/* Map container */}
              <div
                ref={(el) => (mapRefs.current[index] = el)}
                className="map-container"
              ></div>

              <Button 
                variant="danger" 
                onClick={() => deletePost(post.id)} 
                className="mt-2"
              >
                Delete Post
              </Button>
              <hr />
            </div>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-md">
          <Button variant="outline-danger" href="/">Home</Button>
          <Button variant="outline-danger" href="/addpost">Add Post</Button>
          <Button variant="outline-danger">Maps</Button>
          <Button variant="outline-danger" href="/user">User</Button>
        </div>
      </nav>
    </div>
  );
};

export default PostHistory;
