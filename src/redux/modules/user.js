import { createAction, handleActions } from "redux-actions";    // 액션 및 리듀서를 편하게 만들어준다.
import { produce } from "immer";    // 불변성 관리하기 위함
// immer는 a라는 것을 받아서 a'를 만든다. 그리고 a'를 고치라고 한다.

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from '../../shared/firebase';
import {
    createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
    setPersistence, browserSessionPersistence, onAuthStateChanged, signOut
} from 'firebase/auth';


// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";


// action creator
// redux-actions에서 갖고온 creatAction을 쓴다.
// createAction(타입, (갖고 온 데이터)=>({갖고온 데이터}));
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));


// initialState
const initialState = {
    user: null,
    is_login: false,
}


// middleware actions
const loginFB = (id, pwd) => {
    return function (dispatch, getState, { history }) {

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, id, pwd)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        dispatch(
                            setUser({
                                user_name: user.displayName,
                                id: id,
                                user_profile: '',
                                uid: user.uid,
                            }));

                        history.push('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
}

const joinFB = (id, pwd, user_name) => {
    return function (dispatch, getState, { history }) {
        createUserWithEmailAndPassword(auth, id, pwd)
            .then((userCredential) => {
                console.log(userCredential)
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: user_name
                }).then(() => {
                    dispatch(setUser({ user_name: user_name, id: id, user_profile: '', uid: user.uid }));
                    history.push('/');
                }).catch((error) => {
                    console.log(error);
                });


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
}

const loginCheckFB = () => {
    return (dispatch, getState, { history }) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    user_name: user.displayName,
                    user_profile: "",
                    id: user.email,
                    uid: user.uid
                }))
            } else {
                dispatch(logOut());
            }
        });
    }
}

const logoutFB = () => {
    return function (dispatch, getState, { history }) {
        signOut(auth).then(() => {
            dispatch(logOut());
            history.replace('/');
        }).catch((error) => {
            // An error happened.
        });
    }
}


// reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user; // payload를 거쳐야 우리가 갖고온 값을 갖고올 수 있다.
        draft.is_login = true;
    }),

    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),

    [GET_USER]: (state, action) => { },
}, initialState)


// action creator export
const actionCreators = {
    joinFB,
    setUser,
    logOut,
    getUser,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };