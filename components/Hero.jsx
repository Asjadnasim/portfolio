'use client';

import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { motion, stagger, useAnimate } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Separator from './Separator';
import { FaLocationArrow } from 'react-icons/fa';

const Hero = () => {
	const [scope, animate] = useAnimate();
	const [typewriterStart, setTypewriterStart] = useState(false);

	const colors = ['text-white', 'text-blue-500', 'text-red-500'];

	const words = 'Unlock Boundless Creativity and Innovation';
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
		).then(() => {
			setTypewriterStart(true);
		});
	}, [scope.current]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => (
					<motion.span
						key={word + idx}
						className='dark:text-white text-black opacity-0'
					>
						{word}{' '}
					</motion.span>
				))}
			</motion.div>
		);
	};

	return (
		<MaxWidthWrapper className={'relative pb-20 pt-32 '}>
			<div className='text-white w-full h-full'>
				<h1 className='text-6xl md:text-4xl text-center md:text-nowrap tracking-widest '>
					{renderWords()}
				</h1>
				<p
					className={`text-start text-4xl md:text-6xl lg:text-[70px] h-36 sm:h-36 md:h-56 mt-8`}
				>
					Transforming Concepts into{' '}
					<span style={{ fontWeight: 'bold' }} className='text-gradient'>
						{typewriterStart && (
							<Typewriter
								words={[
									'Reality with Precision and Creativity',
									'Masterpieces of Innovation and Creativity',
									'Stunning Digital Realities!',
								]}
								loop={20}
								cursor
								cursorStyle='|'
								typeSpeed={100}
								deleteSpeed={80}
								delaySpeed={1000}
							/>
						)}
					</span>
				</p>
				<div className='hoverButton flex items-center justify-center mt-4'>
					<button className=''>
						<Link
							href='/#projects'
							className='flex justify-between items-center gap-2'
						>
							<span>See My Projects</span>
							<FaLocationArrow />
						</Link>
					</button>
				</div>
			</div>
			<Separator />
		</MaxWidthWrapper>
	);
};

export default Hero;
