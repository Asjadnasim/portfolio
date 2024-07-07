'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import React, { useState } from 'react';
import { link } from '@/constant';
import MobileNav from './MobileNav';
import MaxWidthWrapper from './MaxWidthWrapper';
import Separator from './Separator';

const Header = () => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);

	useMotionValueEvent(scrollYProgress, 'change', (current) => {
		if (typeof current === 'number') {
			let direction = current - scrollYProgress.getPrevious();

			if (scrollYProgress.get() < 0.05) {
				setVisible(true); // Keep visible at the top
			} else {
				setVisible(direction < 0); // Show when scrolling up
			}
		}
	});

	return (
		<AnimatePresence mode='wait'>
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
					className='fixed inset-x-0 top-0 z-50 w-full mx-auto'
				>
					<div className='flex justify-between items-center h-18 backdrop-blur-md transition-all  px-2 py-4 '>
						<Separator />
						<MaxWidthWrapper className={'flex justify-between items-center'}>
							{/* Logo */}
							<Link href='/'>
								<div className='flex justify-between items-center mx-auto gap-2'>
									<Image
										src={'/logo.png'}
										alt='Logo'
										width={56}
										height={56}
										// objectFit='contain'
									/>
									<h1 className='text-4xl font-normal text-gradient'>Nasim</h1>
								</div>
							</Link>
							{/* Navbar */}
							<ul className='hidden sm:flex justify-between items-center gap-20 text-center'>
								{link.map((item, index) => (
									<Link
										href={item.href}
										className='relative uppercase font-thin hover:text-purple-200  transition-all'
										key={item.id}
									>
										<li>{item.title}</li>
									</Link>
								))}
							</ul>

							<button className='hidden sm:flex border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full text-gradient'>
								<Link href='/#contact'>
									<span>Contact</span>
									<span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px' />
								</Link>
							</button>
						</MaxWidthWrapper>
						{/* Mobile Nav */}
						<MobileNav />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Header;
