// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import moment from "moment";

// import { firestore } from '../../shared/firebase';
// import { collection, addDoc, updateDoc, increment, doc, deleteDoc, query } from "firebase/firestore";
// import { actionCreators as postActions } from "./post";


// // action
// const SET_LIKE = "SET_LIKE";
// const ADD_LIKE = "ADD_LIKE";
// const CANCEL_LIKE = "CANCEL_LIKE";


// // action creator
// const setLike = createAction(SET_LIKE, (post_id, user_list) => ({
//     post_id,
//     user_list,
// }));

// const addLike = createAction(ADD_LIKE, (post_id, user_id) => ({
//     post_id,
//     user_id,
// }));

// const cancelLike = createAction(CANCEL_LIKE, (post_id, user_id) => ({
//     post_id,
//     user_id,
// }));


// // initialState
// const initialState = {
//     list: [],
// }

// // middleware
// const getLikeFB = (post_id) => {
//     return function (dispatch, getState, { history }) {
//         const likeRef = query(collection(firestore, "like"));

//         likeRef
//             .where("post_id", "==", post_id)
//             .get()
//             .then((docs) => {
//                 let list = [];
//                 docs.forEach((d) => {
//                     list.push(d.data().user_id);
//                 });
//                 console.log(list);

//                 dispatch(setLike(post_id, list));
//             })
//     }
// }


// const addLikeFB = (post_id) => {
//     return async function (dispatch, getState, { history }) {
//         const likeRef = collection(firestore, "like");
//         const _user = getState().user.user;

//         let like = {
//             post_id: post_id,
//             user_id: _user.uid,
//             user_name: _user.user_name,
//             insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
//         }

//         await addDoc(likeRef, {
//             like
//         }).then((docs) => {
//             const postRef = doc(firestore, "post", post_id);
//             const post = getState().post.list.find((l) => l.id === post_id);

//             updateDoc(postRef, { like_cnt: increment(1) })
//                 .then(() => {
//                     dispatch(addLike(post_id, _user.uid));
//                 })

//             dispatch(postActions.editPost(post_id, {
//                 like_cnt: parseInt(post.like_cnt) + 1,
//             }))
//         })
//     };
// }

// const cancelLikeFB = (post_id) => {
//     return async function (dispatch, getState, { histoyry }) {
//         const likeRef = collection(firestore, "like");
//         const _user = getState().user.user;

//         await deleteDoc(likeRef)
//             .then(() => {
//                 const postRef = doc(firestore, "post", post_id);
//                 const post = getState().post.lis.find((l) => l.id === post_id);

//                 updateDoc(postRef, { like_cnt: increment(-1) })
//                     .then(() => {
//                         dispatch(cancelLike(post_id, _user.uid));
//                     })
//                 dispatch(postActions.editPost(post_id, {
//                     like_cnt: parseInt(post.like_cnt) - 1,
//                 }))
//             })

//     }
// }

// // reducer
// export default handleActions(
//     {
//         [SET_LIKE]: (state, action) =>
//             produce(state, (draft) => {
//                 draft.list[action.payload.post_id] = action.payload.user_list;
//             }),

//         [ADD_LIKE]: (state, action) =>
//             produce(state, (draft) => {
//                 draft.list[action.payload.post_id].push(action.payload.user_id);
//             }),

//         [CANCEL_LIKE]: (state, action) =>
//             produce(state, (draft) => {

//             }),
//     },
//     initialState
// );

// const actionCreators = {
//     getLikeFB,
//     addLikeFB,
//     cancelLikeFB,
// };

// export { actionCreators };
