import {Canvas} from "@react-three/fiber"

function Box() {
  const { viewport } = useThree()
  const { width, height, factor } = viewport
  const [spring, setSpring] = useSpring(() => ({ position: [0, 0, 0], scale: [1, 1, 1] }))

  const bind = useDrag(({ offset: [x, y] }) => setSpring({ position: [x, y, 0] }), {
    // bounds are expressed in canvas coordinates!
    bounds: { left: -width / 2, right: width / 2, top: -height / 2, bottom: height / 2 },
    rubberband: true,
    transform: ([x, y]) => [x / factor, -y / factor]
  })

  return (
    <a3f.mesh {...bind()} {...spring}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </a3f.mesh>
  )
}
function Transform() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* <Box /> */}
    </Canvas>
  )
}
