import React from 'react'
import { Link } from 'react-router-dom'
export default function MainContent() {
    return (
        <div>
            <main className='max-w-7xl mx-auto
                        grid grid-cols-1 md:grid-cols-3
                        gap-5
                        m-6 md:mt-20 mt-16
                        '>
                <div>
                    <Link to="/box1">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Hello here is box 1 how can i help you? can you tell me please!</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/box2">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, </p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/box3">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, in?</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, in?</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, in?</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="">
                        <div className='bg-white shadow-lg overflow-hidden rounded-lg'>
                            <img className='w-full h-48 object-cover' src="IT.jpg" alt="" />
                            <div className='p-5'>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, in?</p>
                            </div>
                        </div>
                    </Link>
                </div>

            </main>
        </div>
    )
}
