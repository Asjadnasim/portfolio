'use client';

import React, { useEffect, useRef } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
	const imageRef = useRef(null);

	useEffect(() => {
		const image = imageRef.current;

		gsap.fromTo(
			image,
			{
				opacity: 0,
				scale: 1.4,
			},
			{
				scale: 1,
				opacity: 1,
				duration: 1.3,
				ease: 'power3.inOut',
				scrollTrigger: {
					trigger: image,
					start: 'top center', // start the animation when the top of the image hits the center of the viewport
					end: 'bottom center', // end the animation when the bottom of the image hits the center of the viewport
					scrub: true, // smooth scrubbing effect
				},
			}
		);

		window.onmousemove = (e) => {
			const imageRect = image.getBoundingClientRect();
			const imageCenterX = imageRect.left + imageRect.width / 2;

			let imagePercent = {
				x: (e.clientX - imageCenterX) / imageRect.width / 2,
			};

			let distFromCenterX = 1 - Math.abs(imagePercent.x);

			gsap
				.timeline({
					defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' },
				})
				.to(
					image,
					{
						rotation: gsap.utils.clamp(-2, 2, 5 * imagePercent.x),
					},
					0
				)
				.to(
					'.highlight', // adjust this selector based on your specific HTML structure
					{
						opacity: distFromCenterX - 0.9,
						x: -10 + 20 * imagePercent.x,
					},
					0
				);
		};

		return () => {
			// Clean up mousemove event listener
			window.onmousemove = null;
		};
	}, []); // Empty dependency array ensures this effect runs only once

	return (
		<div
			id='about'
			className='h-[40rem] w-full mx-auto pt-20 flex justify-evenly items-start gap-2'
		>
			{/* Text */}

			<div className='h-auto w-[40rem] flex flex-col gap-8 flex-start '>
				<h1 className='text-8xl text-start'>Asjad Nasim</h1>
				<p className='text-xl text-justify'>
					{' '}
					I'm a dynamic full-stack web developer fueled by an unwavering passion
					for coding. With a proven track record of tackling complex projects
					and delivering transformative solutions, I thrive in challenging
					environments.
				</p>
				<p className='text-xl text-justify'>
					{' '}
					Beyond my technical prowess, I bring a creative flair and a knack for
					turning innovative ideas into robust, user-friendly applications. I
					thrive on collaboration, always striving for excellence and innovation
					in everything I do.
				</p>
				<p className='text-xl text-justify'>
					When I'm not immersed in code, you'll find me exploring the endless
					possibilities of digital art and pushing the boundaries of web
					devlopment. Join me on this exciting journey as we create something
					truly extraordinary!
				</p>
				<div className='hoverButton flex pointer items-start mt-4'>
					<button className='flex items-center justify-center'>
						<Link href='/#projects' className='flex gap-2'>
							<span>Resume </span>
							<MoveUpRight />
						</Link>
					</button>
				</div>
			</div>
			{/* Image */}
			<div className='mt-20'>
				<img
					ref={imageRef}
					src={'/person.jpg'}
					className='h-[14rem] w-[12rem] rounded-md avatar'
					alt='Man'
				/>
				<div className='highlight absolute  w-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-90'></div>
			</div>
		</div>
	);
};

export default About;
