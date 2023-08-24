// @ts-nocheck
import * as THREE from 'three'
import * as React from 'react'
import { Suspense, useRef, useState } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Text, Environment, Float, useGLTF, PresentationControls, Sky } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from "./CustomObject.js" 

extend({  OrbitControls })

export default function App() {

    const {camera, gl, clock} = useThree()
    const meshRef = useRef()

  useFrame((state, delta) => {
    // Remember not to animate using state because of the overhead
    // Downside of the direct incorporation of react-three-fiber
    if (meshRef.current) {
        meshRef.current.rotation.y += delta

    }
  })

  return (
    <Suspense fallback={()=><div>LOADING</div>}>
        <orbitControls args={[camera, gl.domElement]}/>
        <directionalLight position={[1,2,3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <group ref={meshRef}>


            <mesh scale={[3,2,1]}>
                <sphereGeometry args={[1.5,32,32]} />
                <meshStandardMaterial color="mediumpurple" wireframe />
            </mesh>

            <mesh  scale={[3,2,1]}>
                <coneGeometry args={[0.5,2,32]} />
                <meshStandardMaterial color="mediumpurple"  />
            </mesh>

            <CustomObject />

        </group>
      <Environment files={"./sky.hdr"} />
      <ambientLight intensity={0.5} />      
      {/* <color args={['#ff0000']} attach="background"/> */}
    </Suspense>
  )
}

