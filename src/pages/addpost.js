import React, { useState, useEffect } from 'react';
import '../styles/addpost.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { db } from '../firebaseconfig'; // Import Firebase configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Navbar } from 'react-bootstrap';
import ReportifyLogo from '../assets/ReportifyLogo.png'; // Add the logo image

const AddPost = () => {
  // State to store form input values
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [criticalLevel, setCriticalLevel] = useState('');
  const [content, setContent] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Firebase Authentication
  const auth = getAuth();

  useEffect(() => {
    // Load Google Maps
    if (!mapLoaded) {
      window.initMap = initMap;
      loadGoogleMapsAPI();
    }
  }, [mapLoaded]);

  const loadGoogleMapsAPI = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDj1K-TPYo4CP503mBHL-n5Fhzr1kV4XKs&libraries=places&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  };

  const initMap = () => {
    const defaultLocation = { lat: 15.870042, lng: 100.992526 }; // Default center (Thailand)

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 6,
    });

    const marker = new window.google.maps.Marker({
      map: map,
      draggable: true,
      position: defaultLocation,
    });

    window.google.maps.event.addListener(marker, 'dragend', function (evt) {
      setLocation(`${evt.latLng.lat()},${evt.latLng.lng()}`);
    });

    window.google.maps.event.addListener(map, 'click', function (event) {
      const clickedLocation = event.latLng;
      marker.setPosition(clickedLocation);
      setLocation(`${clickedLocation.lat()},${clickedLocation.lng()}`);
    });

    const input = document.getElementById('pac-input');
    const searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function () {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      marker.setMap(null);

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry || !place.geometry.location) return;

        marker.setMap(map);
        marker.setPosition(place.geometry.location);
        setLocation(`${place.geometry.location.lat()},${place.geometry.location.lng()}`);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    setMapLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to submit a post.');
      return;
    }

    // Format Category and Critical Level
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    const formattedCriticalLevel = criticalLevel.charAt(0).toUpperCase() + criticalLevel.slice(1).toLowerCase();

    const newPost = {
      uid: user.uid,
      Name: name,
      Category: formattedCategory,
      Location: location,
      'Phone Number': phoneNumber,
      'Scale Critical Level': formattedCriticalLevel,
      content: content,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      console.log('Document written with ID: ', docRef.id);

      setName('');
      setCategory('');
      setLocation('');
      setPhoneNumber('');
      setCriticalLevel('');
      setContent('');

      window.location.href = '/home';
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting your post.');
    }
  };

  const getCriticalLevelDot = () => {
    switch (criticalLevel) {
      case 'High':
        return <span className="dot red"></span>;  // Red for High
      case 'Medium':
        return <span className="dot orange"></span>; // Orange for Medium
      case 'Low':
        return <span className="dot yellow"></span>; // Yellow for Low
      default:
        return null;
    }
  };

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
      <div className="container">
        <div className="card border-light-subtle shadow-sm mt-4">
          <div className="row g-0">
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h3>Add a New Post</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 gy-md-4">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="transportation">Transportation</option>
                        <option value="natural_disasters">Natural Disasters</option>
                        <option value="public_infrastructure">Public Infrastructure</option>
                        <option value="public_space_accidents">Public Space Accidents</option>
                        <option value="health_concerns">Health Concerns</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="criticalLevel" className="form-label">
                        Critical Level <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        id="criticalLevel"
                        value={criticalLevel}
                        onChange={(e) => setCriticalLevel(e.target.value)}
                        required
                      >
                        <option value="">Select Critical Level</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        id="pac-input"
                        className="form-control"
                        type="text"
                        placeholder="Search for a location"
                      />
                      <div id="map" style={{ height: '300px', width: '100%' }}></div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="content" className="form-label">
                        Additional Comments
                      </label>
                      <textarea
                        className="form-control"
                        id="content"
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-danger w-100">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-md-6 text-bg-primary">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-10 col-xl-8 py-3">
                <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src={ReportifyLogo}
                    width="245"
                    height="50"
                    alt="Reportify Logo"
                  />
                  <h2 className="text-white">Don't forget to fill the imformations properlly</h2>
                  <p className="lead text-white">
                    Make sure to re-check your answers, your imformations mean a lot to the environment 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
