import { Route, Switch } from "wouter";
import "./assets/global.css";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { CarListPage } from "./pages/CarListPage";

function App() {
	return (
		<Switch>
			<Route path='/' component={CarListPage} />
			<Route path='/car/:carId' component={CarDetailsPage} />
		</Switch>
	);
}

export default App;
