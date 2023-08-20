// @ts-nocheck
import * as THREE from 'three'
import * as React from 'react'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { 
    useChain, 
    useTransition, 
    useSpring, 
    a, 
    animated, 
    config, 
    easings, 
    useSpringRef 
} from '@react-spring/three'
import { 
    Html, 
    Text, 
    Environment, 
    Float, 
    useGLTF, 
    OrbitControls, 
    PresentationControls, 
    Sky,
    useCursor 
} from '@react-three/drei'

// https://www.react-spring.dev/docs/components/use-chain
// https://codesandbox.io/s/q6ffu
// https://www.turbosquid.com/3d-models/6-cartoon-smoke-simulation-3d-c4d/1062938

// https://answers.netlify.com/t/change-the-header-x-frame-options-to-one-of-my-environments/27974/7
// https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber

// https://market.pmnd.rs/model/low-poly-spaceship

// https://codesandbox.io/s/wonderful-chandrasekhar-8l9rrj36j0?file=/src/App.js

function SkyBox() {
  const loader = new THREE.TextureLoader();
  const texture = loader.load("./sky.jpg")
  const material = new THREE.MeshPhongMaterial( {
    map: texture,
    // color:0xFFFFFF,
    } );  
  material.side = THREE.BackSide


  return (
    <mesh visible position={[0,0,0]} material={material}>
    
      <sphereGeometry args={[20, 32, 16]} scale={[1,1,1]} />
    </mesh>
  )
}

export default function App() {
    const sceneContainer = [
        {
            title: "Glitch scene 1",
            link: "https://furry-tender-feather.glitch.me/"
        },
        {
            title: "A-Frame Robot",
            link:"https://emotional-robot.glitch.me"
        }
    ,
        
    ]
    const [sceneCounter, setSceneCounter] = useState(0)
    const [sceneObject, setSceneObject] = useState(sceneContainer[sceneCounter])


    // https://www.30secondsofcode.org/react/s/use-key-press/
    const useKeyPress = targetKey => {
        const [keyPressed, setKeyPressed] = React.useState(false);

        const downHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(true);
        };

        const upHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(false);
        };

        React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
        }, []);

        return keyPressed;
    };

    const leftPressed = useKeyPress('ArrowLeft');
    const rightPressed = useKeyPress('ArrowRight');

    const downHandler = ({ key }) => {
        console.log('key', key, sceneCounter)
    };

    useFrame((_, delta) => {
    if (rightPressed && sceneCounter < sceneContainer.length-1) {
        setSceneCounter(sceneCounter+1)
        } else if (leftPressed && sceneCounter>0) {
        setSceneCounter(sceneCounter-1)
        };    
    })  

    React.useEffect(()=>{
    setSceneObject(sceneContainer[sceneCounter])
    }, [sceneCounter])

  const computer = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf")
  const spaceship = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf')


    // SVG creation
    const [page, setPage] = useState(0)

    const colors = ['#21242d', '#ea5158', '#0d4663', '#ffbcb7', '#2d4a3e', '#8bd8d2']
    const urls = ['night', 'city', 'morning', 'tubes', 'woods', 'beach'].map(
      (name) => `https://raw.githubusercontent.com/pmndrs/react-three-fiber/v5.3.22/examples/src/resources/images/svg/${name}.svg`
    )
    const url =  `https://raw.githubusercontent.com/pmndrs/react-three-fiber/v5.3.22/examples/src/resources/images/svg/morning.svg`

    const data = useLoader(SVGLoader, urls[page])
    const shapes = useMemo(() => data.paths.flatMap((g, index) => g.toShapes(true).map((shape) => ({ shape, color: g.color, index }))), [
        data
      ])
    function Shape({ shape, rotation, position, color, opacity, index }) {
        console.log("CALLED", shape, rotation, position, color, opacity, index)
        if (!position) return null
        return (
          <a.mesh rotation={rotation} position={[-1,-1,-1]}>
            <a.meshPhongMaterial color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
            <shapeGeometry args={[shape]} />
          </a.mesh>
        )
      }

      const { color } = useSpring({ color: colors[page] })
      const transition = useTransition(shapes, {
        keys: (item) => item.shape.uuid,
        from: { rotation: [0.0, -Math.PI / 4, 0], position: [0, 50, 200], opacity: 0 },
        enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
        leave: { rotation: [0, 0.25, 0], position: [0, -50, 10], opacity: 0 },
        trail: 5
      })
      const { viewport } = useThree()
      const [hovered, setHoverCursor] = useState()
    useCursor(hovered, /*'pointer', 'auto', document.body*/)
// return (
//   <mesh onPointerOver={() => set(true)} onPointerOut={() => set(false)}></mesh>
const [active, setActive] = useState(false)

const { positionX } = useSpring({
    positionX: active ? 3.5 : 10,
    config: {
        easing: easings.steps(5),
    },

  })

//   https://codesandbox.io/s/try-to-do-forked-gwy21?file=/src/App.js:225-234
  const [{ y }] = useSpring(
    () => ({ to: { y: active ? 6 : 0 }, config: config.wobbly }), [active]
)

//   console.log("EASINGS", easings)
  return (
    <>
             {/* <group position={[1,1,1]} rotation={[0, 0, Math.PI]}>
        {transition((props, item) => (
          <Shape {...item} {...props} />
        ))}
      </group> */}
      <Environment files={"./sky.hdr"} />
      <ambientLight intensity={0.5} />
      <Float matrixWorldAutoUpdate={false} getObjectsByProperty={false} rotationIntensity={0.2}>
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={ 0.8 }
                position={ [ -2, 1.6, 0.8 ] }
                rotation-y={ 0.7 }
                color={'blue'}

            >
                {sceneObject.title}
            </Text>
        </Float>
      <Float matrixWorldAutoUpdate={false} getObjectsByProperty={false} rotationIntensity={0.4}>

        <Float matrixWorldAutoUpdate={false} getObjectsByProperty={false} rotationIntensity={0.2}>
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={ 1 }
                position={ [ 0.25, 0.9, -1 ] }
                rotation-y={ -0.8 }
                maxWidth={ 2 }
                color={'blue'}

            >
                Shawn
            </Text>
        </Float>
        <Float matrixWorldAutoUpdate={false} getObjectsByProperty={false} rotationIntensity={0.2}>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={ 1 }
                    position={ [ 0.25, -0.2, 0 ] }
                    rotation-y={ -0.8 }
                    maxWidth={ 2 }
                    color={'blue'}
                >
                    Oakley
                </Text>       
                </Float>  
            <PresentationControls
                enabled={true} // the controls can be disabled by setting this to false
                global={false} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={true} // Snap-back to center (can also be a spring config)
                speed={1} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[0, 0, 0]} // Default rotation
                polar={[0, Math.PI / 8]} // Vertical limits
                azimuth={[-Math.PI / 8, Math.PI / 8]} // Horizontal limits
                config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                // domElement={events.connected} // The DOM element events for this controller will attach to        
            >                       
                <primitive
                    object= { computer.scene }
                    position-y = {-1.2}
                    position-z = {1}
                    position-x = {-1.5}
                    rotation-y={Math.PI/4}
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1 }
                        position={ [ 0, 1.56, - 1.4 ] }
                        rotation-x={ - 0.256 }
                    >
                        <iframe src={sceneObject.link} />
                    </Html>
                </primitive>
            </PresentationControls>
      </Float>
      <Float matrixWorldAutoUpdate={false} getObjectsByProperty={false} rotationIntensity={0.2}>
        <PresentationControls
                enabled={false} // the controls can be disabled by setting this to false
                global={false} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={true} // Snap-back to center (can also be a spring config)
                speed={1} // Speed factor
                config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                // domElement={events.connected} // The DOM element events for this controller will attach to        
            >                       
                <a.primitive
                    object= { spaceship.scene }
                    // scale={scale}
                    // position-y = {0}
                    position-y = {y}
                    position-z = {1}
                    // position-z={z}
                    position-x = {3.5}
                    // position-x={positionX}
                    // position={position}
                    rotation-y={-Math.PI}
                    rotation-x={Math.PI/2}
                    onPointerOver={() => setHoverCursor(true)} 
                    onPointerOut={() => setHoverCursor(false)}
                    onClick={() => {
                        setActive(!active)
                        setTimeout(()=>window.open('https://codingbeautydev.com', '_blank', 'noreferrer'), 1000);

                    }}
                />
            </PresentationControls>      
        </Float>
      </>
  )
}
