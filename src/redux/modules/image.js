import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

import { storage } from '../../shared/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


// actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));



// initial
const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
}


// middlewares
const uploadImageFB = (image) => {
    return async function (dispatch, getState, { history }) {
        dispatch(uploading(true));
        const _uploadRef = ref(storage, `images/${image.name}`)

        await uploadBytes(_uploadRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        await getDownloadURL(ref(storage, `images/${image.name}`))
            .then((url) => {
                dispatch(uploadImage(url));
                console.log(url);
            })
    }
}


// reducer
export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),
}, initialState);


// export
const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
}

export { actionCreators }