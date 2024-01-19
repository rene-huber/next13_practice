"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart  } from '@fortawesome/free-solid-svg-icons';



const LikeButton = ({ userEmail, slug }) => {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/like`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json()
          setLiked(data.isLiked)
          setLikesCount(data.likesCount)
          
        } else {
          console.error("Failed to Like")
          setLiked(false)
        }
      } catch (error) {
        console.error("Error:", error)
        setLiked(false)
      }
    };
console.log(checkIfLiked, "checkIfLiked52352352352352352352352");
    checkIfLiked()
  }, [userEmail, slug])

  const handleLike = async () => {
    
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${slug}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail , slug}),
      });

      if (response.ok) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      } else {
        console.log("error");
      }
    } catch (error) {
      // Manejar errores
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {liked ?  <FontAwesomeIcon icon={faHeart} style={{ fontSize: '24px', color: 'orange' }} /> :  <FontAwesomeIcon icon={faHeart} style={{ fontSize: '24px', color: 'red' }} /> }  
    {likesCount}
    </button>
  );
};

export default LikeButton;
