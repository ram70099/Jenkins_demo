// MyComponent.js
import React, { useEffect, useState } from 'react';
import './MyComponent.css';  // Import the CSS file

const MyComponent = () => {
  const [data, setData] = useState(null);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to track loading

  // Fetch data from API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Fetch all posts
      .then(response => response.json())
      .then(posts => {
        const randomIndex = Math.floor(Math.random() * posts.length);  // Generate random index
        const randomPost = posts[randomIndex];  // Get a random post
        setData(randomPost);  // Set the random post to state
        setLoading(false);  // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);  // Empty dependency array means this runs only once on mount

  return (
    <div className="my-component">
      <h1>Hello, this is a simple React component!</h1>
      <p>React is veryyy awesome!</p>

      {loading ? (
        <p>Loading data...</p>  // Show loading message while fetching data
      ) : (
        data && (
          <div className="data">
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        )
      )}
    </div>
  );
};

export default MyComponent;
