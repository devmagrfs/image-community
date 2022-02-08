import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

function PostList(props) {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);


    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    }, [])

    return (
        <>
            {post_list.map((p, idx) => {
                console.log(p)
                if (user_info && p.user_info.user_id === user_info.uid) {
                    return <Post key={idx} {...p} is_me />
                }
                return <Post key={idx} {...p} />
            })}
        </>
    );
}


export default PostList;