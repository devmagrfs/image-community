import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from './index';

function Input(props) {
    const {
        label,
        placeholder,
        _onChange,
        type,
        width,
        height,
        display,
    } = props;

    const styles = {
        height: height,
        width: width,
        display: display,
    }

    return (
        <>
            <Grid height={{ height }}>
                <Text margin="0px">{label}</Text>
                <ElInput
                    type={type}
                    placeholder={placeholder}
                    onChange={_onChange}
                    {...styles}
                />
            </Grid>
        </>
    );
}

Input.defaultProps = {
    label: false,
    type: 'text',
    placeholder: '텍스트를 입력해주세요.',
    _onChange: () => { },
    height: false,
    width: "100%",
    display: "block",
}


const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
    ${(props) => (props.height ? `height: ${props.height}` : '')};
    ${(props) => (props.display ? `display: ${props.display}` : '')};
`;

export default Input;