import React from 'react';
import { Button, Input, Grid, Text } from '../elements';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";



function Login(props) {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {
        if (id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호가 공란입니다.")
            return;
        }

        dispatch(userActions.loginFB(id, pwd));
    }

    return (
        <>
            <Grid padding="16px">
                <Text size="32px" bold>
                    로그인
                </Text>

                <Grid padding="16px 0">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0">
                    <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        _onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Grid>

                <Button
                    text="로그인"
                    _onClick={() => {
                        console.log("로그인 성공!")
                        login();
                    }}
                ></Button>
            </Grid>
        </>
    );
}

export default Login;