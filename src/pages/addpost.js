import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { db } from '../firebaseconfig'; // Import Firebase configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import '../styles/addpost.css';

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
      if (places.length == 0) return;

      marker.setMap(null);

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry || !place.geometry.location) return;

        marker = new window.google.maps.Marker({
          map: map,
          draggable: true,
          title: place.name,
          position: place.geometry.location,
        });

        window.google.maps.event.addListener(marker, 'dragend', function (evt) {
          setLocation(`${evt.latLng.lat()},${evt.latLng.lng()}`);
        });

        window.google.maps.event.addListener(map, 'click', function (event) {
          const clickedLocation = event.latLng;
          marker.setPosition(clickedLocation);
          setLocation(`${clickedLocation.lat()},${clickedLocation.lng()}`);
        });

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

    const newPost = {
      uid: user.uid,
      Name: name,
      Category: category,
      Location: location,
      'Phone Number': phoneNumber,
      'Scale Critical Level': criticalLevel,
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

  return (
    <div className="container mt-4">
      <h3>Add a New Post</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Critical Level</Form.Label>
          <Form.Control
            type="text"
            value={criticalLevel}
            onChange={(e) => setCriticalLevel(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Incident Location:</Form.Label>
          <input
            id="pac-input"
            className="form-control"
            type="text"
            placeholder="Search for a location"
            required
          />
          <div id="map" style={{ height: '300px', width: '100%', marginBottom: '20px' }}></div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
