import React from 'react';
import styled from 'styled-components';

function Grid(props) {
    const { is_flex, width, margin, padding, bg, children, textAlign, border, borderRadius } = props;

    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        textAlign: textAlign,
        border: border,
        borderRadius: borderRadius,
    };


    return (
        <GridBox {...styles}>{children}</GridBox>
    );
}

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
    textAlign: false,
    border: false,
    borderRadius: false,
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}

    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}

    ${(props) =>
        props.is_flex
            ? `display: flex; align-items: center; justify-content: space-between;`
            : ''}

    ${(props) => props.textAlign ? `text-align: ${props.textAlign};` : ``};
    ${(props) => props.border ? `border: ${props.border};` : ``};
    ${(props) => props.borderRadius ? `border-radius: ${props.borderRadius};` : ``};
`;

export default Grid;





