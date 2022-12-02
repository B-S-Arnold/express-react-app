// import { useDropzone } from 'react-dropzone'
import React, { useEffect, useState } from "react";
import * as imageActions from "../../store/image"



const AddImageForm = () => {

    // const history = useNavigate(); // so that we can redirect after the image upload is successful
    // const dropzone = new Dropzone("div#myId", { url: "/file/post" });
    // const [image, setImage] = useState([]);
    // const [caption, setCaption] = useState('');
    // const [imageLoading, setImageLoading] = useState(false);
    // console.log(file)

    // const navigate = useNavigate()

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',


    };

    const thumb = {
        display: 'inline-flex',

        width: 'fit-content',

        boxSizing: 'border-box'
    };

    const thumbInner = {
        className: 'dropimgdiv',
        display: 'flex',
        minWidth: 0,
        // overflow: 'hidden'

    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };


    function Previews() {
        // const [caption, setCaption] = useState('');
        const [files, setFiles] = useState([]);
        const [imageLoading, setImageLoading] = useState(false);


        const handleSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            // formData.append("caption", caption)
            formData.append("image", files[0]);


            setImageLoading(true);
            const res = await fetch('/api/images', {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                await res.json();
                setImageLoading(false);
                // setRenderModal(false);
                window.location.reload();
            }
            else {
                setImageLoading(false);
                console.log("error")
            }
        }



        const { getRootProps, getInputProps } = useDropzone({
            accept: {
                'image/*': []
            },
            onDrop: acceptedFiles => {

                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));

            }
        });



        const thumbs = files.map(file =>

        (
            <div style={thumb} key={file.name}>
                <div className='dropimgdiv' style={thumbInner}>
                    <img
                        className='dropimg'
                        src={file.preview}
                        style={img}
                        alt="pic"
                        // Revoke data uri after image is loaded

                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />

                </div>
            </div>
        ));



        useEffect(() => {
            // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
            // console.log("FILES", files)
            // setImage(files[0])
            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);


        return (
            <section className='blah' >
                {(imageLoading) ? <div className='loading'><div className='spinner' /><div>Loading...</div></div> : <form className="dropcontainer" onSubmit={handleSubmit}>
                    {/* <p className= 'droptext'>Create new post</p> */}
                    {/* <button className="submit" type="submit">Share</button> */}
                    <div className='dropbox'>
                        <div className='droptext'>Create new post</div>
                        <button disabled={files.length === 0} className="submit" type="submit">Share</button>
                        {/* <hr className='addimgline' /> */}
                    </div>


                    <div {...getRootProps({ className: 'dropzone' })}>
                        <div className='dropinstr'>
                            <div>Drag and drop image here</div>
                            <div>or click to select from computer</div>
                        </div>
                        <input className='dropinput' {...getInputProps()} />

                    </div>

                    <aside style={thumbsContainer}>
                        {thumbs}


                    </aside>

                </form>}

            </section>
        );
    }


    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
        <>

            <Previews />


        </>
    )
}


export default AddImageForm;