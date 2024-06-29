'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import { gsap } from 'gsap';
import React, { useRef, useState } from 'react';
import { link } from '@/constant';

const Header = () => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useMotionValueEvent(scrollYProgress, 'change', (currentprevious) => {
		if (typeof current === 'number' && typeof previous === 'number') {
			let direction = current - previous;

			if (scrollYProgress.get() < 0.05) {
				setVisible(true); // Keep visible at the top
			} else {
				setVisible(direction < 0); // Show when scrolling up
			}
		}
	});

	const borderRefs = useRef([]);
	borderRefs.current = link.map(() => useRef(null));

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

	return (
		<AnimatePresence mode='wait' className=''>
			{visible && (
				<motion.div
					initial={{
						opacity: 1,
						y: 0, // Start at the top
					}}
					animate={{
						y: visible ? 0 : -100,
						opacity: visible ? 1 : 0,
					}}
					transition={{
						duration: 0.2,
					}}
					className='fixed inset-x-0 top-0 z-50 w-[90%] mx-auto'
				>
					<div className='flex justify-between items-center h-18 border-b-2 border-white px-2 py-4 '>
						{/* Logo */}
						<Link href='/'>
							<div className='flex justify-between items-center mx-auto gap-2'>
								<Image src={'/logo.png'} alt='Logo' width={56} height={56} />
								<h1 className='text-4xl font-normal'>Nasim</h1>
							</div>
						</Link>
						{/* Navbar */}
						<ul className='flex justify-between items-center gap-5'>
							{link.map((item, index) => (
								<Link
									href={item.href}
									onMouseEnter={() => handleHover(index)}
									onMouseLeave={() => handleHoverOut(index)}
									className='relative hover:text-cyan-100 transition-all'
									key={item.id}
								>
									<li>
										{item.title}
										<span
											ref={borderRefs.current[index]}
											className='absolute left-0 bottom-0 w-0 h-1 bg-cyan-200 transition-all mt-2 rounded-2xl'
										></span>
									</li>
								</Link>
							))}
						</ul>

						{isLoggedIn ? (
							<Image
								src={'/aot.jpg'}
								alt='User Image'
								width={42}
								height={58}
								className='rounded-full'
							/>
						) : (
							<button className='border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full '>
								<Link href='/login'>
									<span>Login</span>
									<span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px' />
								</Link>
							</button>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Header;
