import React, { useEffect, useState } from 'react';
import { FaCode, FaFileExcel } from 'react-icons/fa';
import { Icon, Button, Row, Card, Col } from 'antd';
import Axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { price, continents } from './Sections/Data';
import SearchBox from './Sections/SearchBox';
const { Meta } = Card;
function LandingPage() {
	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [Postsize, setPostsize] = useState(0);
	const [SearchTerm, setSearchTerm] = useState('');
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	});
	useEffect(() => {
		const variable = {
			skip: Skip,
			limit: Limit,
		};
		getProducts(variable);
	}, []);

	const getProducts = async (variable) => {
		const response = await Axios.post('/api/product/getProducts', variable);
		if (response.data.success) {
			if (variable.loadMore) {
				setProducts([...Products, ...response.data.products]);
			} else {
				setProducts(response.data.products);
			}
			setPostsize(response.data.postSize);
		} else {
			alert('Failed to fectch product datas');
		}
	};
	const updateSearchTerm = (newSearchTerm) => {
		const variable = {
			skip: 0,
			limit: Limit,
			filter: Filters,
			searchTerm: newSearchTerm,
		};
		setSkip(0);
		setSearchTerm(newSearchTerm);
		getProducts(variable);
	};

	const onLoadMore = () => {
		let skip = Skip + Limit;
		console.log('skip', skip);
		const variable = {
			skip: skip,
			limit: Limit,
			loadMore: true,
		};
		getProducts(variable);
		setSkip(skip);
	};
	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24}>
				<Card
					hoverable={true}
					cover={
						<a href={`/product/${product._id}`}>
							<ImageSlider images={product.images} />
						</a>
					}
				>
					<Meta title={product.title} description={`$${product.price}`} />
				</Card>
			</Col>
		);
	});
	const handleShowFilters = (filter) => {
		const variable = {
			skip: 0,
			limit: Limit,
			filter: filter,
		};
		getProducts(variable);
	};
	const handlePrice = (value) => {
		const data = price;
		let array = [];
		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		return array;
	};
	const handleFilters = (filter, type) => {
		const copyState = { ...Filters };
		if (type === 'price') {
			filter = handlePrice(filter);
		}
		copyState[type] = filter;
		console.log('copyState', copyState);
		handleShowFilters(copyState);
		setFilters(copyState);
	};
	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>
					{' '}
					Let's Travel Anywhere <Icon type="rocket" />{' '}
				</h2>
			</div>
			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					<CheckBox list={continents} handleFilters={handleFilters} />
				</Col>
				<Col lg={12} xs={24}>
					<RadioBox list={price} handleFilters={handleFilters} />
				</Col>
			</Row>
			{/* <br /> */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					margin: '1rem auto',
				}}
			>
				<SearchBox refreshFuction={updateSearchTerm} />
			</div>

			{Products.length === 0 ? (
				<div
					style={{
						display: 'flex',
						height: '300px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h2>No post yet...</h2>
				</div>
			) : (
					<div>
						<Row gutter={[16, 16]}>{renderCards}</Row>
					</div>
				)}
			<br />
			{Postsize >= Limit && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={onLoadMore}>Load More</Button>
				</div>
			)}
		</div>
	);
}

export default LandingPage;
