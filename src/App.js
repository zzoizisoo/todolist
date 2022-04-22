import './App.css';
import {useState, useEffect} from 'react';
import {RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri';

function App() {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		const saved_data = JSON.parse(localStorage.getItem('todos'));
		if (saved_data) {
			setTodos(saved_data);
		} else {
			setTodos([]);
		}
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
		fontSize: 22,
		lineHeight: '30px'
	};

	const closeBtnStyle = {
		border: 'none',
		background: 'none'
	};

	const widgetStyle = {
		borderRadius: '5px',
		backgroundColor: 'rgba(255,255,255,0.5)',
		border: '2px solid white'
	};

	const headerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		borderRadius: '5px 5px 0px 0px',
		backgroundColor: 'rgba(255,255,255,0.95)',
		textAlign: 'left',
		fontWeight: 700,
		padding: '0.2em 0.5em',
		alignItems: 'center',
		fontSize: 18,
		color: 'grey'
	};

	const listStyle = {
		padding: '0.2em'
	};

	const checkbtnStyle = {
		border: 'none',
		background: 'none',
		fontSize: '1.5rem'
	};

	const imacStyleBtnStyle = (color) => {
		return {
			backgroundColor: color,
			borderRadius: 100,
			width: 12,
			height: 12,
			marginLeft: 5
		};
	};

	return (
		<div className='App'>
			<div style={widgetStyle}>
				<div style={headerStyle}>
					<div>Todos</div>
					<div style={{display: 'flex'}}>
						<div style={imacStyleBtnStyle('#ff7373')} />
						<div style={imacStyleBtnStyle('#ffb100')} />
						<div style={imacStyleBtnStyle('#61cf61')} />
					</div>
				</div>
				<div style={listStyle}>
					{todos &&
						todos.map((t) => (
							<div key={t.id} style={itemStyle}>
								<div style={{display: 'flex'}}>
									<div>
										<button
											style={checkbtnStyle}
											onClick={() => {
												handleDoneChange(t.id);
											}}
										>
											{t.done ? <RiCheckboxCircleFill fill={'#ffb100'} /> : <RiCheckboxBlankCircleLine />}
										</button>
									</div>
									<div>{t.text}</div>
								</div>
								<button onClick={() => removeTodo(t.id)} style={closeBtnStyle}>
									X
								</button>
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
