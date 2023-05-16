import React, { useEffect, useState } from "react";

const Image = ({
    src,
    alt
}) => {
    // const imageUrl = src;
    // const [img, setImg] = useState();

    // const fetchImage = async () => {
    //     const res = await fetch(imageUrl);
    //     const imageBlob = await res.blob();
    //     const imageObjectURL = URL.createObjectURL(imageBlob);
    //     setImg(imageObjectURL);
    // };

    // useEffect(() => {
    //     fetchImage();
    // }, []);

    return (
        <>
          <img src={src} alt={alt}/>
        </>
    )
}

export default Image