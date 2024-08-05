import React, { Suspense } from 'react';
import { Model } from './Model';
import Sky from './Sky';
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import Shadow from './Shadow';

function Experience() {
  return (
    <>
      <Suspense fallback={null}>
        <Model />
        <Shadow />
        <Sky />
      </Suspense>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          intensity={3}
          mipmapBlur={true}
          radius={0.8}
        />
        <Noise premultiply blendFunction={0} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

export default Experience;
