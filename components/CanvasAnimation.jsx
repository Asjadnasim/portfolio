import React, { useEffect, useRef } from 'react';

const Banner = () => {
	const canvasRef = useRef(null);
	let dots = [];
	const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			dots = [];
			for (let index = 0; index < 50; index++) {
				dots.push({
					x: Math.floor(Math.random() * canvas.width),
					y: Math.floor(Math.random() * canvas.height),
					size: Math.random() * 3 + 5,
					color: arrayColors[Math.floor(Math.random() * 5)],
				});
			}
			drawDots();
		};

		const drawDots = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			dots.forEach((dot) => {
				ctx.fillStyle = dot.color;
				ctx.beginPath();
				ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
				ctx.fill();
			});
		};

		const handleMouseMove = (event) => {
			const rect = canvas.getBoundingClientRect();
			const mouse = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			};

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawDots();

			dots.forEach((dot) => {
				const distance = Math.sqrt(
					(mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
				);
				if (distance < 300) {
					ctx.strokeStyle = dot.color;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(dot.x, dot.y);
					ctx.lineTo(mouse.x, mouse.y);
					ctx.stroke();
				}
			});
		};

		const handleMouseOut = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawDots();
		};

		// Initial setup
		resizeCanvas();

		// Event listeners
		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return (
		<div className='banner'>
			<canvas ref={canvasRef} id='dotsCanvas'></canvas>
		</div>
	);
};

export default Banner;
