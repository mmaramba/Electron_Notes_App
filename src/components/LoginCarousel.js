import React from 'react';
import { Carousel } from 'antd';
import './LoginCarousel.css';

class LoginCarousel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="carouselContainer">
                <Carousel autoplay style={{height: "100vh", backgroundColor: "#404a6e"}}>
                    <div>
                    <h1>Take notes.</h1>
                    </div>
                    <div>
                    <h1>Create to-do lists.</h1>
                    </div>
                    <div>
                    <h1>Be productive.</h1>
                    </div>
                </Carousel>
            </div>

        );
    }
}

export default LoginCarousel;