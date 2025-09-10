import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
    const [isSearch, setIsSearch] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearch(isSearch)
    }, [location])
    const navigate = useNavigate();
    const navigateToSearch = () => {
        navigate("/search")
    }
    return (
        <div onClick={navigateToSearch} className='flex justify-start items-center border border-neutral-300 text-neutral-600 rounded-lg min-w-[50px] md:min-w-[400px] cursor-pointer'>
            <button className='cursor-pointer flex items-center gap-2 p-2'>
                <FaSearch className='' />
                <span className='md:hidden'>Search</span>
            </button>
            <div>
                {
                    isSearch ?
                        <div className='w-full'>
                            <input type="text" autoFocus placeholder='Search for items...' className='w-full p-2 outline-0' />
                        </div>
                        :
                        <div className='w-full hidden md:block'>
                            <TypeAnimation
                                sequence={[
                                    'Search "Milk"',
                                    1000,
                                    'Search "Bread"',
                                    1000,
                                    'Search "Sugar"',
                                    1000,
                                    'Search "Chocolate"',
                                    1000,
                                    'Search "Egg"',
                                    1000,
                                    'Search "Oil"',
                                    1000,
                                    'Search "Noodles"',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                }
            </div>

        </div>
    )
}

export default Search