import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from '../../shared/firebase';
import { collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from '../../shared/firebase';
import moment from "moment";
import 'moment/locale/ko';

import { actionCreators as imageActions } from './image';


// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";


// createActions
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
}));

// initialState
const initialState = {
    list: [],
}

const initialPost = {
    image_url: "https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200",
    contents: "루루루루루루",
    comments_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    layout: "bottom",
}


// middlewares
const getPostFB = () => {
    return async function (dispatch, getState, { history }) {
        const postRef = collection(firestore, "post");
        let que = query(postRef, orderBy("insert_dt", "desc"), limit(2));

        const querySnapshot = await getDocs(que);
        let post_list = [];

        querySnapshot.forEach((doc) => {
            let _post = doc.data();

            _post.insert_dt = moment(_post.insert_dt).fromNow();


            let post = Object.keys(_post).reduce((acc, cur) => {
                if (cur.indexOf("user_") !== -1) {
                    return {
                        ...acc,
                        user_info: { ...acc.user_info, [cur]: _post[cur] }
                    };
                }
                return { ...acc, [cur]: _post[cur] };
            }, { id: doc.uid, user_info: {} });
            post_list.push(post);

        });
        dispatch(setPost(post_list));
    }
}


const addPostFB = (contents = "", layout = "bottom") => {
    return async function (dispatch, getState, { history }) {
        const _user = getState().user.user;

        const user_info = {
            user_id: _user.uid,
            user_name: _user.user_name,
            user_profile: _user.user_profile
        }

        const _post = {
            ...initialPost,
            layout,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        }

        const _image = getState().image.preview;
        const storageRef = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);

        await uploadString(storageRef, _image, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');

            getDownloadURL(ref(storage, storageRef))
                .then((url) => {
                    return url;
                }).then(url => {
                    addDoc(collection(firestore, "post"), {
                        ...user_info,
                        ..._post,
                        image_url: url
                    }).then((doc) => {
                        let post = { user_info, ..._post, id: doc.id, image_url: url };
                        dispatch(addPost(post));
                        history.replace("/");

                        dispatch(imageActions.setPreview(null));
                    }).catch((err) => {
                        window.alert("포스트 작성에 실패했어요.")
                        console.log("포스트 작성에 실패했어요.", err);
                    })
                })
        }).catch((err) => {
            window.alert("이미지 업로드에 문제가 있습니다.")
            console.log("이미지 업로드에 문제가 있습니다.", err);
        })
    }
}


const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            console.log("게시물 정보가 없어요!");
            return;
        }

        const _image = getState().image.preview;

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];

        console.log(_post);

        const postDB = firestore.collection("post");

        if (_image === _post.image_url) {
            postDB
                .doc(post_id)
                .update(post)
                .then((doc) => {
                    dispatch(editPost(post_id, { ...post }));
                    history.replace("/");
                });

            return;
        } else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");

            _upload.then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);

                        return url;
                    })
                    .then((url) => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then((doc) => {
                                dispatch(editPost(post_id, { ...post, image_url: url }));
                                history.replace("/");
                            });
                    })
                    .catch((err) => {
                        window.alert("앗! 이미지 업로드에 문제가 있어요!");
                        console.log("앗! 이미지 업로드에 문제가 있어요!", err);
                    });
            });
        }
    };
};


// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),

        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
                let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

                draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
            }),
    }, initialState)


// action creator export
const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
}

export { actionCreators };