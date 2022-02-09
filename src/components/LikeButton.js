import React from 'react';
import { useDispatch } from 'react-redux';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { actionCreators as LikeActions } from '../redux/modules/like';


function LikeButton(props) {
    const dispatch = useDispatch();
    const { post_id } = props;
    // 누가 클릭했는 지를 알려야함
    // 클릭해서 정보가 바뀌는 걸 redux에 업데이트
    // 파이어스토어에도 정보를 업데이트

    const [toggle, setToggle] = React.useState(false);

    const toggleHandle = () => {
        if (toggle === true) {
            dispatch(LikeActions.cancelLikeFB(post_id));
            setToggle(false)
        } else {
            dispatch(LikeActions.addLikeFB(post_id));
            setToggle(true)
        }

    }

    return (
        <>
            {toggle === false && <FavoriteBorderIcon onClick={toggleHandle} />}
            {toggle === true && <FavoriteIcon onClick={toggleHandle} />}
        </>
    );
}

export default LikeButton;