import { Canvas } from '@react-three/fiber';
import './App.css';
import Experience from './components/Experience';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import LoaderCustom from './components/loader/LoaderCustom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHelmet from './components/seo/SEOHelmet';

const TITLE = 'EQUILUM';

export const useStore = create((set) => ({
  totalAssets: 5,
  isLoaded: false,
  setIsLoaded: (value) => set(() => ({ isLoaded: value })),
}));

function App() {
  const [scrolled, setScrolled] = useState(false);
  const isLoaded = useStore((state) => state.isLoaded);

  useGSAP(() => {
    if (!isLoaded) return;

    // gsap.set(['.titleLetter', '.titleScroll'], { opacity: 0 });
    gsap.to('.titleLetter', {
      duration: 3,
      opacity: 1,
      delay: 0.5,
      stagger: 0.25,
    });
    gsap.to('.titleScroll', {
      duration: 1,
      opacity: 1,
      delay: 3,
    });
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to('.titleScroll', {
        duration: 1,
        opacity: 0,
      });
    }
  }, [scrolled]);

  return (
    <>
      <HelmetProvider>
        <SEOHelmet />
        {!isLoaded && <LoaderCustom />}
        <div className="no-scrollbar h-[200vh] w-full overflow-y-scroll">
          <div className="fixed left-0 top-0 h-screen w-full">
            <Canvas>
              <Experience />
            </Canvas>
          </div>
          <div className="fixed left-0 top-0 flex h-screen w-full select-none items-center justify-center">
            <span className="title">
              {TITLE.split('').map((letter, index) => (
                <span key={index} className="titleLetter opacity-0">
                  {letter}
                </span>
              ))}
            </span>
            <span className="titleScroll text-xs tracking-[0.75rem] opacity-0 sm:text-sm sm:tracking-[0.875rem]">
              Scroll Down
            </span>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}

export default App;
