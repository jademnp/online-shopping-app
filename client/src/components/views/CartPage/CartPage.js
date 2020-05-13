import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";

const CartPage = (props) => {
	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(false);
	const [ShowSuccess, setShowSuccess] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		let cartItems = [];
		if (props.user.userData && props.user.userData.cart) {
			if (props.user.userData.cart.length > 0) {
				props.user.userData.cart.forEach((element) => {
					cartItems.push(element.id);
				});
				dispatch(getCartItems(cartItems, props.user.userData.cart));
			}
		}
	}, [props.user.userData]);
	useEffect(() => {
		if (props.user.cartDetail && props.user.cartDetail.length > 0) {
			CalculateTotal(props.user.cartDetail);
		} else {
			setShowTotal(false);
		}
	}, [props.user.cartDetail]);
	const removeFromCart = (productId) => {
		dispatch(removeCartItem(productId));
	};

	const CalculateTotal = (cartDetail) => {
		let total = 0;
		cartDetail.map(
			(item) => (total += parseInt(item.price, 10) * item.quantity)
		);
		setTotal(total);
		setShowTotal(true);
	};

	return (
		<div style={{ width: "85%", margin: "3rem auto" }}>
			<h1>My Cart</h1>

			<div>
				<UserCardBlock
					products={props.user.cartDetail}
					removeItems={removeFromCart}
				/>
			</div>
			{ShowTotal ? (
				<div style={{ marginTop: "3rem" }}>
					<h2>Total Amount: ${Total}</h2>
				</div>
			) : ShowSuccess ? (
				<Result status="success" title="successfullty purchased Items" />
			) : (
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<br />
					<Empty description={false} />
					<p>No Items In The Cart</p>
				</div>
			)}
		</div>
	);
};

export default CartPage;
