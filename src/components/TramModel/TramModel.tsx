import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const TramModel = () => {
  const { scene } = useLoader(GLTFLoader, "/models/tram.glb");
  return <primitive object={scene} />;
};

export default TramModel;
