import React from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function Navigation() {
    const navLinkStyle = ({ isActive }: NavLinkRenderProps) =>
        isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink;
    return (
        <nav className={styles.navigation}>
            <NavLink to="/" className={navLinkStyle}>
                Главная
            </NavLink>
            <NavLink to="/price-history" className={navLinkStyle}>
                История цен
            </NavLink>
            <NavLink to="/candles" className={navLinkStyle}>
                Свечи
            </NavLink>
        </nav>
    );
}
