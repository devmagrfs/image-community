import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, Input } from '../elements';
import { actionCreators as imageActions } from '../redux/modules/image';


function Upload(props) {
    const dispatch = useDispatch();
    const fileInput = React.useRef();
    const [fileName, setFileName] = React.useState("");
    // const is_uploading = useSelector(state => state.image.uploading);

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        }
        setFileName(e.target.value.split("\\")[2]);
    }

    return (
        <Grid is_flex>
            {/* <Input
                width="100%"
                type="text"
                placeholder="사진을 선택해주세용!"
                value={fileName}
                margin="0"
                disabled
            /> */}
            <input
                // class="uploadBtn"
                type="file"
                onChange={selectFile}
                ref={fileInput}
            // style={{ display: 'none' }}
            />
            {/* <Button width="50px" text="업로드">
                <label htmlFor="uploadBtn">파일 찾기</label>
            </Button> */}
        </Grid>
    );
}

export default Upload;