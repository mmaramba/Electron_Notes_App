import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
	height: 100vh;
	background-color: #404a6e;
`

const CarouselContainer = styled.div`
	user-select: none;

	.ant-carousel .slick-slide {
			line-height: 400px;
	}
		
	.ant-carousel .slick-slide h1 {
			color: #fff;
	}
`

class LoginCarousel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<CarouselContainer>
				<StyledCarousel autoplay>
					<div>
						<h1>Take notes.</h1>
					</div>
					<div>
						<h1>Create to-do lists.</h1>
					</div>
					<div>
						<h1>Be productive.</h1>
					</div>
				</StyledCarousel>
			</CarouselContainer>
		);
	}
}

export default LoginCarousel;