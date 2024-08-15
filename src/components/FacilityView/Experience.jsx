import Effects from './Effects.jsx'
import { BakeShadows, OrbitControls } from '@react-three/drei'
import GridFloor from './GridFloor.jsx'
import Building from './Building/Buliding.jsx'
import EnvironmentAndLights from './EnvironmentLights.jsx'
import DynamicOrbitControls from './DynamicOrbitControls.jsx'

export default function Experience() {
  return (
    <>
      <EnvironmentAndLights />
      <Building position={[0, 0.6, 0]} scale={0.5} />
      <GridFloor />
      <Effects />
      <DynamicOrbitControls />
    </>
  )
}
