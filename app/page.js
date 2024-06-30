import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5'>
			<Hero />
		</main>
	);
}
