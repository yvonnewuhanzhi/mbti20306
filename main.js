import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, planet3, planet4 } from './addMeshes'
import { addLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import Model from './Model'

document.addEventListener('DOMContentLoaded', function () {

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )

    // Pass in camera and renderer dom element
    const container = document.querySelector('.container')
    const clock = new THREE.Clock()
    const scene = new THREE.Scene()
    const meshes = {}
    const light1 = addLight(5, { x: -40, y: -14, z: 30 });
    const light2 = addLight(5, { x: 30, y: 20, z: -20 });
    const objectDistance = 50
    const sectionMeshes = []
    const mixers = []
    const models = []

    const listener = new THREE.AudioListener()
    camera.add(listener)
    const sound1 = new THREE.PositionalAudio(listener)
    const sound2 = new THREE.PositionalAudio(listener)
    const sound3 = new THREE.PositionalAudio(listener)
    const sound4 = new THREE.PositionalAudio(listener)
    const sound5 = new THREE.PositionalAudio(listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load('/1.mp3', function (buffer) {
        sound1.setBuffer(buffer)
        sound1.setRefDistance(10)
        sound1.setRolloffFactor(5)
        sound1.setMaxDistance(200)
        sound1.setDistanceModel('exponential')
        // sound1.play()
    })
    audioLoader.load('/2.mp3', function (buffer) {
        sound2.setBuffer(buffer)
        sound2.setRefDistance(10)
        sound2.setRolloffFactor(5)
        sound2.setMaxDistance(200)
        sound2.setDistanceModel('exponential')
        // sound2.play()
    })
    audioLoader.load('/3.mp3', function (buffer) {
        sound3.setBuffer(buffer)
        sound3.setRefDistance(10)
        sound3.setRolloffFactor(5)
        sound3.setMaxDistance(200)
        sound3.setDistanceModel('exponential')
        // sound3.play()
    })
 
    audioLoader.load('/click.mp3', function (buffer) {
        sound4.setBuffer(buffer);
        sound4.setRefDistance(10);
        sound4.setRolloffFactor(5);
        sound4.setMaxDistance(200);
        sound4.setDistanceModel('exponential');
        
        let clickbt = document.getElementById("explore");
        clickbt.addEventListener('click', playclicksd1);
        

        function playclicksd1() {
            sound4.play();
        }
    
       
    });
    audioLoader.load('/click2.mp3', function (buffer) {
        sound5.setBuffer(buffer);
        sound5.setRefDistance(10);
        sound5.setRolloffFactor(5);
        sound5.setMaxDistance(200);
        sound5.setDistanceModel('exponential');
        
    
        let clickbt2 = document.getElementById("back");
        clickbt2.addEventListener('click', playclicksd2);
    
       
        function playclicksd2() {
            sound5.play();
        }

       
    });
    
    let scrollY = 0
    let currentSection = 0

    init()

    function init() {
        // Set up our renderer default settings, add scene/canvas to webpage
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        // meshes.default = addBoilerPlateMeshes()
        // meshes.standard = addStandardMesh()
        // meshes.standard2 = addStandardMesh()
        // meshes.standard3 = addStandardMesh()
        // meshes.standard4 = addStandardMesh()
        meshes.planet3 = planet3()
        meshes.planet4 = planet4()
        // lights.default = addLight()
        // meshes.standard.position.y = -objectDistance * 1
        // meshes.standard2.position.y = -objectDistance * 2
        // meshes.standard3.position.y = -objectDistance * 3
        // meshes.standard4.position.y = -objectDistance * 4

        // meshes.glass.add(sound1)
        // meshes.tree.add(sound2)
        // meshes.shield.add(sound3)
        // meshes.bag.add(sound4)
        // sectionMeshes.push(meshes.standard)
        // sectionMeshes.push(meshes.standard2)
        // sectionMeshes.push(meshes.standard3)
        // sectionMeshes.push(meshes.standard4)


        scene.add(light1)
        scene.add(light2)


        scene.add(meshes.planet3)
        scene.add(meshes.planet4)


        // scene.add(meshes.default)

        camera.position.set(0, 0, 5)
        // window.addEventListener('click', () => {
        //     sound1.play()
        //     sound2.play()
        //     sound3.play()
        //     sound4.play()
        // })
        sound1.play()
        initScrolling()
        resize()
        // mbtiSound()
        animate()
        metaphor()
        mbtis()
        // checkPosition()
    }

    // script.js

    var exploreBtn = document.getElementById("explore");
    var backBtn = document.getElementById("back");
    var section2 = document.getElementById("section2");
    var section3 = document.getElementById("section3");
    var section4 = document.getElementById("section4");
    var section5 = document.getElementById("section5");

    exploreBtn.addEventListener("click", function () {
        section2.scrollIntoView({ behavior: 'smooth' });
    });
    backBtn.addEventListener("click", function () {
        section1.scrollIntoView({ behavior: 'smooth' });
    });

    function mbtis() {
        const infj = new Model({
            //4 mandatories
            mixers: mixers,
            animationState: true,
            url: '/infj.glb',
            scene: scene,
            meshes: meshes,
            name: 'infj',
            position: new THREE.Vector3(3.5, -4.8, -1),
            scale: new THREE.Vector3(0.4, 0.4, 0.4),
        })
        infj.init()
        // infj.domElement.onclick = function() {
        //     section3.scrollIntoView({ behavior: 'smooth' });
        // };
        const esfp = new Model({
            //4 mandatories
            mixers: mixers,
            animationState: true,
            url: '/esfp.glb',
            scene: scene,
            meshes: meshes,
            name: 'esfp',
            position: new THREE.Vector3(3.8, -4.8, -9),
            scale: new THREE.Vector3(0.4, 0.4, 0.4),
        })
        esfp.init()
        const isfj = new Model({
            //4 mandatories
            mixers: mixers,
            animationState: true,
            url: '/isfj.glb',
            scene: scene,
            meshes: meshes,
            name: 'isfj',
            position: new THREE.Vector3(2.8, -2.4, 0),
            scale: new THREE.Vector3(0.21, 0.21, 0.21),
        })
        isfj.init()
        const intp = new Model({
            //4 mandatories
            mixers: mixers,
            animationState: true,
            url: '/intp.glb',
            scene: scene,
            meshes: meshes,
            name: 'intp',
            position: new THREE.Vector3(-15.3, -9.5, 0),
            scale: new THREE.Vector3(0.8, 0.8, 0.8),
        })
        intp.init()


    }



    function metaphor() {
        const tree = new Model({
            sectionMeshes: sectionMeshes,
            url: '/tree2.glb',
            scene: scene,
            meshes: meshes,
            name: 'tree',
            position: new THREE.Vector3(10, -103, 0),
            scale: new THREE.Vector3(1.9, 1.9, 1.9),
        })
        tree.init()
        // scene.add(meshes.tree);
        const plant = new Model({
            sectionMeshes: sectionMeshes,
            url: '/plant.glb',
            scene: scene,
            meshes: meshes,
            name: 'plant',
            position: new THREE.Vector3(0, -103, 0),
            scale: new THREE.Vector3(3.5, 3.5, 3.5),
        })
        plant.init()

        const bag = new Model({
            sectionMeshes: sectionMeshes,
            url: '/backpack.glb',
            scene: scene,
            meshes: meshes,
            name: 'bag',
            position: new THREE.Vector3(37, -210, 2),
            scale: new THREE.Vector3(3.5, 3.5, 3.5),
        })
        bag.init()
        // scene.add(meshes.bag);

        const cubetoy = new Model({
            sectionMeshes: sectionMeshes,
            url: '/cubetoy.glb',
            scene: scene,
            meshes: meshes,
            name: 'cubetoy',
            position: new THREE.Vector3(6, -214, -18),
            scale: new THREE.Vector3(0.2, 0.2, 0.2),
        })
        cubetoy.init()

        const sword = new Model({
            sectionMeshes: sectionMeshes,
            url: '/sword.glb',
            scene: scene,
            meshes: meshes,
            name: 'sword',
            position: new THREE.Vector3(0, -150, 0),
            scale: new THREE.Vector3(3.8, 3.8, 3.8),
        })
        sword.init()
        const shield = new Model({
            sectionMeshes: sectionMeshes,
            url: '/shield.glb',
            scene: scene,
            meshes: meshes,
            name: 'shield',
            position: new THREE.Vector3(10, -150, 0),
            scale: new THREE.Vector3(0.004, 0.004, 0.004),
        })
        shield.init()

        // scene.add(meshes.shield);
        const glass = new Model({
            sectionMeshes: sectionMeshes,
            url: '/glass.glb',
            scene: scene,
            meshes: meshes,
            name: 'glass',
            position: new THREE.Vector3(10, -51, 0),
            scale: new THREE.Vector3(0.0036, 0.0036, 0.0036),
        })
        glass.init()
        // scene.add(meshes.glass);
        const book = new Model({
            sectionMeshes: sectionMeshes,
            url: '/book.glb',
            scene: scene,
            meshes: meshes,
            name: 'book',
            position: new THREE.Vector3(40, -100, -10),
            scale: new THREE.Vector3(3, 3, 3),
        })
        book.init()


    }

    // function mbtiSound(){
    //     meshes.glass.add(sound1)
    //     meshes.tree.add(sound2)
    //     meshes.shield.add(sound3)
    //     meshes.bag.add(sound4)
    //     window.addEventListener('click', () => {
    //         sound1.play()
    //         sound2.play()
    //         sound3.play()
    //         sound4.play()
    //     })
    // }

    function initScrolling() {
        container.addEventListener('scroll', () => {
            scrollY = container.scrollTop
            const section = Math.round(scrollY / window.innerHeight)

            if (section != currentSection) {
                currentSection = section
                if (currentSection == 1) {
                    gsap.to(meshes.glass.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 4,
                    })
                    gsap.to(meshes.book.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 5.5,
                        y: -50,
                        z: -10,

                    })
                } else {
                    gsap.to(meshes.glass.position, {
                        duration: 1.5,
                        ease: 'power3.inOut',
                        x: 10,
                    })
                    gsap.to(meshes.book.position, {
                        duration: 1.5,
                        ease: 'power3.inOut',
                        x: 40,
                        y: -100,
                        z: -10,

                    })
                }
                if (currentSection == 2) {
                    gsap.to(meshes.tree.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 4,
                    })
                    gsap.to(meshes.plant.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 0,
                        y: -103,
                        z: 0
                    })
                    gsap.to(meshes.planet3.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 0,
                    })
                } else {
                    gsap.to(meshes.tree.position, {
                        duration: 1.5,
                        ease: 'power3.inOut',
                        x: 10,
                    })
                    gsap.to(meshes.plant.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: -20,
                        y: -133,
                        z: 0
                    })
                    gsap.to(meshes.planet3.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 30,
                    })
                }
                if (currentSection == 3) {
                    gsap.to(meshes.shield.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 4,
                    })
                    gsap.to(meshes.sword.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 0,
                        y: -150
                    })

                } else {
                    gsap.to(meshes.shield.position, {
                        duration: 1.5,
                        ease: 'power3.inOut',
                        x: 10,

                    })
                    gsap.to(meshes.sword.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: -20,
                        y: -200
                    })
                }
                if (currentSection == 4) {
                    gsap.to(meshes.bag.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        x: 37,
                    })
                    gsap.to(meshes.cubetoy.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        y: -214,
                    })
                } else {
                    gsap.to(meshes.bag.position, {
                        duration: 1.5,
                        ease: 'power3.inOut',
                        x: 170,
                    })
                    gsap.to(meshes.cubetoy.position, {
                        duration: 1,
                        ease: 'power3.inOut',
                        y: -600,
                    })
                }

            }
        })
    }

    function resize() {
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })
    }


    function animate() {
        camera.position.y = (-scrollY / window.innerHeight) * objectDistance
        // camera.position.x =(scrollY / window.innerHeight) * objectDistance*0.5

        requestAnimationFrame(animate)
        const delta = clock.getDelta()
        const elapsedTime = clock.getElapsedTime()
        // controls.update()

        // meshes.standard.rotation.x -= 0.01
        // meshes.standard.rotation.z -= 0.01
        const tick = clock.getElapsedTime();
        const speed3 = 0.1;

        //mixers数组中的mbti模型
        if (meshes.infj != undefined) {
            meshes.infj.children[0].children[0].rotation.y += 0.01
            meshes.infj.children[0].children[1].rotation.y += 0.01
        }
        if (meshes.esfp != undefined) {
            meshes.esfp.children[0].children[0].rotation.y += 0.01
            meshes.esfp.children[0].children[1].rotation.y += 0.01
        }
        if (meshes.isfj != undefined) {
            meshes.isfj.children[0].children[0].rotation.y += 0.01
            meshes.isfj.children[0].children[1].rotation.y += 0.01
        }
        if (meshes.intp != undefined) {
            meshes.intp.children[0].children[0].rotation.y += 0.01
            meshes.intp.children[0].children[1].rotation.y += 0.01
        }

        if (meshes.tree != undefined) {
            meshes.tree.rotation.y -= 0.003

        }
        if (meshes.plant != undefined) {
            meshes.plant.rotation.y += 0.003
            meshes.plant.rotation.x = 150
            meshes.plant.rotation.z = -50

        }
        if (meshes.bag != undefined) {
            meshes.bag.children[0].rotation.y += 0.01
            meshes.bag.children[1].rotation.y += 0.01
            meshes.bag.children[2].rotation.y += 0.01
            meshes.bag.children[3].rotation.y += 0.01
            meshes.bag.children[4].rotation.y -= 0.01
            meshes.bag.children[5].rotation.y -= 0.01

        }

        if (meshes.cubetoy != undefined) {

            meshes.cubetoy.rotation.y += 0.0003

        }
        if (meshes.glass != undefined) {
            meshes.glass.rotation.y += 0.003

        }
        if (meshes.book != undefined) {
            meshes.book.rotation.y = Math.cos(tick * speed3) - 3.5
            meshes.book.rotation.x = 45


        }
        if (meshes.shield != undefined) {
            meshes.shield.rotation.x += 0.003

        }
        if (meshes.sword != undefined) {
            meshes.sword.rotation.y = 100
            meshes.sword.rotation.x = 39
            meshes.sword.rotation.z = 145 + Math.cos(tick) * 0.3
        }
        for (const mixer of mixers) {
            mixer.update(delta);
        }



        meshes.planet3.position.x = Math.sin(tick * speed3) + 5
        meshes.planet3.position.y = -objectDistance * 3 + Math.cos(tick * speed3) + 50
        meshes.planet3.position.z = -10
        meshes.planet3.rotation.z = 45

        meshes.planet4.position.x = Math.cos(tick * speed3) - 3.5 + 10
        meshes.planet4.position.y = -objectDistance * 4 + Math.sin(tick * speed3) + 50
        meshes.planet4.position.z = -10



        for (const mesh of sectionMeshes) {
            mesh.rotation.x += delta * 0.1
            mesh.rotation.y += delta * 0.12
        }

        const listenerPosition = new THREE.Vector3()
        camera.getWorldPosition(listenerPosition)

        // Assuming sound1 is your PositionalAudio object
        // updateVolumeBasedOnDistance(sound1, listenerPosition, 20, 0.5)
        // updateVolumeBasedOnDistance(sound2, listenerPosition, 20, 0.5)
        // updateVolumeBasedOnDistance(sound3, listenerPosition, 20, 0.5)

        renderer.render(scene, camera)
    }

})