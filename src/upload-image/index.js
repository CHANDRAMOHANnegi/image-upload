import React, { useRef } from 'react'

const supportedFileFormat = ['application/pdf', 'image/png', 'image/jpeg']

export const ImageUpload = (props) => {
    const inputRef = useRef(null);

    React.useEffect(() => {
        const URL = "https://s3-ap-southeast-1.amazonaws.com/tksproduction/bmtimages/pY3BnhPQYpTxasKfx.jpeg"
        async function fetchImage(params) {

            const res = await fetch(URL)
            console.log(res);

            const imageBlob = await res.blob()
            console.log('image', imageBlob);

            const imageFile = new File([imageBlob], 'test.png', { type: imageBlob.type });
            console.log('file', imageFile);

        }
        fetchImage();
    }, [])

    const handleDisplayFileDetails = () => {
        const file = inputRef.current?.files?.[0]
        if (file) {
            console.log(file);
            if (supportedFileFormat.includes(file.type)) {
                if (file.size < 1000 * 1000) {
                    //getBase64(file).then((base64) => {
                    //})
                } else {
                    alert("File size should be less than 1 MB");
                }
            } else {
                alert("Please Upload PDF,PNG or JPEG file only!!")
            }
        }
    };

    // const getBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //         reader.readAsDataURL(file);
    //     });
    // };

    return (
        <>
            <image href={URL} />
            <input
                ref={inputRef}
                onChange={handleDisplayFileDetails}
                className='form-control d-none'
                type="file"
            />
        </>
    )
}

export default ImageUpload