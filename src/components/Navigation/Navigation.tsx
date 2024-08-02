import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss"

export default function Navigation(){
    return (
			<nav className={styles.navigation}>
				<NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Цены</NavLink>
                <NavLink to="/price-history" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>История цен</NavLink>
                <NavLink to="/candles" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Свечи</NavLink>
			</nav>
		)
}