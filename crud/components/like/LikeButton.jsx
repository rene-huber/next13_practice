// components/LikeButton.js

import React, { useState, useEffect } from 'react';

const LikeButton = ({ userEmail, slug }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Implementar la lógica para verificar si el usuario ya ha dado "like"
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/liked`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLiked(data.isLiked);
        } else {
          // Manejar errores, por ejemplo, establecer liked en false
          setLiked(false);
        }
      } catch (error) {
        // Manejar errores, por ejemplo, establecer liked en false
        setLiked(false);
      }
    };

    checkIfLiked();
  }, [userEmail, slug]);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${slug}/${liked ? 'unlike' : 'like'}`, {
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });

      if (response.ok) {
        setLiked(!liked);
      } else {
        // Manejar errores
      }
    } catch (error) {
      // Manejar errores
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
