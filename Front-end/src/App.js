import React from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header/Header";
import Create from "./components/Body/Create";
import Append from "./components/Body/Append";
import Raffle from "./components/Body/Raffle";
import Footer from "./components/footer/Footer";
import ListAll from "./components/Body/ListAll";

function App() {
	return (
		<div className="App">
			<GlobalStyle />

			<Header />

			<Create />

			<Append />

			<ListAll />

			<Raffle />

			<Footer />
		</div>
	);
}

export default App;
