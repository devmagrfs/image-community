import React, { useEffect } from "react";
import { Button } from "../elements";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


const PostDetail = (props) => {
    const dispatch = useDispatch();
    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector((state) => state.post.list);

    const id = props.match.params.id;
    const post = post_list.find((p) => p.id === id);
    console.log(post)
    useEffect(() => {

        if (post) {
            return;
        }
        dispatch(postActions.getPostFB(id));
    });

    return (
        <>
            {post && (
                <>
                    <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
                </>
            )}
        </>
    );
};

export default PostDetail;
