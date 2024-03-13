import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, planet3, planet4 } from './addMeshes'
import { addLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from './Model'


document.addEventListener('DOMContentLoaded', function () {

 //------------- Pass in camera and renderer dom element---------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
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


//---------------add audiolistener for sound effect--------------------
    const listener = new THREE.AudioListener()
    camera.add(listener)
    const explorerSd = new THREE.PositionalAudio(listener)
    const backSd = new THREE.PositionalAudio(listener)
    const audioLoader = new THREE.AudioLoader()

    //--------explore button sound effect-----------
    audioLoader.load('/click.mp3', function (buffer) {
        explorerSd.setBuffer(buffer);
        explorerSd.setRefDistance(10);
        explorerSd.setRolloffFactor(5);
        explorerSd.setMaxDistance(200);
        explorerSd.setDistanceModel('exponential');

        let clickbt = document.getElementById("explore");
        clickbt.addEventListener('click', playclicksd1);
        function playclicksd1() {
            explorerSd.play();
        }
    });
  
     //--------back button sound effect-----------
    function playclicksd2() {
        var backSd = new Audio('/click2.mp3')
        backSd.play();
    }
    let clickbt2 = document.getElementById("back");
    clickbt2.addEventListener('click', playclicksd2);


    let scrollY = 0
    let currentSection = 0

    init()

    function init() {
        //-------set up our renderer default settings, add scene/canvas to webpage--------
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)
        meshes.planet3 = planet3()
        meshes.planet4 = planet4()
        scene.add(light1)
        scene.add(light2)
        scene.add(meshes.planet3)
        scene.add(meshes.planet4)
        camera.position.set(0, 0, 5)


        initScrolling()
        resize()
        animate()
        metaphor()
        mbtis()
        
    }

//----------Click on the button to return to the corresponding page------------
    var exploreBtn = document.getElementById("explore");
    var backBtn = document.getElementById("back");
    var section1 = document.getElementById("section1");
    var section2 = document.getElementById("section2");


    exploreBtn.addEventListener("click", function () {
        section2.scrollIntoView({ behavior: 'smooth' });
    });
    backBtn.addEventListener("click", function () {
        section1.scrollIntoView({ behavior: 'smooth' });
    });


//----------add 4 mbti models to section1-----------------
    function mbtis() {
        const infj = new Model({
          
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

        const esfp = new Model({
           
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


//--------------add metaphor models to 2,3,4,5 section------------------
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



//-------------add scrolling effect and gsap entry animation-----------------

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


//---------------- adjusts the size of a renderer and camera-------------------
    function resize() {
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })
    }

//-----------------add animation to the models themselves-------------------
    function animate() {
        camera.position.y = (-scrollY / window.innerHeight) * objectDistance
      

        requestAnimationFrame(animate)
        const delta = clock.getDelta()
        const elapsedTime = clock.getElapsedTime()
        const tick = clock.getElapsedTime();
        const speed3 = 0.1;

        
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
        renderer.render(scene, camera)
    }

})