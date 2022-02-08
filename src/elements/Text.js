import React from 'react';
import styled from 'styled-components';

function Text(props) {
    const { bold, color, size, children, margin, bg, width } = props;

    const styles = {
        bold: bold,
        color: color,
        size: size,
        margin: margin,
        bg: bg,
        width: width,
    }

    return (
        <P {...styles}>
            {children}
        </P>
    );
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: "#222831",
    size: "14px",
    margin: false,
    bg: "#fff",
    width: "100%",
}

const P = styled.div`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    margin: ${(props) => props.margin};
    background-color: ${(props) => props.bg};
    width: ${(props) => props.width};
`;

export default Text;