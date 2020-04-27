import React, {useState} from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Input, Button, Form } from 'antd'
import { FileUpload } from '../../utils/FileUpload'
import Axios from 'axios';

const UploadProductPage = (props) => {
    const Continents = [
        { key: 1, value: "Africa" },
        { key: 2, value: "Europe" },
        { key: 3, value: "Asia" },
        { key: 4, value: "North America" },
        { key: 5, value: "South America" },
        { key: 6, value: "Australia" },
        { key: 7, value: "Antarctica" }
    ]
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])
    const onChangeTitle = (e) => {
        setTitleValue(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescriptionValue(e.currentTarget.value)
    }

    const onPriceChange = (e) => {
        setPriceValue(e.currentTarget.value)
    }

    const onContinentsSelectChange = (e) => {
        setContinentValue(e.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const varToUpload = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
        }
        const response = await Axios.post('/api/product/uploadProduct', varToUpload)
            if (response.data.success) {
                alert('Product Successfully Uploaded')
                props.history.push('/')
            } else {
                alert('Failed to upload Product')
            }
    }
    return (
        <div style={{maxWidth: '700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <h2>Upload Travel Product</h2>
            </div>
            <Form onSubmit>

                <FileUpload refreshFunction={updateImages} />


                <br/>
                <br/>
                <label>Title</label>
                <Input 
                    onChange = {onChangeTitle}
                    value = {TitleValue}
                />

                <br/>
                <br/>
                <label>Description</label>
                <TextArea 
                    onChange = {onDescriptionChange}
                    value = {DescriptionValue}
                />

                <br/>
                <br/>
                <label>Price</label>
                <Input 
                    onChange = {onPriceChange}
                    value = {PriceValue}
                    type = "number"
                />
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
