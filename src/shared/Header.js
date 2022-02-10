import React from 'react';
import { Grid, Button } from '../elements';

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from "../redux/configureStore";
import { apiKey } from './firebase';

import SvgIcon from '@mui/material/SvgIcon';


function Header(props) {
    function HomeIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }


    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.user);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    if (is_login && is_session) {
        return (
            <>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <HomeIcon
                            style={{ color: "#FF6666", fontSize: "50px" }}
                            onClick={() => {
                                history.push("/")
                            }}
                        />

                    </Grid>

                    <Grid is_flex>
                        <Button text="내 정보" margin="10px"></Button>
                        <Button
                            text="알림"
                            margin="10px"
                            _onClick={() => {
                                history.push('/noti');
                            }}>
                        </Button>
                        <Button
                            text="로그아웃"
                            margin="10px"
                            _onClick={() => {
                                dispatch(userActions.logoutFB({}))
                            }}>
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <Grid is_flex padding="4px 16px" margin="20px 0 50px 0">
            <Grid>
                <HomeIcon
                    style={{ color: "#FF6666", fontSize: "50px" }}
                    onClick={() => {
                        history.push("/")
                    }}
                />
            </Grid>

            <Grid is_flex>
                <Button
                    text="로그인"
                    margin="10px"
                    _onClick={() => {
                        history.push('/login');
                    }}></Button>
                <Button
                    text="회원가입"
                    margin="10px"
                    _onClick={() => {
                        history.push('/join');
                    }}></Button>
            </Grid>
        </Grid>
    )
}

Header.defaultProps = {}

export default Header;