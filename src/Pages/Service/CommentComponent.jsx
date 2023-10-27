import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CommentsComponent = () => {
  const user = useSelector((state) => state.user.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);

  const apiUrlCommentGet =
    "https://apis20231023230305.azurewebsites.net/api/Comment/Get?pageIndex=0&pageSize=10";

  useEffect(() => {
    fetch(apiUrlCommentGet)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract comment data and store it in the state
        setComments(data.result.items);
      })
      .catch((error) => {
        console.error("Error fetching comment data:", error);
      });
  }, []);

  // useEffect(() => {
  //   // Fetch customer names for each comment by their IDs
  //   const fetchCustomerNames = async () => {
  //     const updatedComments = await Promise.all(
  //       comments.map(async (comment) => {
  //         const apiUrlCustomerGet = `https://apis20231023230305.azurewebsites.net/api/Customer/GetById?id=${comment.customerId}`;
  //         try {
  //           const response = await fetch(apiUrlCustomerGet);
  //           if (!response.ok) {
  //             throw new Error(`Network response was not ok: ${response.status}`);
  //           }
  //           const customerData = await response.json();
  //           const customerName = customerData.result.fullName;
  //           return { ...comment, customerName };
  //         } catch (error) {
  //           console.error("Error fetching customer data:", error);
  //           return comment;
  //         }
  //       })
  //     );
        
  //     setComments(updatedComments);
  //   };

  //   fetchCustomerNames();
  // }, [comments]);

  const submitComment = () => {
    if (newComment) {
      const fullName = user ? user.fullName : "Anonymous";
      const commentText = `${fullName}: ${newComment}`;
      setComments([...comments, { commentContent: commentText }]);
      setNewComment("");
    } 
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {"Anonymous"}: {comment.commentContent}
          </div>
        ))}
      </div>
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={submitComment} className="book-now-button-detail">
          Enter
        </button>
      </div>
    </div>
  );
};

export default CommentsComponent;
