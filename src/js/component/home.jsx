import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

	useEffect (() => {
		fetch ( 'https://playground.4geeks.com/apis/fake/todos/user/CarlosRodriguez' , {
		method: 'PUT',
		body: JSON.stringify([{ label: 'test', done: false}]),
      headers: {
        "Content-Type": "application/json"
      }

		})
	
		.then( response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			console.log (data)
		})
		.catch( error => {
			console.log ( 'looks like hay problema : \n', error);
		})
	})


	return (
		<div className="container">
			<h1> My Assignments</h1>
			<ul>
				<li><input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setTareas(tareas.concat(inputValue));
							setInputValue("");
						}
					}}
					placeholder="What do you need?"></input></li>

				{tareas.map((item, index) => (

					<li> {item} {" "} <i class="fas fa-trash"
						onClick={() =>
							setTareas(tareas.filter(
								(t, currentIndex) =>
									index != currentIndex
							)
							)
						}></i>
					</li>
				))}	
			</ul>
			<div> 10 tasks </div>
		</div>
	);
};

export default Home;
