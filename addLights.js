import { DirectionalLight } from 'three'

export const addLight = (intensity, position) => {
    let light = new DirectionalLight(0xfce8ec, intensity)
    light.position.set(position.x, position.y, position.z)
    return light
}
