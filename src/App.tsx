import { Route, Switch } from "wouter";
import "./assets/global.css";
import { DefaultLayout } from "./components/DefaultLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { CarListPage } from "./pages/CarListPage";

function App() {
	return (
		<DefaultLayout>
			<Switch>
				<Route path='/' component={CarListPage} />
				<Route path='/car/:carId' component={CarDetailsPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</DefaultLayout>
	);
}

export default App;
