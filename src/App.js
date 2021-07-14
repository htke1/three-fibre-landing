
import './App.scss';
import {Canvas, useFrame} from 'react-three-fiber'
import { useRef , useState} from 'react';
import {useSpring, a} from 'react-spring'
import { OrbitControls } from '@react-three/drei';
const BoxAnimated = ({meshPos, color, args}) => {
  const meshRef = useRef(null);
  const [expanded, setExpanded]= useState(false);
  const [scaling, setScale]=useState([1,1,1]);
 function handleClick(){
   setExpanded(!expanded);
if(expanded){
  setScale([1.3,1.3,1.3]);
}
else{
  setScale([1,1,1])
}
 }
  useFrame(()=>{meshRef.current.rotation.x=meshRef.current.rotation.y +=0.005})
  return (
 
            <mesh castShadow ref={meshRef}  onClick={handleClick} scale={scaling} position={meshPos}>
    <boxBufferGeometry attach="geometry" args={args}/>
    <meshStandardMaterial attach="material" color={color}/>
  </mesh>
     
  );
};


function App() {
  return (
    <>
    <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}>
        {/* This light makes things look pretty */}
        <ambientLight intensity={0.3} />
        {/* Our main source of light, also casting our shadow */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* A light to help illumnate the spinning boxes */}
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          {/* This mesh is the plane (The floor) */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          <BoxAnimated
            meshPos={[0, 1, 0]}
            color='lightblue'
            args={[3, 2, 1]}
            speed={2}
          />
          <BoxAnimated meshPos={[-2, 1, -5]} color='pink' speed={6} />
          <BoxAnimated meshPos={[5, 1, -2]} color='pink' speed={6} />
        </group>
        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
  
    </>
  );
}

export default App;
