import React from "react";
import { Button } from "antd";

const UserCardBlock = (props) => {
	const renderItems = () => {
		return (
			props.products &&
			props.products.map((product) => (
				<tr key={product._id}>
					<td>
						<img
							style={{ width: "70px" }}
							alt="product"
							src={
								product.images.length > 0
									? `http://localhost:5000/${product.images[0]}`
									: null
							}
						/>
					</td>
					<td>{product.quantity} Unit</td>
					<td>{product.price}</td>
					<td>
						<Button onClick={() => props.removeItems(product._id)}>
							Remove
						</Button>
					</td>
				</tr>
			))
		);
	};
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Product Image</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{renderItems()}</tbody>
			</table>
		</div>
	);
};

export default UserCardBlock;
