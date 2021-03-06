import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};
	}

	toggleMenu = () => {
		const { open } = this.state;

		this.setState({
			open: !open
		});
	}

	render() {
		const { displayName, displayPhoto, pathname } = this.props;
		const { open } = this.state;

		return(
			<div className={`pure-menu ${style.main}`}>
				<div className={style.mobile_toggle}>
					{!open && <span onClick={this.toggleMenu}><i className={`fas fa-bars ${style.toggle_icon}`} /></span>}
					{open && <span onClick={this.toggleMenu}><i className={`fas fa-times ${style.toggle_icon}`} /></span>}
					<span className={style.mobile_logo}>MT</span>
				</div>
				<div className={`${style.menu} ${open ? style.open : ''}`} onClick={this.toggleMenu}>
					<div className={`pure-menu-heading ${style['main__header']}`}>
						<div className={style['main__header--top']}>
							<span className={style['main__header--logo']}>MT</span>
							{displayPhoto && <img className={style['main__header--photo']} src={displayPhoto} />}	
						</div>
						{displayName && <p className={style['main__header--name']}>{displayName}</p>}
					</div>
					<ul className={`pure-menu-list ${style.menu_items}`}>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/(addSong)*$/.test(pathname) && style.current}`} to="/">Add A Song</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/import/.test(pathname) && style.current}`} to="/import">Import a Playlist</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/songs/.test(pathname) && style.current}`} to="/songs">Your Songs</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/mixes/.test(pathname) && style.current}`} to="/mixes">Your Mixes</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/create/.test(pathname) && style.current}`} to="/create">Create Playlist</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${/^\/settings/.test(pathname) && style.current}`} to="/settings">Settings</Link>
						</li>
					</ul>
					<Link className={`pure-menu-link ${style.about}`} to="/about">About</Link>
				</div>
			</div>
		)
	}
};

export default Sidebar;