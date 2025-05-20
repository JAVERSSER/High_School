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
                    <div className={`md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full transition-all duration-500 ease-in-out ${isMenuOpen
                        ? 'top-[98%] opacity-100 visible'
                        : 'top-[-1000px] md:opacity-100 opacity-0 md:visible invisible'
                        } md:py-0 py-5 px-5`}>
                        <ul className='flex md:flex-row flex-col md:gap-[4vw] gap-8'>
                            <li>
                                <Link to="/" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/pomodoro" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Pomodoro</Link>
                            </li>
                            <li>
                                <Link to="/study" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Self study</Link>
                            </li>
                            <li>
                                <Link to="/random" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Random</Link>
                            </li>
                            <li>
                                <Link to="/game" onClick={closeMenu} className="hover:text-gray-500 transition-colors">Game</Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* <!-- AtoZSEOTools Counter Code START --> */}
                    <a href="https://toolsbox.com/website-hit-counter" target="_blank" title="Web Counter">
                        <img src="https://toolsbox.com/website-hit-counter/count/&style=style1&show=p&num=4&uid=sw" title="Web Counter"
                            alt="AtoZSEOTools Web Counter" />
                    </a>
                    {/* <!-- AtoZSEOTools Counter Code END --> */}

                    <div className='flex items-center gap-5'>
                        <button className='bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors'>
                            <Link to="/pomodoro">Start</Link>
                        </button>
                        <ion-icon
                            name={isMenuOpen ? "close" : "menu"}
                            className='text-3xl md:hidden cursor-pointer hover:text-gray-500 transition-colors'
                            onClick={toggleMenu}
                        ></ion-icon>
                    </div>
                </nav>
            </header>
        </div>
    );
}