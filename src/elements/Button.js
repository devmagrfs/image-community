import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick, is_float, fontSize, children, margin, width, padding, backgroundColor } = props;

    const styles = {
        fontSize: fontSize,
        margin: margin,
        width: width,
        padding: padding,
        backgroundColor: backgroundColor,
    };

    if (is_float) {
        return (
            <>
                <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
            </>
        )
    }

    return (
        <>
            <ElButton onClick={_onClick} {...styles}>{text ? text : children}</ElButton>
        </>
    );
}

Button.defaultProps = {
    text: "텍스트",
    is_float: false,
    _onClick: () => { },
    fontSize: "",
    margin: false,
    width: "100%",
    padding: "12px 0px",
    backgroundColor: "#000000",
}



const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: #212121;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    background-color: #FF6666;
`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: yellow;
    color: #212121;
    box-sizing: border-box;
    font-size: 35px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 15px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
`;

export default Button;