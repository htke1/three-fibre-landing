
import './App.scss';
import {Canvas, useFrame} from 'react-three-fiber'
import { useRef , useState} from 'react';
import {useSpring, a} from 'react-spring'
import { OrbitControls } from '@react-three/drei';
const BoxAnimated = ({meshPos, color}) => {
  const meshRef = useRef(null);
  const [expanded, setExpanded]= useState(false);
  const props= useSpring({
scale: expanded? [1.3,1.3,1.3]: [1,1,1],
  })
  useFrame(()=>{meshRef.current.rotation.x=meshRef.current.rotation.y +=0.005})
  return (
 
            <mesh  ref={meshRef} onClick={()=>console.log("hello")} position={meshPos}>
    <boxBufferGeometry attach="geometry" args={[1,1,1]}/>
    <meshStandardMaterial attach="material" color={color}/>
  </mesh>
     
  );
};


function App() {
  return (
    <>
  <Canvas castShadow colorManagement camera={{ position: [-5,2,10], fov: 40}}>
    <ambientLight intensity={0.4}/>
    <pointLight intensity={0.3} position={[-10,0,-20]}/>
    <pointLight intensity={1.3} position={[0,0,-20]}/>
    <directionalLight />
  <BoxAnimated meshPos={[-1,1,2]} color={"gold"}/>
  <BoxAnimated meshPos={[-2,1,-2]} color={"platinum"}/>
  <BoxAnimated meshPos={[4,1,-2]} color={"silver"}/>
  <OrbitControls/>
  </Canvas>
  
    </>
  );
}

export default App;
