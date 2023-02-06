import React, { useRef, useState } from 'react'

const supportedFileFormat = ['application/pdf', 'image/png', 'image/jpeg']
// const URL = "https://takeuforward.org/wp-content/uploads/2022/01/Strivers-SDE-Sheet-1-scaled.webp"


export const ImageUpload = (props) => {
    const { name, label, icon, setFieldValue, values } = props

    const [uploadedFileName, setUploadedFileName] = useState("");
    const inputRef = useRef(null);

    const handleUpload = (values) => {
        console.log("file uploaded--------");
        inputRef.current?.click();
        // postValidatePanCard(values)
    };

    const handleDisplayFileDetails = () => {
        const file = inputRef.current?.files?.[0]
        if (file) {
            console.log(file);
            if (supportedFileFormat.includes(file.type)) {
                if (file.size < 1000 * 1000) {
                    //getBase64(file).then((base64) => {
                    setUploadedFileName(inputRef.current.files[0].name);
                    setFieldValue(`${name}`, inputRef.current.files[0])
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

    React.useEffect(() => {
        const URL = "https://s3-ap-southeast-1.amazonaws.com/tksproduction/bmtimages/pY3BnhPQYpTxasKfx.jpeg"
        async function fetchImage(params) {

            const res = await fetch(URL)
            console.log(res);

            const imageBlob = await res.blob()
            console.log('image', imageBlob);

            var imageFile = new File([imageBlob], 'test.png', { type: imageBlob.type });
            console.log('file', imageFile);

        }
        fetchImage();
        return () => {
        }
    }, [])

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