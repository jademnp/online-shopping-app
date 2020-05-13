import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

const DetailProductPage = (props) => {
	const [Product, setProduct] = useState([]);
	const productId = props.match.params.productId;
	const dispatch = useDispatch();
	useEffect(() => {
		Axios.get(`/api/product/product_by_id?id=${productId}&type=single`).then(
			(response) => {
				if (response.data.success) {
					setProduct(response.data.products[0]);
				} else {
				}
			}
		);
	}, []);
	const addToCartHandler = (productId) => {
		dispatch(addToCart(productId));
	};
	return (
		<div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>{Product.title}</h1>
			</div>

			<br />

			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					<ProductImage detail={Product} />
				</Col>
				<Col lg={12} xs={24}>
					<ProductInfo addToCart={addToCartHandler} detail={Product} />
				</Col>
			</Row>
		</div>
	);
};

export default DetailProductPage;
