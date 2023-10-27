import React, { useState } from "react";
import { useSelector } from "react-redux";

const CommentsComponent = () => {
  const user = useSelector((state) => state.user.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const submitComment = () => {
    if (newComment) {
      const fullName = user ? user.fullName : "Anonymous"; // Check if the user is logged in
      const commentText = `${fullName}: ${newComment}`;
      setComments([...comments, commentText]);
      setNewComment("");
    }
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={submitComment} className="book-now-button-detail">Enter</button>
      </div>
    </div>
  );
};

export default CommentsComponent;
