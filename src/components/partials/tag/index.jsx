import React from 'react';
import style from './style';

const Tag = ({...props}) => props.value !== false ? (
	<div className={style.main}>
		<p className={style.name} title={props.title}>{props.name} { props.remove && <span onClick={props.remove}>x</span>}</p>
		{props.type === 'number' && (
			<div className={style.input_container}>
				<input className={style.value} type="number" name={props.name} value={props.value} step="any"/>
			</div>
			)
		}
		{props.type === 'text' && (
			<div className={style.input_container}>
				<input className={style.value} type="text" name={props.name} value={props.value}/>
			</div>
			)
		}
</div>) : null;

export default Tag;