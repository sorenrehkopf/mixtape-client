import React, { Component } from 'react';
import style from './style';

class Modal extends Component {
	render() {
		const { children, onBackgroundClick } = this.props;
		return(
			<div className={style.main} onClick={onBackgroundClick}>
				<div className={style.container} onClick={e => e.stopPropagation()}>
					<div className={style.close_bar}>
						<span onClick={onBackgroundClick}><i className="fas fa-times" /></span>
					</div>
					{children}
				</div>
			</div>
		)
	}
}

export default Modal;