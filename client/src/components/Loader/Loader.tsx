import React from "react";
import Loader from "react-loader-spinner";
export default class App extends React.Component {
	//other logic
	render() {
		return (
			<Loader
				type='Puff'
				color='#00BFFF'
				height={100}
				width={100}
				timeout={3000} //3 secs
			/>
		);
	}
}

// Spinner Type	Implementation
// Audio	<Loader type="Audio" color="#00BFFF" height={80} width={80} />
// Ball-Triangle	<Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
// Bars	<Loader type="Bars" color="#00BFFF" height={80} width={80} />
// Circles	<Loader type="Circles" color="#00BFFF" height={80} width={80}/>
// Grid	<Loader type="Grid" color="#00BFFF" height={80} width={80} />
// Hearts	<Loader type="Hearts" color="#00BFFF" height={80} width={80} />
// Oval	<Loader type="Oval" color="#00BFFF" height={80} width={80} />
// Puff	<Loader type="Puff" color="#00BFFF" height={80} width={80} />
// Rings	<Loader type="Rings" color="#00BFFF" height={80} width={80} />
// TailSpin	<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
// ThreeDots	<Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
// There are more. View [demo] to see the full list.
