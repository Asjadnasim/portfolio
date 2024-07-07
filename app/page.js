import ThreeDModel from '@/components/3D-Model';
import About from '@/components/About';
import Hero from '@/components/Hero';

export default function Home() {
	return (
		<main className='relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5'>
			<Hero />
			<About />
			<ThreeDModel />
		</main>
	);
}
