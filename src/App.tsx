// @ts-nocheck
import * as THREE from 'three'
import * as React from 'react'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Text, Environment, Float, useGLTF, OrbitControls, PresentationControls, Sky } from '@react-three/drei'
import Scene from "./Scene.tsx"
// import Scene2 from "./Scene2.tsx"

export default function App() {

  // const meshRef = useRef()

  // useFrame(() => {
  //   // Remember not to animate using state because of the overhead
  //   // Downside of the direct incorporation of react-three-fiber
  //   console.log('click')
  // })

  return (
    <Suspense fallback={()=><div>LOADING</div>}>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4,3,6]
      }}
    >
      <Scene />
      {/* <Scene2 /> */}
    </Canvas> 
    </Suspense>
  )
}

