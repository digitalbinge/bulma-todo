import React from 'react';
import { Progress, Level, Heading, Title } from 'reactbulma';

const Header = ({ totalIncomplete, totalComplete, title }) => (
	<div>
	{console.log((totalComplete / (totalIncomplete + totalComplete) * 100) || 0)}
		<Progress value={(totalComplete / (totalIncomplete + totalComplete) * 100) || 0} max="100"></Progress>
		<Level>
		  <Level.Item hasTextCentered>
		    <div>
		      <Heading>{ title }</Heading>
		      <Title>{ totalIncomplete }</Title>
		    </div>
		  </Level.Item>

		  <Level.Item hasTextCentered>
		    <div>
		      <Heading>Complete</Heading>
		      <Title>{ totalComplete }</Title>
		    </div>
		  </Level.Item>
		</Level>
	</div>
)


export default Header;