import React from 'react';
import { Panel, Button } from 'reactbulma';

const Task = ({ id, name, time, complete, onClick, onDeleteClick }) => (
	<Panel.Block label onClick={onClick} className={(complete) ? 'item-complete' : ''}>
		<p>{name} | {(new Date(time)).toLocaleString()} {(complete) ? '✌️' : ''} <Button onClick={onDeleteClick}>Button</Button></p>
	</Panel.Block>
)

export default Task;