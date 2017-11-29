import React from 'react';
import { Panel } from 'reactbulma';

const Task = ({ id, name, date, complete, onClick }) => (
	<Panel.Block label onClick={onClick} className={(complete) ? 'item-complete' : ''}>
		<p>{name} | {date.toLocaleString()} {(complete) ? '✌️' : ''}</p>
	</Panel.Block>
)


export default Task;