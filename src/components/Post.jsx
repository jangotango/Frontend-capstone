import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../authContext";
import "./PostPage.css";

const PostPage = () => {
  const { authToken, isAuthenticated, logout } = useAuth();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://tony-blog-site-5f1feed3cdc2.herokuapp.com/get_posts");
      const filteredPosts = response.data.filter(post => post.content.trim() !== ""); // Filter out posts with empty content
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tony-blog-site-5f1feed3cdc2.herokuapp.com/create_post",
        { content },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("Post created:", response.data);
      setError("");
      setContent('');
      fetchPosts();

    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://tony-blog-site-5f1feed3cdc2.herokuapp.com/delete_post/${postId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Fetch updated posts after deletion
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError("Failed to delete post");
    }
  };

  return (
    <div className="post-page-container">
        
      <div className="banner">
        {isAuthenticated() ? (
          <h1 className="banner-title">Welcome to Your Profile!</h1>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
      
      <div className="post-title">
        Share something with Tony!
      </div>

      <form className="post-form" onSubmit={handleCreatePost}>
        <textarea
          className="post-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
        ></textarea>

        <button className="post-button" onClick={handleCreatePost}>
          Click here to post your thoughts
        </button>
      </form>

      <div className="post-list">
        <h2 className="post-title">Leave a comment!</h2>
        <ul className="post-ul">
          {posts.map((post) => (
            <li key={post.id} className="post-li">
              <div className="post-content">{post.content}</div>
              <div className="post-username">{post.user_email}</div>
              <span className="post-timestamp">
                {new Date(post.timestamp).toLocaleString()}
              </span>
              <button
                className="post-delete-button"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isAuthenticated() && (
        <button>
          <div className="logout-button" onClick={logout}>Logout</div></button>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PostPage;
