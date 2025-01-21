import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { StationTypeNode } from "../../lib/definitions";
import { useRouterStore, useTramStore } from "../../store";
import { Html } from "@react-three/drei";
import clsx from "clsx";
import tinycolor from "tinycolor2";
import * as THREE from "three";
import gsap from "gsap";

interface StationConeProps {
  color: string;
  index: number;
  station: StationTypeNode;
}

const StationCone = ({ color, station }: StationConeProps) => {
  const {
    name,
    coordinates: { latitude: lat, longitude: lon },
  } = station;
  const { setTargetCoords, setCurrentStation } = useTramStore();
  const { originStation, destinationStation } = useRouterStore();

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Cone mesh ref
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const handleConeClick = () => {
    setCurrentStation(station);
    setTargetCoords({ lat, lon });
  };

  const handleConePointerEnter = () => {
    setIsHovered(true);
  };

  const handleConePointerLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!originStation || !destinationStation) {
      return;
    }
    if (
      station.id == originStation.node.id ||
      station.id == destinationStation.node.id
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [originStation, destinationStation]);

  useLayoutEffect(() => {
    if (!ref.current || !materialRef.current) {
      return;
    }

    if (isHovered || isSelected) {
      // When hovered animate to change Y axis position and color
      gsap.to(ref.current.position, { y: 1.8 });
      gsap.to(
        materialRef.current.color,
        new THREE.Color(tinycolor(color).darken(10).toString())
      );
    } else {
      // When unhover cone, return to initial Y axis position and color
      gsap.to(ref.current.position, { y: 1.5 });
      gsap.to(materialRef.current.color, new THREE.Color(`#${color}`));
    }
  }, [isHovered, ref, color, isSelected]);

  return (
    <object3D
      onClick={handleConeClick}
      onPointerEnter={handleConePointerEnter}
      onPointerLeave={handleConePointerLeave}
      scale={50}
    >
      <mesh
        ref={ref}
        rotation={[MathUtils.degToRad(180), 0, 0]}
        position={[0, 1.5, 0]}
      >
        <coneGeometry />
        <meshBasicMaterial ref={materialRef} color={`#${color}`} />
      </mesh>

      <Html
        style={{
          padding: "4px",
          borderRadius: "8px",
          backgroundColor: tinycolor("#fff").setAlpha(0.5).toString(),
        }}
        className={clsx("invisible transition_3", isHovered && "visible")}
      >
        <p style={{ margin: 0, minWidth: "100px", textAlign: "center" }}>
          {name}
        </p>
      </Html>
    </object3D>
  );
};

export default memo(StationCone);
