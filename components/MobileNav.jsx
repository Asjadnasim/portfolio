'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { RxHamburgerMenu } from 'react-icons/rx';
import { link2 } from '@/constant';
import Link from 'next/link';

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);

	const borderRefs = useRef([]);
	borderRefs.current = link2.map(() => useRef(null));

	const handleHover = (index) => {
		gsap.fromTo(
			borderRefs.current[index].current,
			{ width: 0 },
			{ width: '100%', duration: 0.3, ease: 'power2.out' }
		);
	};

	const handleHoverOut = (index) => {
		gsap.to(borderRefs.current[index].current, {
			width: 0,
			duration: 0.3,
			ease: 'power2.out',
		});
	};

	useEffect(() => {
		if (isOpen) {
			gsap.fromTo(
				menuRef.current,
				{ x: '100%' },
				{ x: '0%', duration: 0.5, ease: 'power2.out' }
			);
		} else {
			gsap.to(menuRef.current, {
				x: '100%',
				duration: 0.5,
				ease: 'power2.out',
			});
		}
	}, [isOpen]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='sm:hidden flex flex-col items-center gap-5 text-center h-full'>
			<div onClick={toggleMenu}>
				<RxHamburgerMenu />
			</div>

			<div
				ref={menuRef}
				className={`absolute top-[100%] left-0  w-[100vw] h-[100vh] bg-gradient-typewriter z-50 flex flex-col items-center justify-center gap-10 transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
				style={{ display: isOpen ? 'flex' : 'none' }}
			>
				<ul className='flex flex-col items-center gap-20'>
					{link2.map((item, index) => (
						<li key={item.id}>
							<Link
								href={item.href}
								onMouseEnter={() => handleHover(index)}
								onMouseLeave={() => handleHoverOut(index)}
								className='font-thin hover:text-purple-200 transition-all text-xl uppercase'
								onClick={() => setIsOpen(false)}
							>
								{item.title}
								<span
									ref={borderRefs.current[index]}
									className='absolute left-0 bottom-0 w-0 h-1 bg-cyan-200 transition-all mt-2 rounded-2xl'
								></span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MobileNav;
