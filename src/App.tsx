// @ts-nocheck
import * as THREE from 'three'
import * as React from 'react'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Text, Environment, Float, useGLTF, OrbitControls, PresentationControls, Sky } from '@react-three/drei'
import Scene from "./Scene.tsx"

export default function App() {

  return (
    <Suspense fallback={()=><div>LOADING</div>}>
    <Canvas>
      <Scene />
    </Canvas> 
    </Suspense>
  )
}

