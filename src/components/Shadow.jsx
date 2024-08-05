import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
function Shadow() {
  const mesh = useRef(null);

  useEffect(() => {
    mesh.current.position.set(-4, 0.47, 0);
    // rotate mesh to be horizontal
    mesh.current.rotation.x = -Math.PI / 2;
  }, []);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    mesh.current.material.uniforms.uTime.value = elapsedTime;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  return (
    <>
      <mesh ref={mesh}>
        <planeGeometry args={[10, 10]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          side={THREE.DoubleSide}
          vertexShader={`
            varying vec2 vUv;

            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            
            varying vec2 vUv;

            // write function to create circular shape 
            float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
              uv -= disc_center;
              uv *= 2.0;

              float dist = sqrt(dot(uv, uv));
              float result = smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
              return result;
            }

            void main() {
              vec2 uv = vUv;
              // create circular black shadow in center of plane, and move the shadow with sin wave
              uv.x += sin(uTime) * 0.06; // move shadow up and down with sin wave
              float shadow = circle(uv, vec2(0.5), 0.3, 0.02);
              shadow *= 0.8; // make shadow lighter

              // add shadow to output
              gl_FragColor = vec4(0.0, 0.0, 0.0, shadow);
              // gl_FragColor = vec4(vUv, 1.0, 1.0);
            }
          `}
          transparent={true}
        />
      </mesh>
    </>
  );
}

export default Shadow;
