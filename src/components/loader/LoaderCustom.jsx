import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

function LoaderCustom() {
  const setIsLoaded = useStore((state) => state.setIsLoaded);
  const loader = useRef(null);
  const totalAssets = useStore((state) => state.totalAssets);
  const [maxAssets, setMaxAssets] = useState(totalAssets);
  const currentAssets = useRef(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [isExitAnimation, setIsExitAnimation] = useState(false);

  useEffect(() => {
    THREE.DefaultLoadingManager.onProgress = function (
      url,
      itemsLoaded,
      itemsTotal
    ) {
      currentAssets.current = itemsLoaded;
      setMaxAssets(Math.max(itemsTotal, maxAssets));
      setLoadedAssets(itemsLoaded);
      // console.log(
      //   'Loading file: ' +
      //     url +
      //     '.\nLoaded ' +
      //     itemsLoaded +
      //     ' of ' +
      //     itemsTotal +
      //     ' files.'
      // );
    };
  }, []);

  useGSAP(() => {
    // console.log(loadedAssets, totalAssets, currentAssets.current);
    if (isExitAnimation) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    // console.log(loadedAssets, totalAssets, currentAssets.current);

    if (loadedAssets >= totalAssets || currentAssets.current >= totalAssets) {
      setIsExitAnimation(true);

      tl.to(['.loaderOverlay'], {
        y: '-100%',
        duration: 1,
        delay: 1,
        stagger: 0.07,
        onComplete: () => {
          setIsLoaded(true);
        },
      });
    }
  }, [loadedAssets, maxAssets]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      setLoadedAssets((prev) => lerp(prev, currentAssets.current, 0.1));
    };

    const raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={loader}
        className="loaderOverlay fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-[#000000] text-white will-change-transform"
      >
        <span>
          {Math.round(Math.min(loadedAssets / totalAssets, 1) * 100)}%
        </span>
      </div>
      <div className="loaderOverlay fixed left-0 top-0 z-[998] flex h-screen w-full bg-[#d3d3d3] will-change-transform"></div>
      <div className="loaderOverlay fixed left-0 top-0 z-[996] flex h-screen w-full bg-[#8d8d8d] will-change-transform"></div>
      <div className="loaderOverlay fixed left-0 top-0 z-[994] flex h-screen w-full bg-[#5e5e5e] will-change-transform"></div>
      <div className="loaderOverlay fixed left-0 top-0 z-[993] flex h-screen w-full bg-[#2f2f2f] will-change-transform"></div>
      <div className="loaderOverlay fixed left-0 top-0 z-[993] flex h-screen w-full bg-[#000000] will-change-transform"></div>
    </>
  );
}

export default LoaderCustom;
