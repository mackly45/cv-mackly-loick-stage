import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import gsap from 'gsap'

function StarField(props) {
  const ref = useRef()
  const [sphere] = random.inSphere(new Float32Array(6000), { radius: 1.5 })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current = e.detail
    }
    window.addEventListener('mousemove_parallax', handleMouse)
    return () => window.removeEventListener('mousemove_parallax', handleMouse)
  }, [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 12
    ref.current.rotation.y -= delta / 18

    // Parallax effect
    gsap.to(ref.current.position, {
      x: mouse.current.x * 0.1,
      y: -mouse.current.y * 0.1,
      duration: 1,
      ease: 'power2.out'
    })
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00e5ff"
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  )
}

export default Background3D
