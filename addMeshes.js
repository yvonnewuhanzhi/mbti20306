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
	boxMesh.position.set(-30, 0, 8)
	return boxMesh
}
export const addStandardMesh = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(-30, 0, 8)
	return boxMesh
}
export const planet3 = () => {
    const planet3Geometry = new ConeGeometry( 12, 16, 17 );  
    const planet3Material = new MeshBasicMaterial({ color: 0xfbe391});
    const planet3Mesh = new Mesh(planet3Geometry, planet3Material);
    return planet3Mesh;
};
export const planet4 = () => {
    const planet4Geometry = new ConeGeometry( 15, 22.5, 25 );  
    const planet4Material = new MeshBasicMaterial({ color: 0x92acc0});
    const planet4Mesh = new Mesh(planet4Geometry, planet4Material);
    return planet4Mesh;
};