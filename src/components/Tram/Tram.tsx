import * as THREE from "three";
import { memo, useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { useTramStore } from "../../store";
import {
  canvasToLonLatCoords,
  getShortestRotationAngle,
  lonLatToCanvasCoords,
} from "../../lib/utils";
import { CanvasCoordinatesType } from "../../lib/definitions";
import TramModel from "../TramModel/TramModel";

const Tram = () => {
  const {
    currentCoords,
    targetCoords,
    setCurrentCoords,
    currentRotationAngle,
    setCurrentRotationAngle,
  } = useTramStore();
  const ref = useRef<THREE.Group>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  function updateCurrentCoords() {
    if (ref.current) {
      const currentPosition: CanvasCoordinatesType = {
        x: ref.current?.position.x,
        z: ref.current?.position.z,
      };

      // Convert current position (canvas coordinates)
      // to longitud latitude type coordinates
      // and store into global state
      setCurrentCoords(canvasToLonLatCoords(currentPosition));
    }
  }

  const calculateLookAtAngle = () => {
    if (!ref.current) {
      return 0;
    }

    const currentPosition = lonLatToCanvasCoords(currentCoords);
    const targetPosition = lonLatToCanvasCoords(targetCoords);

    const angleRad = Math.atan2(
      targetPosition.x - currentPosition.x,
      targetPosition.z - currentPosition.z
    );

    // Normalize the angle to be between -π and π
    const normalizedAngleRad = ((angleRad + Math.PI) % (2 * Math.PI)) - Math.PI;
    console.log("Normalized Angle Radians: ", normalizedAngleRad);

    const normalizedAngleDeg = THREE.MathUtils.radToDeg(normalizedAngleRad);
    console.log("Normalized Angle Degrees: ", normalizedAngleDeg);

    console.log("Current Angle: ", currentRotationAngle);

    setCurrentRotationAngle(normalizedAngleDeg);
    return getShortestRotationAngle(currentRotationAngle, normalizedAngleDeg);
  };

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // Convert destination point coordinates to canvas coordinates
    const { x, z } = lonLatToCanvasCoords(targetCoords);
    console.log("New coords defined: ", x, z);

    if (!ref.current) {
      return;
    }

    const rotationAngle = THREE.MathUtils.degToRad(calculateLookAtAngle());

    tl.current
      .to(ref.current.rotation, {
        duration: 0,
        y: rotationAngle,
      })
      .to(
        ref.current.position,
        {
          duration: 2,
          x,
          z,
          // Update current tram coordinates during animation
          onUpdate: () => {
            updateCurrentCoords();
          },
          // Update current tram coordinates on animation complete
          onComplete: () => {
            console.log("Arrived at coords", x, z);
            updateCurrentCoords();
          },
        },
        0
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCoords]);

  return (
    <object3D
      onClick={(e) => {
        e.stopPropagation();
      }}
      scale={10}
    >
      <group ref={ref}>
        <TramModel />
      </group>
    </object3D>
  );
};

export default memo(Tram);
