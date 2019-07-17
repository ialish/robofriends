import React from 'react';

const Card = ({ id, name, email }) => {
	return (
		<div className='bg-light-green dib br3 pa3 ma2 grow shadow-5 tc'>
			<img src={`https://robohash.org/${id}?size=250x250`} alt='Robot' />
			<div>
				<h3>{name}</h3>
				<p>{email}</p>
			</div>
		</div>
	);
}

export default Card;