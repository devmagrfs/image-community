import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    const { history } = props;

    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    const [contents, setContents] = React.useState("");
    const [layout, setLayout] = React.useState(_post ? _post.layout : "bottom");


    React.useEffect(() => {
        if (is_edit && !_post) {
            console.log("포스트 정보가 없어요!");
            history.goBack();

            return;
        }

        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));

        }
    }, []);


    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents: contents, layout }));
    }

    const is_layoutChecked = (e) => {
        if (e.target.checked) {
            setLayout(e.target.value);
        }
    };

    if (!is_login) {
        return (
            <Grid margin="100px 0" padding="16px" textAlign="center">
                <Text size="32px">로그인 후에만 글을 쓸 수 있어요</Text>
                <Button
                    _onClick={() => { history.replace('/login') }}
                    text="로그인 하러가기"
                    fontSize="24px">
                </Button>
            </Grid>
        )
    }

    return (
        <>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
                <Upload />
            </Grid>


            <Grid padding="16px">
                <Text bold size="20px" margin="20px 0">
                    레이아웃 고르기
                </Text>

            </Grid>



            <Grid padding="16px">
                <input
                    type="radio"
                    name="layout"
                    value="right"
                    id="right"
                    onChange={is_layoutChecked}
                />
                <label htmlFor="right">
                    <strong
                        style={
                            layout === "right"
                                ? { color: "#1B9CFC", margin: "10px" }
                                : null
                        }
                    >
                        오른쪽에 이미지 왼쪽에 텍스트
                    </strong>
                </label>
            </Grid>

            <Grid padding="16px">
                <input
                    type="radio"
                    name="layout"
                    value="left"
                    id="left"
                    onChange={is_layoutChecked}
                />
                <label htmlFor="left">
                    <strong
                        style={
                            layout === "left"
                                ? { color: "#1B9CFC", margin: "10px" }
                                : null
                        }
                    >
                        왼쪽에 이미지 오른쪽에 텍스트
                    </strong>
                </label>
            </Grid>

            <Grid padding="16px">
                <input
                    type="radio"
                    name="layout"
                    value="bottom"
                    id="bottom"
                    onChange={is_layoutChecked}
                    style={{ color: "skyblue" }}
                />
                <label htmlFor="bottom">
                    {" "}
                    <strong
                        style={
                            layout === "bottom"
                                ? { color: "#1B9CFC", margin: "10px" }
                                : null
                        }
                    >
                        하단에 이미지 상단에 텍스트
                    </strong>
                </label>
            </Grid>


            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>
                        미리보기
                    </Text>
                </Grid>

                {
                    layout === "bottom" &&
                    <>
                        <Grid padding="16px">
                            <Grid>
                                <Input
                                    _onChange={changeContents}
                                    placeholder="게시글 작성3"
                                    multiLine
                                    height="250px"
                                />
                            </Grid>

                            <Image
                                shape="rectangle"
                                src={
                                    preview
                                        ? preview
                                        : "http://via.placeholder.com/400x300"
                                }
                            />
                        </Grid>
                    </>
                }
                {
                    layout === "right" &&
                    <>
                        <Grid is_flex>
                            <Grid >
                                <Input
                                    _onChange={changeContents}
                                    placeholder="게시글 작성1"
                                    multiLine
                                    height="233.76px"
                                />
                            </Grid>

                            <Image
                                shape="rectangle"
                                src={
                                    preview
                                        ? preview
                                        : "http://via.placeholder.com/400x300"
                                }
                            />
                        </Grid>
                    </>
                }
                {
                    layout === "left" &&
                    <>
                        <Grid padding="16px" is_flex>
                            <Image
                                shape="rectangle"
                                src={
                                    preview
                                        ? preview
                                        : "http://via.placeholder.com/400x300"
                                }
                            />
                            <Grid>
                                <Input
                                    _onChange={changeContents}
                                    placeholder="게시글 작성2"
                                    multiLine
                                    height="233.76px"
                                />
                            </Grid>
                        </Grid>
                    </>
                }

            </Grid>


            <Grid padding="16px">
                {is_edit
                    ? (
                        <Button
                            text="게시글 수정"
                            _onClick={editPost}
                        >
                        </Button>
                    )
                    : (
                        <Button
                            text="게시글 작성"
                            _onClick={addPost}
                        >
                        </Button>
                    )
                }
            </Grid>


        </>
    );
}

export default PostWrite;