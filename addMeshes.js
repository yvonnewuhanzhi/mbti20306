import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	TextureLoader,
	ConeGeometry,
} from 'three'

const loader = new TextureLoader()

export const addBoilerPlateMeshes = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(-2, 0, 0)
	return boxMesh
}

export const addStandardMesh = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(0, 0, 0)
	return boxMesh
}
export const planet3 = () => {
    const planet3Geometry = new ConeGeometry( 5, 5.5, 4 );  
    const planet3Material = new MeshBasicMaterial({ color: 0x499DAE});
    const planet3Mesh = new Mesh(planet3Geometry, planet3Material);
    return planet3Mesh;
};