export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 40]} />
      <meshStandardMaterial color="#87ceeb" />
    </mesh>
  );
}