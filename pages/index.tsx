import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as THREE from 'three'
import React, { useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import * as PANOLENS from 'panolens'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';



const Home: NextPage = () => {
  useEffect(() => {
    let camera:any, scene:any, scene1:any, scene2:any, scene3:any, renderer:any, activeScene:string;

    ///////////////
    // functions //
    ///////////////

    function nextScene(){
      switch (scene.name) {
        case "scene1":
            scene = scene2
            break;
        case "scene2":
            scene = scene3;
            break;
        case "scene3":
            scene = scene1;
            break;
      }

      render();
    }

    function prevScene(){
      switch (scene.name) {
        case "scene1":
            scene = scene3
            break;
        case "scene2":
            scene = scene1;
            break;
        case "scene3":
            scene = scene2;
            break;
      }

      render();
    }

    // init app
    function init() {
      const container = document.getElementById( 'container' ) as HTMLCanvasElement;
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
      camera.position.z = 0.01;

      // scene 1
      scene1 = new THREE.Scene();
      scene1.name = 'scene1';
      const texture1 = new THREE.TextureLoader().load( '/scene1.jpeg', render );
      texture1.mapping = THREE.EquirectangularReflectionMapping;
      scene1.background = texture1;

      // infospot = new PANOLENS.Infospot();
      // infospot.position.set( 1000, 100, -2000 );
      // infospot.addHoverText( '千葉県' );


      // const doorDiv = document.createElement('div');
      // doorDiv.className = 'label';
      // doorDiv.textContent = 'hotspot';
      // doorDiv.style.marginTop = "-1em";

      // const doorLabel = new CSS2DObject(doorDiv);
      // doorLabel.position.set( 1000, 1000, 100 );
      // door.add(doorLabel);
      // doorLabel.layers.set( 0 );

      // scene 2
      scene2 = new THREE.Scene();
      scene2.name = 'scene2';
      const texture2 = new THREE.TextureLoader().load( '/scene2.jpeg', render );
      texture2.mapping = THREE.EquirectangularReflectionMapping;
      scene2.background = texture2;

      // scene 3
      scene3 = new THREE.Scene();
      scene3.name = 'scene3';
      const texture3 = new THREE.TextureLoader().load( '/scene3.jpeg', render );
      texture3.mapping = THREE.EquirectangularReflectionMapping;
      scene3.background = texture3;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      window.addEventListener( 'resize', onWindowResize, false );
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.addEventListener( 'change', render );

      // set default scene
      scene = scene1;
      console.log(scene);
    }

    // resize scene
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    // render scene
    function render() {
      renderer.render(scene, camera);
    }

    ////////////
    // events //
    ////////////

    init();

    // next or prev scene
    document.onkeydown = function(e){
      switch (e.key) {
        case "ArrowLeft":
            prevScene();
            break;
        case "ArrowRight":
            nextScene();
            break;
      }
    }

    // re render scene
    window.onresize = function(){
      onWindowResize();
      render();
    }

  });

  return (
    <div className={styles.container}>
      <Head>
        <title>360 tour</title>
        <meta name="description" content="Three.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id="container"></div>
      </main>
    </div>
  )
}

export default Home
