import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/carlosrodriguezR', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) throw Error('la response no ok')
				return resp.json()
			})
			.then(data => {
				setTareas(data)

			})
			.catch(error => {
				alert('ha habido algun error')
				console.log(error);
			});
	}, [])

	return (
		<div className="container">
			<h1> My Assignments</h1>
			<ul>
				<li><input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {

							let body = tareas.concat([{ "label": inputValue, "done": false}])

							fetch('https://playground.4geeks.com/apis/fake/todos/user/carlosrodriguezR', {
								method: 'PUT',
								body: JSON.stringify(body),
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(resp => {
									if (!resp.ok) throw Error('la response no ok')
									return resp.json()
								})
								.then(data => {
									setTareas(tareas.concat([{ "label": inputValue, "done": false}])),
							setInputValue("")

								})
								.catch(error => {
									alert('ha habido algun error')
									console.log(error);
								});
						}
					}}
					placeholder="What do you need?"></input></li>

				{tareas.map((tarea, index) => (

					<li> {tarea.label} {" "} <i class="fas fa-trash"
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
