import React from 'react';
import styled from 'styled-components';

function Image(props) {
    const { shape, src, size } = props;

    const styles = {
        src: src,
        size: size,
    }

    if (shape === "circle") {
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if (shape === "rectangle") {
        return (
            <AspetOutter>
                <AspectInner {...styles}></AspectInner>
            </AspetOutter >
        )
    }

    if (shape === "big_square") {
        return <BigSquareImage {...styles}></BigSquareImage>;
    }

    if (shape === "small_square") {
        return <SmallSquareImage {...styles}></SmallSquareImage>;
    }

    return (
        <>
            <ImageDefault {...styles}></ImageDefault>
        </>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: "https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200",
    size: 36,
}

const ImageDefault = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;


const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

const AspetOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%; // width가 100%이므로 4:3이 종횡비를 맞춰주기 위해서다.
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const BigSquareImage = styled.img`
    width: 100%;
    ${(props) => (props.half ? `flex-basis: 50%;` : "")}
    min-width: 250px;
    background-image: url(${(props) => props.src});
    background-size: cover;
    margin: 10px 0;
    @media (max-width: 280px) {
        min-width: 150px;
    }
    @media (max-width: 360px) {
        min-width: 180px;
    }
`;

const SmallSquareImage = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 10px 0;
`;

export default Image;