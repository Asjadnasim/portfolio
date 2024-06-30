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
		<div className='sm:hidden flex flex-col items-center gap-5 text-center'>
			<div onClick={toggleMenu}>
				<RxHamburgerMenu />
			</div>

			<div
				ref={menuRef}
				className={`fixed top-0 left-0 w-full h-full bg-gray-900 z-50 flex flex-col items-center justify-center gap-10 transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
				style={{ display: isOpen ? 'flex' : 'none' }}
			>
				<ul className='flex flex-col items-center gap-5'>
					{link2.map((item, index) => (
						<li key={item.id}>
							<Link
								href={item.href}
								onMouseEnter={() => handleHover(index)}
								onMouseLeave={() => handleHoverOut(index)}
								className='hover:text-gradient transition-all text-xl font-extralight'
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
