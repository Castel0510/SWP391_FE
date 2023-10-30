import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../Store/userSlice";
import { logoutUser, getUserInfoInLocalStorage } from '../../Store/userSlice';

const CommentsComponent = () => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);
  // const [user, setUser] = useState('');
  // const userID = user ? user.Id : null;

  const user = useSelector(getUserInfoInLocalStorage);



  // const dataUser = useSelector((state) => state.user);
  // useEffect(() => {
  //   setUser(getUser());

  // }, [dataUser]);

console.log(user);

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
        setComments(data.result.items);
      })
      .catch((error) => {
        console.error("Error fetching comment data:", error);
      });
  }, []);



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
