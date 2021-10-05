import './App.css';
import {useState, useEffect} from 'react';

function App() {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		const saved_data = localStorage.getItem('todos');
		setTodos(JSON.parse(saved_data));
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		setTodos([
			...todos,
			{
				id: Date.now(),
				text: text,
				done: false
			}
		]);
		setText('');
	};
	const removeTodo = (id) => {
		const _todos = todos.filter((t) => t.id !== id);
		setTodos(_todos);
	};
	const handleDoneChange = (id) => {
		const _todos = todos.map((t) => {
			if (t.id === id) t.done = !t.done;
			return t;
		});
		setTodos(_todos);
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	const itemStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '3px 0px',
		textAlign: 'left',
		fontWeight: 600,
		fontSize: 17
	};

	const widgetStyle = {
		borderRadius: '5px',
		backgroundColor: 'rgba(255,255,255,0.8)'
	};

	const headerStyle = {
		borderRadius: '5px 5px 0px 0px',
		backgroundColor: 'rgba(255,255,255,0.95)',
		textAlign: 'left',
		fontWeight: 700,
		padding: '0.2em 0.5em',
		display: 'flex',
		alignItems: 'center'
	};

	const listStyle = {
		padding: '0.2em'
	};

	const imacStyleBtnStyle = (color) => {
		return {
			backgroundColor: color,
			borderRadius: 100,
			width: 12,
			height: 12,
			marginRight: 5
		};
	};

	return (
		<div className='App'>
			<div style={widgetStyle}>
				<div style={headerStyle}>
					<div style={imacStyleBtnStyle('#ff7373')} />
					<div style={imacStyleBtnStyle('#ffb100')} />
					<div style={{...imacStyleBtnStyle('#61cf61'), marginRight: 10}} />
					Todo's
				</div>
				<div style={listStyle}>
					{todos.map((t) => (
						<div key={t.id} style={itemStyle}>
							<div style={{display: 'flex'}}>
								<div>
									<input
										style={{marginRight: 5}}
										type='checkbox'
										name='done'
										checked={t.done}
										onChange={() => {
											handleDoneChange(t.id);
										}}
									/>
								</div>
								<div>{t.text}</div>
							</div>
							<div>
								<button onClick={() => removeTodo(t.id)}>x</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<input type='text' name='todo' onChange={handleTextChange} value={text} />
				<button onClick={addTodo}> add </button>
			</div>
		</div>
	);
}

export default App;
