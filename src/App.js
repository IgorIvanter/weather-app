import {React, useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main"


const api = {
	key: "076d1ea1151407ab670c718939b77745",
	base: "https://api.openweathermap.org/data/2.5/",
	baseForecast: "https://api.openweathermap.org/data/2.5/forecast"
}

function App() {

	// borderWidth state is used to track if the borders are shown or not:

	const initialBorderWidthAfterLoading = 0

	const [borderWidth, setBorder] = useState(initialBorderWidthAfterLoading)

	const toggleBorders = (event) => {
		setBorder(prevColorIndex => 1 - prevColorIndex)
		document.documentElement.style.setProperty("--border-width", borderWidth)
		console.log(`Done. Border width: ${borderWidth}`)
	}

	useEffect(() => {
		document.documentElement.style.setProperty("--border-width", `${borderWidth}px`)
	}, [borderWidth])

	// userInput is the string currently in the input field:

	const [userInput, setUserInput] = useState("")

	const userInputChangeHandler = event => setUserInput(event.target.value)

	const [weather, setWeather] = useState({})

	// This effect sets up the initial data that's displayed on the screen directly after the page is loaded.

	// It shows the weather for the city {initialLocation}:

	useEffect(() => {
		const initialLocation = "Moscow"
		fetch(`${api.base}weather?q=${initialLocation}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			setWeather({
				temp: res.main.temp,
				description: res.weather[0].description,
				location: `${res.name}, ${res.sys.country}`
			})
		})
	}, [])

	// const [forecast, setForecast] = useState(
	// 	fetch(`${api.base}forecast?q=Moscow&units=metric&APPID=${api.key}`)
	// 	.then(res => res.json())
	// )

	const searchHandler = (event) => {
		event.preventDefault()
		console.log("Search handler called...")
		fetch(`${api.base}weather?q=${userInput}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			setWeather({
				temp: res.main.temp,
				description: res.weather[0].description,
				location: `${res.name}, ${res.sys.country}`
			})
		})

		// fetch(`${api.baseForecast}?q=${userInput}&&units=metric&APPID=${api.key}`)
		// .then(res => res.json())
		// .then(res => {
		// 	console.log(res)
		// 	for (let weatherSnapShot of res.list) {
		// 		const date = new Date(weatherSnapShot.dt * 1000)
		// 		console.log(
		// 			`${date.getHours()}:${date.getMinutes()} ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`,
		// 			weatherSnapShot.dt
		// 		)
		// 	}
		// })
	}



    return (
        <div className="App">
			<header>
				<NavBar onChange={userInputChangeHandler} onSubmit={searchHandler}></NavBar>
			</header>

			<Main weather={weather} />

			<button onClick={toggleBorders}>Enable borders</button>
        </div>
    );
}

export default App;
