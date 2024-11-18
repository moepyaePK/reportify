import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebaseconfig'; // Firebase configuration
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../styles/home.css'; // Import custom CSS
import ReportifyLogo from '../assets/ReportifyLogo.png';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const mapRefs = useRef([]);

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

  // Load posts from Firestore
  useEffect(() => {
    const loadPosts = async () => {
      const postsContainer = [];
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
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

  // Helper function to determine critical level color
  const getCriticalLevelClass = (level) => {
    switch(level) {
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

  return (
    <div>
       <nav className="navbar" style={{ backgroundColor: '#b80a21' }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center">
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
        {posts.map((post, index) => (
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
            
            <hr />
          </div>
        ))}
      </div>

      <footer className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 999 }}>
  <div className="container-md">
    <Button variant="outline-danger" href="/home">Home</Button>
    <Button variant="outline-danger" href="/addpost">Add Post</Button>
  
    <Button variant="outline-danger" href="/user">User</Button>
  </div>
</footer>

    </div>
  );
};

export default Home;
