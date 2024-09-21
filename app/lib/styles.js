import { Roboto, Poppins } from 'next/font/google'

//colors
export const primary = '#45A29F'
export const base = '#222'


// fonts
export const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
});
