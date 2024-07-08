import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GroundFloor = (props) => {
  const { onAreaClick } = props;
  const { nodes, materials } = useGLTF('/3f.glb');
  const { scene, camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const [lastIntersectedObject, setLastIntersectedObject] = useState(null);

  useEffect(() => {
    const handleMouseClick = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(
        [nodes.area01, nodes.area02, nodes.area03, nodes.createdArea],
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Reset the color of the last intersected object
        if (lastIntersectedObject && lastIntersectedObject !== intersectedObject) {
          lastIntersectedObject.material.color.setHex(0xFFFFFF); // Change to white
        }

        // Set the color of the new intersected object and handle drawer content
        handleAreaClick(intersectedObject);
        setLastIntersectedObject(intersectedObject);
      }
    };

    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, [camera, onAreaClick, nodes.area01, nodes.area02, nodes.area03, nodes.createdArea, lastIntersectedObject]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.area02.geometry}
        material={materials.area02}
        position={[0.109, 0, -0.186]}
        name='area02'
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={nodes.Plane003.material}
        position={[0.181, 0, 0.43]}
        rotation={[0, 1.467, 0]}
        scale={0.532}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane018.geometry}
        material={nodes.Plane018.material}
        position={[0.45, 0, -0.015]}
        rotation={[0, 1.274, 0]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane019.geometry}
        material={nodes.Plane019.material}
        position={[0.559, -0.006, -0.189]}
        rotation={[0, 1.297, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane020.geometry}
        material={nodes.Plane020.material}
        position={[0.584, 0, -0.308]}
        rotation={[0, 1.412, -3.141]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane021.geometry}
        material={nodes.Plane021.material}
        position={[0.797, 0, -0.632]}
        rotation={[0, -0.305, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane022.geometry}
        material={nodes.Plane022.material}
        position={[0.601, 0, -0.499]}
        rotation={[0, 1.34, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane023.geometry}
        material={nodes.Plane023.material}
        position={[0.776, 0, -0.564]}
        rotation={[0, -0.305, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane052.geometry}
        material={nodes.Plane052.material}
        position={[2.373, 0, 0.637]}
        rotation={[0, 0.559, 0]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane054.geometry}
        material={nodes.Plane054.material}
        position={[2.309, 0, 0.642]}
        rotation={[-Math.PI, 1.539, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane055.geometry}
        material={nodes.Plane055.material}
        position={[2.242, 0, 0.642]}
        rotation={[-Math.PI, 1.539, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane056.geometry}
        material={nodes.Plane056.material}
        position={[2.175, 0, 0.642]}
        rotation={[-Math.PI, 1.539, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane057.geometry}
        material={nodes.Plane057.material}
        position={[2.109, 0, 0.642]}
        rotation={[-Math.PI, 1.539, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane058.geometry}
        material={nodes.Plane058.material}
        position={[2.109, 0, 0.641]}
        rotation={[-Math.PI, 1.539, -Math.PI]}
        scale={[0.597, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane060.geometry}
        material={nodes.Plane060.material}
        position={[1.857, 0, 0.603]}
        rotation={[-Math.PI, 0.783, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane064.geometry}
        material={nodes.Plane064.material}
        position={[1.455, 0, 0.332]}
        rotation={[0, 0.791, 0]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane065.geometry}
        material={nodes.Plane065.material}
        position={[0.892, 0, 0.454]}
        rotation={[-Math.PI, 0.411, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane068.geometry}
        material={nodes.Plane068.material}
        position={[1.082, 0, 0.751]}
        rotation={[Math.PI, -0.911, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane071.geometry}
        material={nodes.Plane071.material}
        position={[0.391, 0, 0.87]}
        rotation={[Math.PI, -1.377, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane076.geometry}
        material={nodes.Plane076.material}
        position={[0.647, 0, 1.022]}
        rotation={[Math.PI, -1.039, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane077.geometry}
        material={nodes.Plane077.material}
        position={[0.692, 0, 1.061]}
        rotation={[Math.PI, -1.039, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.area01.geometry}
        material={materials.area01}
        position={[-0.086, -0.004, 0.104]}
        rotation={[0, 0, 3.137]}
        name='area01'
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane085.geometry}
        material={nodes.Plane085.material}
        position={[-0.488, -0.002, 0.999]}
        rotation={[-0.006, -0.882, 3.134]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.area03.geometry}
        material={materials.area03}
        position={[-0.39, -0.003, -0.196]}
        rotation={[0.001, 0.215, 3.137]}
        scale={[1.32, 0.989, 0.327]}
        name='area03'
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane096.geometry}
        material={nodes.Plane096.material}
        position={[-0.943, 0, -0.013]}
        rotation={[-0.016, -1.274, 3.125]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane097.geometry}
        material={nodes.Plane097.material}
        position={[-0.506, -0.002, -0.194]}
        rotation={[-0.018, -1.297, 3.123]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane098.geometry}
        material={nodes.Plane098.material}
        position={[-0.528, -0.002, -0.308]}
        rotation={[-0.03, -1.412, -0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane100.geometry}
        material={nodes.Plane100.material}
        position={[-0.561, -0.002, -0.563]}
        rotation={[-0.018, -1.304, 3.123]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane102.geometry}
        material={nodes.Plane102.material}
        position={[-0.596, -0.002, -0.758]}
        rotation={[-0.02, -1.328, 3.121]}
        scale={[0.593, 1, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane106.geometry}
        material={nodes.Plane106.material}
        position={[-0.978, 0, -0.645]}
        rotation={[-0.02, -1.328, 3.121]}
        scale={[0.593, 1, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane122.geometry}
        material={nodes.Plane122.material}
        position={[-2.318, 0.007, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane123.geometry}
        material={nodes.Plane123.material}
        position={[-2.252, 0.007, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane124.geometry}
        material={nodes.Plane124.material}
        position={[-2.185, 0.006, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane125.geometry}
        material={nodes.Plane125.material}
        position={[-2.118, 0.006, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane126.geometry}
        material={nodes.Plane126.material}
        position={[-2.053, 0.006, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane127.geometry}
        material={nodes.Plane127.material}
        position={[-2.053, 0.006, 0.641]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[0.597, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane128.geometry}
        material={nodes.Plane128.material}
        position={[-2.05, 0.006, 0.642]}
        rotation={[-2.989, -1.538, 0.153]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane129.geometry}
        material={nodes.Plane129.material}
        position={[-1.801, 0.004, 0.603]}
        rotation={[-3.137, -0.783, 0.007]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane130.geometry}
        material={nodes.Plane130.material}
        position={[-1.65, 0.004, 0.643]}
        rotation={[-0.005, -0.791, 3.135]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane131.geometry}
        material={nodes.Plane131.material}
        position={[-1.441, 0.003, 0.359]}
        rotation={[-0.005, -0.791, 3.135]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane135.geometry}
        material={nodes.Plane135.material}
        position={[-1.179, 0.001, 0.668]}
        rotation={[-3.138, -0.671, 0.006]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane136.geometry}
        material={nodes.Plane136.material}
        position={[-1.098, 0.001, 0.681]}
        rotation={[3.135, 0.911, 0.008]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane137.geometry}
        material={nodes.Plane137.material}
        position={[-1.025, 0, 0.751]}
        rotation={[3.135, 0.911, 0.008]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane138.geometry}
        material={nodes.Plane138.material}
        position={[-0.818, -0.001, 1.002]}
        rotation={[-3.138, -0.647, 0.006]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane139.geometry}
        material={nodes.Plane139.material}
        position={[-0.614, -0.002, 1.04]}
        rotation={[3.134, 1.022, 0.009]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane140.geometry}
        material={nodes.Plane140.material}
        position={[-0.334, -0.003, 0.87]}
        rotation={[3.116, 1.377, 0.026]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane141.geometry}
        material={nodes.Plane141.material}
        position={[-0.442, -0.002, 0.922]}
        rotation={[3.127, 1.238, 0.015]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane142.geometry}
        material={nodes.Plane142.material}
        position={[-0.493, -0.002, 0.952]}
        rotation={[3.129, 1.192, 0.013]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane143.geometry}
        material={nodes.Plane143.material}
        position={[-0.543, -0.002, 0.985]}
        rotation={[3.131, 1.116, 0.011]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane144.geometry}
        material={nodes.Plane144.material}
        position={[-0.59, -0.002, 1.022]}
        rotation={[3.133, 1.039, 0.01]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane145.geometry}
        material={nodes.Plane145.material}
        position={[-0.635, -0.001, 1.061]}
        rotation={[3.133, 1.039, 0.01]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane089.geometry}
        material={nodes.Plane089.material}
        position={[-0.396, -0.004, -0.035]}
        rotation={[0, -1.262, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane147.geometry}
        material={nodes.Plane147.material}
        position={[-0.579, -0.004, -0.13]}
        rotation={[0, 0.33, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane134.geometry}
        material={nodes.Plane134.material}
        position={[-0.855, 0, 0.961]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane148.geometry}
        material={nodes.Plane148.material}
        position={[-0.818, 0, 0.994]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane149.geometry}
        material={nodes.Plane149.material}
        position={[-0.892, 0, 0.927]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane150.geometry}
        material={nodes.Plane150.material}
        position={[-0.929, 0, 0.893]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane151.geometry}
        material={nodes.Plane151.material}
        position={[-1.003, 0, 0.827]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane152.geometry}
        material={nodes.Plane152.material}
        position={[-0.967, 0, 0.86]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane153.geometry}
        material={nodes.Plane153.material}
        position={[-1.003, 0, 0.827]}
        rotation={[0, -0.71, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane154.geometry}
        material={nodes.Plane154.material}
        position={[-1.202, -0.004, -0.079]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane155.geometry}
        material={nodes.Plane155.material}
        position={[-1.608, -0.004, -0.068]}
        rotation={[0, 0.706, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane158.geometry}
        material={nodes.Plane158.material}
        position={[-0.98, 0, -0.111]}
        rotation={[-0.016, -1.274, 3.125]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane164.geometry}
        material={nodes.Plane164.material}
        position={[-0.254, -0.004, 0.758]}
        rotation={[0, 0.484, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane167.geometry}
        material={nodes.Plane167.material}
        position={[-0.097, -0.004, 0.623]}
        rotation={[0, -1.561, -0.005]}
        scale={[-1, -1, -0.105]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane168.geometry}
        material={nodes.Plane168.material}
        position={[0.064, -0.004, 0.613]}
        rotation={[0.031, 1.51, -0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane169.geometry}
        material={nodes.Plane169.material}
        position={[0.154, -0.004, 0.624]}
        rotation={[0.183, 1.56, 2.953]}
        scale={[-1, -1, -0.105]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane171.geometry}
        material={nodes.Plane171.material}
        position={[-0.306, -0.003, -0.431]}
        rotation={[0, -1.439, 3.137]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane172.geometry}
        material={nodes.Plane172.material}
        position={[-0.359, -0.003, -0.48]}
        rotation={[0, 0.083, 3.137]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane173.geometry}
        material={nodes.Plane173.material}
        position={[0.131, -0.003, -0.576]}
        rotation={[0, -0.132, 3.137]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane174.geometry}
        material={nodes.Plane174.material}
        position={[0.366, -0.003, -0.553]}
        rotation={[0, -0.132, 3.137]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane175.geometry}
        material={nodes.Plane175.material}
        position={[0.332, -0.003, -0.595]}
        rotation={[Math.PI, -1.413, -0.005]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane176.geometry}
        material={nodes.Plane176.material}
        position={[0.317, -0.003, -0.597]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane177.geometry}
        material={nodes.Plane177.material}
        position={[0.256, -0.003, -0.604]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane178.geometry}
        material={nodes.Plane178.material}
        position={[0.2, -0.003, -0.611]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane179.geometry}
        material={nodes.Plane179.material}
        position={[0.137, -0.003, -0.619]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane180.geometry}
        material={nodes.Plane180.material}
        position={[0.372, -0.003, -0.59]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane183.geometry}
        material={nodes.Plane183.material}
        position={[0.099, -0.003, -0.512]}
        rotation={[-0.002, -0.02, -0.003]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane184.geometry}
        material={nodes.Plane184.material}
        position={[0.4, 0.004, -0.51]}
        rotation={[0, 1.385, 3.137]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane185.geometry}
        material={nodes.Plane185.material}
        position={[0.549, 0, -1.036]}
        rotation={[0, 1.383, 0]}
        scale={[0.593, 1, 0.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane186.geometry}
        material={nodes.Plane186.material}
        position={[0.571, 0, -1.031]}
        rotation={[0, 1.328, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane187.geometry}
        material={nodes.Plane187.material}
        position={[0.494, 0, -1.044]}
        rotation={[0, 1.363, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane188.geometry}
        material={nodes.Plane188.material}
        position={[0.414, 0, -1.055]}
        rotation={[0, 1.363, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane189.geometry}
        material={nodes.Plane189.material}
        position={[0.335, 0, -1.065]}
        rotation={[0, 1.363, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane190.geometry}
        material={nodes.Plane190.material}
        position={[0.256, 0, -1.073]}
        rotation={[0, 1.441, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane191.geometry}
        material={nodes.Plane191.material}
        position={[0.18, 0, -1.078]}
        rotation={[0, 1.441, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane192.geometry}
        material={nodes.Plane192.material}
        position={[0.107, 0.004, -0.561]}
        rotation={[Math.PI, -1.413, 3.137]}
        scale={[-1.038, -0.989, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane193.geometry}
        material={nodes.Plane193.material}
        position={[-0.54, 0.006, -0.901]}
        rotation={[0.002, 0.211, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane194.geometry}
        material={nodes.Plane194.material}
        position={[-0.532, 0.006, -1.186]}
        rotation={[0.012, -1.447, -3.134]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane195.geometry}
        material={nodes.Plane195.material}
        position={[-0.54, 0, -0.906]}
        rotation={[-0.005, 0.167, 3.141]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane196.geometry}
        material={nodes.Plane196.material}
        position={[-0.553, 0, -0.971]}
        rotation={[-0.005, 0.167, 3.141]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane197.geometry}
        material={nodes.Plane197.material}
        position={[-0.567, 0, -1.037]}
        rotation={[-0.005, 0.167, 3.141]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane198.geometry}
        material={nodes.Plane198.material}
        position={[-0.581, 0, -1.102]}
        rotation={[-0.005, 0.167, 3.141]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane199.geometry}
        material={nodes.Plane199.material}
        position={[-0.596, 0, -1.17]}
        rotation={[-0.005, 0.167, 3.141]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane200.geometry}
        material={nodes.Plane200.material}
        position={[-0.593, 0, -1.174]}
        rotation={[-0.027, -1.394, 3.114]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane201.geometry}
        material={nodes.Plane201.material}
        position={[-0.524, 0, -1.188]}
        rotation={[-0.027, -1.394, 3.114]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane202.geometry}
        material={nodes.Plane202.material}
        position={[-0.454, 0, -1.2]}
        rotation={[-0.027, -1.394, 3.114]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane203.geometry}
        material={nodes.Plane203.material}
        position={[-0.383, 0, -1.21]}
        rotation={[-0.044, -1.462, 3.097]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane204.geometry}
        material={nodes.Plane204.material}
        position={[-0.312, 0, -1.219]}
        rotation={[-0.044, -1.462, 3.097]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane205.geometry}
        material={nodes.Plane205.material}
        position={[-0.241, 0, -1.227]}
        rotation={[-0.08, -1.51, 3.061]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane206.geometry}
        material={nodes.Plane206.material}
        position={[-0.17, 0, -1.232]}
        rotation={[-0.163, -1.541, 2.978]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane207.geometry}
        material={nodes.Plane207.material}
        position={[-0.075, 0, -1.075]}
        rotation={[-0.163, -1.541, 2.978]}
        scale={[5.824, 4.494, 0.167]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane208.geometry}
        material={nodes.Plane208.material}
        position={[-0.088, 0, -1.242]}
        rotation={[-0.163, -1.541, 2.978]}
        scale={[2.938, 1, 0.212]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane209.geometry}
        material={nodes.Plane209.material}
        position={[-0.099, 0, -1.236]}
        rotation={[-0.163, -1.541, 2.978]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane210.geometry}
        material={nodes.Plane210.material}
        position={[0.057, 0, -1.057]}
        rotation={[-0.163, -1.541, 2.978]}
        scale={[2.362, 1.823, 0.068]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane211.geometry}
        material={nodes.Plane211.material}
        position={[0.177, 0, -1.078]}
        rotation={[0, 1.441, 0]}
        scale={[1.077, 1.98, 0.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane213.geometry}
        material={nodes.Plane213.material}
        position={[-2.174, 0.006, 0.379]}
        rotation={[-0.004, -0.641, 3.135]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.createdArea.geometry}
        material={materials.createdMaterial}
        position={[0.009, 0.015, -0.157]}
        scale={[2.43, 2.43, 1.341]}
        name='createdArea'
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={nodes.Plane002.material}
        position={[-1.25, 0.072, 0.607]}
        rotation={[0, -0.674, 3.137]}
        scale={0.577}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={nodes.Plane004.material}
        position={[0.933, -0.04, 0.954]}
        rotation={[0, -0.876, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.285, 0.009, 0.835]}
        rotation={[Math.PI, -1.299, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={nodes.Plane006.material}
        position={[-0.454, 0.094, 0.935]}
        rotation={[0, -1.083, 0]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[0.17, 0.006, -1.093]}
        rotation={[3.127, -1.467, -0.019]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.178, 0, -1.093]}
        rotation={[-3.048, -1.519, 0.092]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={nodes.Plane011.material}
        position={[0.249, 0, -1.089]}
        rotation={[-3.048, -1.519, 0.092]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={nodes.Plane012.material}
        position={[0.32, 0, -1.083]}
        rotation={[-3.101, -1.452, 0.039]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={nodes.Plane013.material}
        position={[0.392, 0, -1.076]}
        rotation={[-3.101, -1.452, 0.039]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={nodes.Plane014.material}
        position={[0.463, 0, -1.067]}
        rotation={[-3.113, -1.403, 0.027]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={nodes.Plane015.material}
        position={[0.533, 0, -1.056]}
        rotation={[-3.117, -1.372, 0.023]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane017.geometry}
        material={nodes.Plane017.material}
        position={[0.603, 0, -1.044]}
        rotation={[-3.117, -1.372, 0.023]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={nodes.Plane016.material}
        position={[0.487, -0.006, -0.026]}
        rotation={[0, 1.34, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane025.geometry}
        material={nodes.Plane025.material}
        position={[0.615, -0.006, -0.093]}
        rotation={[0, -0.201, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane026.geometry}
        material={nodes.Plane026.material}
        position={[1.228, 0, 0.013]}
        rotation={[-3.135, -0.782, 0.003]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane027.geometry}
        material={nodes.Plane027.material}
        position={[1.26, 0, -0.082]}
        rotation={[0, -0.586, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane028.geometry}
        material={nodes.Plane028.material}
        position={[1.036, 0.054, 0.113]}
        rotation={[-Math.PI, 0.411, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029.geometry}
        material={nodes.Plane029.material}
        position={[1.047, 0, 0.213]}
        rotation={[-Math.PI, 0.411, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane030.geometry}
        material={nodes.Plane030.material}
        position={[1.148, 0.054, 0.202]}
        rotation={[0, 1.279, 0]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane032.geometry}
        material={nodes.Plane032.material}
        position={[0.936, 0.07, 0.501]}
        rotation={[-3.136, -0.49, 0.001]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane036.geometry}
        material={nodes.Plane036.material}
        position={[0.075, 0, -0.976]}
        rotation={[0, -0.305, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane037.geometry}
        material={nodes.Plane037.material}
        position={[-0.898, -0.004, -0.253]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane038.geometry}
        material={nodes.Plane038.material}
        position={[-0.811, 0.056, 0.037]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane039.geometry}
        material={nodes.Plane039.material}
        position={[-0.916, 0.056, 0.091]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane040.geometry}
        material={nodes.Plane040.material}
        position={[-1.081, 0.056, 0.278]}
        rotation={[0, -1.032, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane041.geometry}
        material={nodes.Plane041.material}
        position={[-1.051, 0.056, 0.173]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane042.geometry}
        material={nodes.Plane042.material}
        position={[-1.096, 0.056, 0.445]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane043.geometry}
        material={nodes.Plane043.material}
        position={[-1.125, 0.056, 0.574]}
        rotation={[0, -1.032, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane044.geometry}
        material={nodes.Plane044.material}
        position={[-0.675, 0, 0.376]}
        rotation={[-0.014, -1.225, 3.127]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane045.geometry}
        material={nodes.Plane045.material}
        position={[-1.028, 0.056, 0.521]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046.geometry}
        material={nodes.Plane046.material}
        position={[-1.299, 0.056, 0.291]}
        rotation={[0, 0.589, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane047.geometry}
        material={nodes.Plane047.material}
        position={[-1.861, -0.004, 0.187]}
        rotation={[0, 0.706, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane048.geometry}
        material={nodes.Plane048.material}
        position={[-1.799, -0.004, 0.413]}
        rotation={[0, -0.818, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane049.geometry}
        material={nodes.Plane049.material}
        position={[-1.855, 0.056, 0.495]}
        rotation={[0, -0.818, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane050.geometry}
        material={nodes.Plane050.material}
        position={[-2.051, -0.004, 0.44]}
        rotation={[0, 0.706, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={nodes.Plane005.material}
        position={[2.008, 0, 0.668]}
        rotation={[0, -0.586, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane024.geometry}
        material={nodes.Plane024.material}
        position={[0.181, 0, 0.43]}
        rotation={[0, 1.467, 0]}
        scale={0.532}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane051.geometry}
        material={nodes.Plane051.material}
        position={[0.544, 0, 0.999]}
        rotation={[0, 0.882, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane053.geometry}
        material={nodes.Plane053.material}
        position={[1.082, 0, 0.751]}
        rotation={[Math.PI, -0.911, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane059.geometry}
        material={nodes.Plane059.material}
        position={[0.671, 0, 1.04]}
        rotation={[Math.PI, -1.022, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane061.geometry}
        material={nodes.Plane061.material}
        position={[0.933, -0.04, 0.954]}
        rotation={[0, -0.876, 3.137]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane062.geometry}
        material={nodes.Plane062.material}
        position={[0.936, 0.07, 0.501]}
        rotation={[-3.136, -0.49, 0.001]}
        scale={[0.448, 0.989, 0.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane063.geometry}
        material={nodes.Plane063.material}
        position={[0.572, 0, 0.473]}
        rotation={[-Math.PI, 0.411, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane066.geometry}
        material={nodes.Plane066.material}
        position={[0.433, 0, 0.419]}
        rotation={[-Math.PI, 0.411, -Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane067.geometry}
        material={nodes.Plane067.material}
        position={[0.575, 0.054, 0.478]}
        rotation={[Math.PI, -1.222, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane069.geometry}
        material={nodes.Plane069.material}
        position={[0.389, 0.054, 0.423]}
        rotation={[Math.PI, -1.222, Math.PI]}
        scale={[1.296, 1, 0.037]}
      />
    </group>
  )
}

useGLTF.preload('/3f.glb')
export default GroundFloor