import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import Axios from 'axios';

export const FileUpload = (props) => {
    const [Images, setImages] = useState([])
    const  onDrop = async (files) => {
        let formData = new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0])
        const response = await Axios.post('/api/product/uploadImage',formData,config)
        console.log('response', response)
        if(response.data.success){
            setImages([...Images,response.data.image])
            props.refreshFunction([...Images,response.data.image])
        }
        else{
            alert('Error')
        }
    }
    const onDelete = (image) => {
        const index = Images.indexOf(image)
        const newImages = [...Images]
        newImages.splice(index,1)
        setImages(newImages)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}
