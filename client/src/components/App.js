import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'

const WelcomePage = () => <h2>WelcomePage</h2>

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Header />
					<Route exact={true} path="/" component={WelcomePage} />
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App;