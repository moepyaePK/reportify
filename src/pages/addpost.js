// // src/AddPost.js
// import React, { useState } from 'react';
// import { db } from '../firebaseconfig'; // Firebase configuration
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';

// const AddPost = () => {
//   const [name, setName] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');
//   const [criticalLevel, setCriticalLevel] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "posts"), {
//         Name: name,
//         content: content,
//         Category: category,
//         Location: location,
//         "Scale Critical Level": criticalLevel,
//         "Phone Number": phoneNumber,
//         timestamp: serverTimestamp(),
//       });
//       alert('Post added successfully!');
//     } catch (error) {
//       console.error("Error adding post: ", error);
//       alert('Error adding post!');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Add a New Post</h3>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Content</Form.Label>
//           <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Location</Form.Label>
//           <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Critical Level</Form.Label>
//           <Form.Control type="text" value={criticalLevel} onChange={(e) => setCriticalLevel(e.target.value)} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">Submit</Button>
//       </Form>
//     </div>
//   );
// };

// export default AddPost;
// src/pages/AddPost.js
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { db } from '../firebaseconfig'; // Import Firebase configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

const AddPost = () => {
  // State to store form input values
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [criticalLevel, setCriticalLevel] = useState('');
  const [content, setContent] = useState('');

  // Firebase Authentication
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to submit a post.');
      return;
    }

    // Construct the new post object, including the UID of the logged-in user
    const newPost = {
      uid: user.uid, // Attach the user's UID
      Name: name,
      Category: category,
      Location: location,
      'Phone Number': phoneNumber,
      'Scale Critical Level': criticalLevel,
      content: content,
      timestamp: serverTimestamp(),
    };

    try {
      // Add the new post to the Firestore collection
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      console.log('Document written with ID: ', docRef.id); // Log the document ID

      // Reset the form fields after successful submission
      setName('');
      setCategory('');
      setLocation('');
      setPhoneNumber('');
      setCriticalLevel('');
      setContent('');

      // Redirect to the home page
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
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddPost;
