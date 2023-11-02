import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';
import { logoutUser, getUserInfoInLocalStorage } from '../../Store/userSlice';
import moment from 'moment';

const CommentsComponent = ({ serviceFeedbacks = [] }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    // const [user, setUser] = useState('');
    // const userID = user ? user.Id : null;

    const user = useSelector(getUserInfoInLocalStorage);

    // const dataUser = useSelector((state) => state.user);
    // useEffect(() => {
    //   setUser(getUser());

    // }, [dataUser]);

    useEffect(() => {
        setComments(serviceFeedbacks);
    }, [serviceFeedbacks]);

    const submitComment = () => {
        if (newComment) {
            setComments([...comments, { content: newComment }]);
            setNewComment('');
        }
    };

    return (
        <div className="flex flex-col mt-16">
            <h2 className="text-2xl font-semibold">Comments</h2>
            <div className="flex flex-col gap-4 mt-8">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 p-4 bg-white border-2 border-green-300 border-dashed rounded-lg shadow-lg"
                    >
                        <div className="flex justify-between">
                            <div className="text-lg font-bold">Anonymous</div>
                            <div>{moment(comment?.createdDate).format('DD/MM/YYYY')}</div>
                        </div>
                        <div>{comment?.content}</div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start gap-4 mt-4 mb-8">
                <div className="text-lg">
                    Leave a comment as <span className="font-semibold">Anonymous</span>
                </div>

                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    className="w-full h-32 p-4 border-2 border-green-300 border-dashed rounded-lg shadow-lg"
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    onClick={submitComment}
                    className="bg-[#34a853] inline-block px-8 py-3 rounded-md text-white hover:bg-[#228b22] duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CommentsComponent;
