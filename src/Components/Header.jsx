import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <header className='fixed top-0 w-full bg-white shadow-lg z-50'>
                <nav className='flex items-center justify-between w-[92%] mx-auto'>
                    <div>
                        <img className='w-10 md:w-10 m-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/MoEYS-Cambodia.svg/1200px-MoEYS-Cambodia.svg.png" alt="" />
                    </div>
                    <div className={`md:static nav-links duration-500 
                                    absolute bg-white
                                    md:w-auto w-full
                                    left-0 ${isMenuOpen ? 'top-[98%]' : 'top-[-600px]'}
                                    flex items-center p-5
                    `}>
                        <ul className='flex md:flex-row flex-col md:gap-[4vw] gap-8'>
                            <li>
                                <Link to="/" onClick={closeMenu}>Home</Link>
                            </li>
                            <li>
                                <Link to="/pomodoro" onClick={closeMenu}>Pomodoro</Link>
                            </li>
                            <li>
                                <Link to="/study" onClick={closeMenu}>Self study</Link>
                            </li>
                            <li>
                                <Link to="/random" onClick={closeMenu}>Random</Link>
                            </li>
                            <li>
                                <Link to="/game" onClick={closeMenu}>Game</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className='bg-gray-900 text-white px-5 py-2 rounded-full'>
                            <Link to="/pomodoro">Start</Link>
                        </button>
                        <ion-icon 
                            name={isMenuOpen ? "close" : "menu"} 
                            className='text-3xl md:hidden cursor-pointer'
                            onClick={toggleMenu}
                        ></ion-icon>
                    </div>
                </nav>
            </header>
        </div>
    );
}