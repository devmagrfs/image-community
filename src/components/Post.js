import React from 'react';
import { Grid, Image, Text, Button } from '../elements';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';

import { actionCreators as postActions } from '../redux/modules/post';
// import { actionCreators as likeActions } from '../redux/modules/like';
import LikeButton from './LikeButton';

function Post(props) {
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     dispatch(likeActions.getLikeFB(id));
    // }, [dispatch])

    const {
        user_info,
        image_url,
        contents,
        like_cnt,
        insert_dt,
        id,
        layout,
        user_profile,
        is_me,
        comments_cnt
    } = props;

    const deletePost = () => {
        dispatch(postActions.deletePostFB(id));
    }

    return (
        <>
            <Grid border="3px solid blue" margin="0 0 30px 0" borderRadius="10px">
                <Grid is_flex>
                    <Grid width="100%" is_flex>
                        <Image size="50" shape="circle" src={user_profile} />
                        <Text bold>{user_info.user_name}</Text>
                    </Grid>
                    <Grid width="40%" is_flex>
                        <Text>{insert_dt}</Text>
                        {is_me &&
                            (
                                <>
                                    <Button
                                        text="수정"
                                        width="40%"
                                        padding="4px"
                                        margin="4px"
                                        _onClick={() => {
                                            history.push(`/write/${id}`)
                                        }}>
                                    </Button>
                                    <Button
                                        text="삭제"
                                        width="40%"
                                        padding="4px"
                                        margin="4px"
                                        _onClick={deletePost}
                                    >
                                    </Button>
                                </>
                            )}
                    </Grid>
                </Grid>

                {layout === "bottom" && (
                    <Grid>
                        <Grid
                            _onClick={() => {
                                history.push(`/post/${id}`);
                            }}
                            textAlign="center"
                        >
                            <Text margin="10px auto 30px auto" width="30%" size="15px" bg={"beige"}>
                                {contents}
                            </Text>
                            <Image shape="rectangle" src={image_url} />
                        </Grid>
                    </Grid>
                )}




                {layout === "right" && (
                    <Grid>
                        <Grid
                            is_flex
                            _onClick={() => {
                                history.push(`/post/${id}`);
                            }}
                        >
                            <Text margin="10px" width="80%" center size="15px" bg={"beige"}>
                                {contents}
                            </Text>
                            <Image half shape="big_square" src={image_url} />
                        </Grid>
                    </Grid>
                )}



                {layout === "left" && (
                    <Grid>
                        <Grid
                            is_flex
                            _onClick={() => {
                                history.push(`/post/${id}`);
                            }}
                        >
                            <Image half shape="big_square" src={image_url} />
                            <Text margin="10px" width="80%" center bg={"beige"}>
                                {contents}
                            </Text>
                        </Grid>
                    </Grid>
                )}

                <Grid is_flex>
                    <Grid is_flex width="200px" padding="16px" bg={"#f2f4f7"}>
                        <Text bold bg={"#f2f4f7"}>댓글 {comments_cnt}개</Text>
                        <Text bold bg={"#f2f4f7"}>좋아요 {like_cnt}개</Text>
                    </Grid>

                    {/* <LikeButton post_id={id} /> */}
                </Grid>
            </Grid>
        </>
    );
}

Post.defaultProps = {
    user_info: {
        user_name: "라라",
        user_nickname: "리리",
        user_profile: "https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200",
    },

    image_url: "https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200",
    contents: "루루루루루루",
    comments_cnt: 0,
    insert_dt: "2022-02-05 10:00:00",
};

export default Post;