type Props = {
  position: [number, number, number]
  color: string
}

export default function Character({ position, color }: Props){

  return (

    <group position={position}>

      {/* body */}
      <mesh position={[0,1,0]}>
        <capsuleGeometry args={[0.5,1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* head */}
      <mesh position={[0,2,0]}>
        <sphereGeometry args={[0.4,32,32]} />
        <meshStandardMaterial color="#ffd4a3" />
      </mesh>


    </group>

  )

}