import './globals.css';
import { ThemeProvider } from './provider';

export const metadata = {
	title: `Asjad's Portfolio`,
	description: `Welcome to my portfolio! Here, you’ll find a showcase of my creative projects and professional work, featuring a blend of innovative design and functionality. `,
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
