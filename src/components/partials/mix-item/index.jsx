import React, { Component } from 'react';
import style from './style';

class MixItem extends Component {
	render() {
		const { mix: { name, parameters: { include: { tags } } }, edit, use } = this.props;
		const tagNames = Object.keys(tags);
		return(
			<div className={style.main}>
				<span className={style.name}><strong>{name}</strong></span>
				<div className={style.summary}>
					<em>{tagNames.slice(0, 3).join(', ')}{tagNames.length > 3 ? '...' : ''}</em>
				</div>
				<span className={style.action} onClick={edit}>
					<i className={`fas fa-edit ${style.icon}`}></i>
					edit
				</span>
				<span className={style.action} onClick={use}>
					<i className={`fas fa-arrow-circle-right ${style.icon}`}></i>
					use
				</span>
			</div>
		);
	}
};

export default MixItem;