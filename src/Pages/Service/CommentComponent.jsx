import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../Store/userSlice';
import { logoutUser, getUserInfoInLocalStorage } from '../../Store/userSlice';
import moment from 'moment';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import _get from 'lodash/get';

const CommentsComponent = ({ serviceFeedbacks = [], serviceId, userId, onChange }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
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
            createFeedbackMutation.mutate(newComment);
            setNewComment('');
        }
    };

    const createFeedbackMutation = useMutation(
        async (content) => {
            return await axios.post(`https://apis20231023230305.azurewebsites.net/api/ServiceFeedback/Create`, {
                content: content,
                customerId: user?.id,
                birdServiceId: serviceId,
                rating: rating,
            });
        },
        {
            onSuccess: (data) => {
                onChange();
                if (data.data?.status === 'BadRequest') {
                    toast.error(data.data?.message);
                } else {
                    toast.success('Create feedback success');
                }
            },

            onError: () => {
                toast.error('Create feedback fail');
            },
        }
    );
        console.log(user);
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
                            <div className="text-lg font-bold">{user.customerName}</div>
                            <div>
                                <Rating className="w-32 h-8" value={comment.rating} onChange={() => {}} readOnly />
                            </div>
                        </div>
                        <div>{comment?.content}</div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start gap-4 mt-4 mb-4">
                Leave a comment as <span className="font-semibold"></span>
                <Rating className="w-32 h-8" value={rating} onChange={setRating} />
            </div>
            <div className="text-lg">
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    className="w-full h-32 p-4 border-2 border-green-300 border-dashed rounded-lg shadow-lg"
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    onClick={submitComment}
                    className="bg-[#34a853] inline-block px-8 py-3 rounded-md text-white hover:bg-[#228b22] duration-300"
                    disabled={user === null}
                >
                    {user === null ? 'Login to comment' : 'Comment'}
                </button>
            </div>
        </div>
    );
};

export default CommentsComponent;
