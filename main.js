// import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0.4,1.1,0.8);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls( camera, renderer.domElement );

// // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// // const cube = new THREE.Mesh( geometry, material );
// // scene.add( cube );




const n = 1;

const edge_width=0.01
const edge_material = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, transparent:true, opacity:0.75, side:THREE.DoubleSide} );
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) {
    const cyl_x = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    const cyl_y = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    const cyl_z = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    cyl_x.rotateZ(Math.PI/2)
    cyl_z.rotateX(Math.PI/2)
    cyl_x.position.set(0,i-n/2,j-n/2)
    cyl_y.position.set(i-n/2,0,j-n/2)
    cyl_z.position.set(i-n/2,j-n/2,0)
    scene.add(cyl_x,cyl_y,cyl_z)
}

const vert_rad=0.025
// const vert_material = new THREE.MeshStandardMaterial( { color: 0xff3333, side:THREE.DoubleSide} );
// for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0; k<=n; k++) {
//   const vert = new THREE.Mesh(new THREE.SphereGeometry(vert_rad),vert_material)
//   vert.position.set(i-n/2,j-n/2,k-n/2)
//   scene.add(vert)
// }

function add_vert(x,y,z,color) {
    const vert = new THREE.Mesh(new THREE.SphereGeometry(vert_rad),new THREE.MeshStandardMaterial( { color: color} ))
    vert.position.set(x-n/2,y-n/2,z-n/2)
    scene.add(vert)
}

for(let i=0; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0.5; k<=n; k++) {
    add_vert(i,j,k,0x33ff33)
    add_vert(i,j-0.25,k,0x7777ff)
    add_vert(i,j+0.25,k,0x7777ff)
    add_vert(i,j,k-0.25,0x2222ff)
}

for(let i=0.5; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0.5; k<=n; k++) {
    add_vert(i,j,k,0x33ff33)
    add_vert(i-0.25,j,k,0x2222ff)
    add_vert(i,j,k-0.25,0x7777ff)
    add_vert(i,j,k+0.25,0x7777ff)
}

for(let i=0.5; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0; k<=n; k++) {
    add_vert(i,j,k,0x33ff33)
    add_vert(i-0.25,j,k,0x7777ff)
    add_vert(i+0.25,j,k,0x7777ff)
    add_vert(i,j-0.25,k,0x2222ff)
}

for(let i=0.5; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0; k<=n; k++)
    add_vert(i,j,k,0xffff33)
for(let i=0; i<=n; i++) for(let j=0.5; j<=n; j++) for(let k=0; k<=n; k++)
    add_vert(i,j,k,0xffff33)
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) for(let k=0.5; k<=n; k++)
    add_vert(i,j,k,0xffff33)




const con_width=0.01
const con_material = new THREE.MeshStandardMaterial( { color: 0xff7777, transparent:true, opacity:0.75, side:THREE.DoubleSide} );
for(let i=0; i<=n; i++) for(let j=0; j<=n; j++) {
    const cyl_x = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    const cyl_y = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    const cyl_z = new THREE.Mesh(new THREE.CylinderGeometry(edge_width,edge_width,n,100,100),edge_material)
    cyl_x.rotateZ(Math.PI/2)
    cyl_z.rotateX(Math.PI/2)
    cyl_x.position.set(0,i-n/2,j-n/2)
    cyl_y.position.set(i-n/2,0,j-n/2)
    cyl_z.position.set(i-n/2,j-n/2,0)
    scene.add(cyl_x,cyl_y,cyl_z)
}

const points=[]
points.push(new THREE.Vector3(-0.5, -0.5, 0))
points.push(new THREE.Vector3(-0.5, +0.5, 0))
points.push(new THREE.Vector3(+0.5, +0.5, 0))
points.push(new THREE.Vector3(+0.5, -0.5, 0))
points.push(new THREE.Vector3(-0.5, -0.5, 0))

let conn
conn = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.MeshBasicMaterial( {color: 0xff3333} ) );
scene.add(conn)
conn = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.MeshBasicMaterial( {color: 0xff3333} ) );
conn.rotateX(Math.PI/2)
scene.add(conn)
conn = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.MeshBasicMaterial( {color: 0xff3333} ) );
conn.rotateY(Math.PI/2)
scene.add(conn)

// let conn = new THREE.Line()

// const face_material = new THREE.MeshStandardMaterial( { color: 0xffffff, transparent:true, opacity:0.1, side:THREE.DoubleSide, depthWrite:false} );
// for(let i = 0; i<=n; i++) {

//   const face_x = new THREE.Mesh(new THREE.PlaneGeometry(n,n,100,100),face_material)
//   const face_y = new THREE.Mesh(new THREE.PlaneGeometry(n,n,100,100),face_material)
//   const face_z = new THREE.Mesh(new THREE.PlaneGeometry(n,n,100,100),face_material)
  
//   face_x.rotateY(Math.PI/2)
//   face_y.rotateX(Math.PI/2)
//   face_x.position.set(i-n/2,0,0)
//   face_y.position.set(0,i-n/2,0)
//   face_z.position.set(0,0,i-n/2)
//   scene.add(face_x,face_y,face_z)
// }



// const light = new THREE.DirectionalLight()
// light.position.set(-1, 2, 4)
// scene.add(light)







// // renderer.render( scene, camera );




// // renderer.render( scene, camera );

// function animate() {

//   // cube.rotation.x += 0.0;
//   // cube.rotation.y += 0.0;

//   renderer.render( scene, camera );

// }




// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff,100);
pointLight.position.set(5, 6, 7);
const ambientLight = new THREE.AmbientLight(0xffffff,0.25);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// gridHelper.position.set(0,-10,0)
// scene.add(lightHelper)//, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);





function animate() {
    // requestAnimationFrame(anumate);
    // cube.rotation.x += 0.0;
    // cube.rotation.y += 0.0;

    controls.update()
    renderer.render( scene, camera );

}
