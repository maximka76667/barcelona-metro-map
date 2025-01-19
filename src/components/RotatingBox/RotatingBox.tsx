import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useTramStore } from "../store";

interface RotatingBoxProps {
  color: string;
}

const RotatingBox = ({ color }: RotatingBoxProps) => {
  const meshRef = useRef<Mesh>(null);
  const { setTargetCoords, setCurrentStation } = useTramStore();

  const handleRotatingBoxClick = () => {
    setTargetCoords({ lon: 2.154007, lat: 41.390205 });
    setCurrentStation(null);
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <object3D scale={20}>
      <mesh position={[0, 5, 0]} ref={meshRef} onClick={handleRotatingBoxClick}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </object3D>
  );
};

export default RotatingBox;
