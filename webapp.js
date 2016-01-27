var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		
		
		var width  = window.innerWidth,
			height = window.innerHeight;
			
		renderer.setSize(width, height);
		
		var webglEl = document.getElementById('sphere');	
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
		camera.position.x = 0.1;


		/* Creates a sphere and texturemaps the projection onto the sphere */ 
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(120, 40, 40),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture("./upload/"+imageFile)
			})
		);
		sphere.scale.x = -1;
		scene.add(sphere);
		

		var cube = new THREE.Mesh( 
				   new THREE.CubeGeometry( 200, 200, 200 ), 
				   new THREE.MeshNormalMaterial() );
		cube.position.y = 150;
		scene.addObject( cube );

		var controls = new THREE.OrbitControls(camera);
		controls.noPan = true;
		controls.noZoom = true; 
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.5;
		webglEl.appendChild(renderer.domElement);
		render();

		function render() {
			controls.update();
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}
		
		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );

		}
		
		
		window.addEventListener( 'resize', onWindowResize, false );