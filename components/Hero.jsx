'use client';

import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { motion, stagger, useAnimate } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import CanvasAnimation from './CanvasAnimation';
import Banner from './CanvasAnimation';

const Hero = () => {
	const [scope, animate] = useAnimate();

	const colors = ['text-white', 'text-blue-500', 'text-red-500'];

	const words = 'Explore the Digital World with Asjad Nasim';
	const wordsArray = words.split(' ');

	useEffect(() => {
		animate(
			'span',
			{
				opacity: 1,
			},
			{
				duration: 2,
				delay: stagger(0.2),
			}
		);
	}, [scope.current]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx}
							className='dark:text-white text-black opacity-0'
						>
							{word}{' '}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<MaxWidthWrapper className={'relative pb-20 pt-12'}>
			<div className='text-white w-full h-full'>
				<h1 className='text-6xl md:text-4xl text-center md:text-nowrap tracking-widest text-gradient'>
					{renderWords()}
				</h1>
				<p
					className={`text-center text-4xl md:text-6xl lg:text-[70px] h-36 sm:h-36 md:h-56 mt-8`}
				>
					Embarking on a{' '}
					<span style={{ fontWeight: 'bold' }} className='text-gradient'>
						<Typewriter
							words={[
								'Journey of Creative Exploration and Innovation',
								'New Adventure in Digital Creativity and Innovation',
								'Pathway to Innovation and Creative Exploration!',
							]}
							loop={20}
							cursor
							cursorStyle='|'
							typeSpeed={100}
							deleteSpeed={80}
							delaySpeed={1000}
						/>
					</span>
				</p>
				<div className='hoverButton flex items-center justify-center mt-4'>
					<button className=''>
						<Link href='/#projects'>
							<span>See My Projects</span>
							<span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px' />
						</Link>
					</button>
				</div>
				{/* <CanvasAnimation /> */}
			</div>
		</MaxWidthWrapper>
	);
};

export default Hero;
