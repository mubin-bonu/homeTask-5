import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { fetchComment } from '../redux/reducers/commentReducer';
import { fetchPosts } from '../redux/reducers/postReducer';
import Comment from './Comments';

const Post = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const postsName = () => dispatch(fetchPosts())

    const posts = useSelector(state => state.posts.posts)
    const {comments} = useSelector(state => state.comments)

    const getComments = (id) => {
        setShow(!show)
        dispatch(fetchComment(id))
    }


    return (
        <div>
            <div>{postsName()}</div>
            {
                posts &&
                <>
                    <h1>Posts</h1>
                    <ul>
                        {
                            posts?.map(item =>
                                <li key={item?.id}>
                                <button onClick={() => getComments(item?.id)} variant='text'>{item?.title}</button>
                                {show && comments.length > 0 && (
                                    <Comment comments={comments}/>
                                )}
                                </li>)
                        }
                    </ul>
                </>
            }
        </div>
    );
};

export default Post;