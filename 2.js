import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x222222)


const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(0.9*window.innerWidth, 0.9* window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(-2, 0.9, 0.25)
window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
})



const controls = new OrbitControls(camera, renderer.domElement)

const pointLight = new THREE.PointLight(0xffffff,100)
pointLight.position.set(-7, 5, 6)
const ambientLight = new THREE.AmbientLight(0xffffff,0.25)
scene.add(pointLight, ambientLight)

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// gridHelper.position.set(0,-10,0)
// scene.add(lightHelper, gridHelper)

scene.position.set(-0.5,-0.5,-0.5)




const params = {
    n: 1,

    visible_cent:true,  color_cent:0xff7777,        // Central mode
    visible_sat:true,   color_sat:0x77ff77,         // Satellite modes
    visible_virt:false, color_virt:0x7777ff,        // Virtual spins
    
    visible_cons:false, color_cons:0x77ffff,        // Constraints
    visible_par:false,  color_par:0xff77ff,         // Parity
    visible_int:false,  color_int:0xffff77,         // Interaction
}

let obj_latt,
    obj_cent, obj_sat, obj_virt,
    obj_cons, obj_par, obj_int

function add_ball(obj,x,y,z,color) {
    const ball_rad = 0.025
    const ball = new THREE.Mesh(new THREE.SphereGeometry(ball_rad), new THREE.MeshStandardMaterial({color: color}))
    ball.position.set(x,y,z)
    obj.add(ball)
}

const n = params.n

obj_latt = new THREE.Object3D()

obj_cent = new THREE.Object3D()
obj_sat  = new THREE.Object3D()
obj_virt = new THREE.Object3D()

obj_cons = new THREE.Object3D()
obj_par  = new THREE.Object3D() 
obj_int  = new THREE.Object3D()

// Lattice
const edge_width = 0.01
const edge_material = new THREE.MeshStandardMaterial({color: 0xbbbbbb, transparent:true, opacity:0.5, side:THREE.DoubleSide})
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) {
    const cyl_x = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n),edge_material)
    const cyl_y = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n),edge_material)
    const cyl_z = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n),edge_material)
    cyl_x.rotateZ(Math.PI/2)
    cyl_z.rotateX(Math.PI/2)
    cyl_x.position.set(n/2,i,j)
    cyl_y.position.set(i,n/2,j)
    cyl_z.position.set(i,j,n/2)
    obj_latt.add(cyl_x,cyl_y,cyl_z)
}

// Cent and sat
for(let i=0; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0.5; k<=n; k++) {
    add_ball(obj_cent,i,j,k,params.color_cent)
    add_ball(obj_sat,i,j-0.25,k,params.color_sat)
    add_ball(obj_sat,i,j,k-0.25,params.color_sat)
    add_ball(obj_sat,i,j+0.25,k,params.color_sat)
}
for(let i=0.5; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0.5; k<=n; k++) {
    add_ball(obj_cent,i,j,k,params.color_cent)
    add_ball(obj_sat,i,j,k-0.25,params.color_sat)
    add_ball(obj_sat,i-0.25,j,k,params.color_sat)
    add_ball(obj_sat,i,j,k+0.25,params.color_sat)
}
for(let i=0.5; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0; k<=n; k++) {
    add_ball(obj_cent,i,j,k,params.color_cent)
    add_ball(obj_sat,i-0.25,j,k,params.color_sat)
    add_ball(obj_sat,i,j-0.25,k,params.color_sat)
    add_ball(obj_sat,i+0.25,j,k,params.color_sat)
}

// Virtual
for(let i=0.5; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0; k<=n; k++)
    add_ball(obj_virt,i,j,k,params.color_virt)
for(let i=0; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0; k<=n; k++)
    add_ball(obj_virt,i,j,k,params.color_virt)
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0.5; k<=n; k++)
    add_ball(obj_virt,i,j,k,params.color_virt)

const cons_material = new THREE.MeshBasicMaterial({color: params.color_cons})
for(let i=0; i<=1; i++) {
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(i,0.5,0.5)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.5,i,0.5)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.5,0.5,i)]),cons_material))

    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(i,0.5,0.25)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(i,0.25,0.5)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(i,0.75,0.5)]),cons_material))

    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.25,i,0.5)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.5,i,0.25)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.5,i,0.75)]),cons_material))
    
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.25,0.5,i)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.75,0.5,i)]),cons_material))
    obj_cons.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,0.5,0.5), new THREE.Vector3(0.5,0.25,i)]),cons_material))
}
    
const par_material = new THREE.MeshBasicMaterial({color: params.color_par})
obj_par.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,1,0.5), new THREE.Vector3(1,1,0.5)]),par_material))
obj_par.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.5,1,0), new THREE.Vector3(0.5,1,1)]),par_material))

const int_material = new THREE.MeshBasicMaterial({color: params.color_int})
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0.5; k<=n; k++)
    obj_int.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i,j-0.25,k), new THREE.Vector3(i+0.25,j,k), new THREE.Vector3(i,j+0.25,k)]),int_material))
for(let i=0; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0; k<=n; k++)
    obj_int.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i-0.25,j,k), new THREE.Vector3(i,j,k+0.25), new THREE.Vector3(i+0.25,j,k)]),int_material))
for(let i=0.5; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0; k<=n; k++)
    obj_int.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i,j,k-0.25), new THREE.Vector3(i,j+0.25,k), new THREE.Vector3(i,j,k+0.25)]),int_material))

scene.add(obj_latt, obj_cent, obj_sat, obj_virt, obj_cons, obj_par, obj_int)





const gui = new GUI()

const spinFolder = gui.addFolder('Modes/spins')
spinFolder.add(params, 'visible_cent').name('<div style="color:black;background-color:#'+params.color_cent.toString(16)+';"> Central (primal) </div>')
spinFolder.add(params, 'visible_sat').name('<div style="color:black;background-color:#'+params.color_sat.toString(16)+';"> Satellite (dual) </div>')
spinFolder.add(params, 'visible_virt').name('<div style="color:black;background-color:#'+params.color_virt.toString(16)+';"> Virtual spins </div>')
spinFolder.open()

const setFolder = gui.addFolder('Sets')
setFolder.add(params, 'visible_cons').name('<div style="color:black;background-color:#'+params.color_cons.toString(16)+';"> Constraint </div>')
setFolder.add(params, 'visible_par').name('<div style="color:black;background-color:#'+params.color_par.toString(16)+';"> Parity </div>')
setFolder.add(params, 'visible_int').name('<div style="color:black;background-color:#'+params.color_int.toString(16)+';"> Interaction </div>')
setFolder.open()

function animate() {
    obj_cent.visible = params.visible_cent
    obj_sat.visible = params.visible_sat
    obj_virt.visible = params.visible_virt
    
    obj_cons.visible = params.visible_cons
    obj_par.visible = params.visible_par
    obj_int.visible = params.visible_int

    controls.update(0.1)
    renderer.render( scene, camera )
}
