
function customize(category) {
	
	var textGeom, textGeom2, textGeom3, material;
	
	if (category == "text"){
		
		custom[0] = $('custom1').value;
		custom[1] = $('custom2').value;
		custom[2] = $('custom3').value;
		//var custom =  e.keyCode;
		

	}else if (category == 'color'){
		
		var radios = document.mycolor.color;

		for (var i =0;i<radios.length ; i++){
			if (radios[i].checked){
				textColor=radios[i].value;
				console.log(textColor);
				break;
			}
		}
	}else if (category == 'font'){
		
		var radios = document.myfont.font;

		for (var i =0;i<radios.length ; i++){
			if (radios[i].checked){
				textFont=radios[i].value;
				console.log(textFont);
				break;
			}
		}
	}else if (category == 'size'){
		textSize = $('textSize').value;
	}else if (category == 'height'){	
		textHeight = $('textHeight').value;
	}
	
	
	for (var i=0; i<3 ; i++){
		scene.remove (textMesh[i]);
	
		material = new THREE.MeshPhongMaterial({
				color: textColor
		});
		textGeom = new THREE.TextGeometry( custom[i], {
				font: textFont,
				size: textSize,
				height: textHeight
		});
		
		var j=objects.indexOf(textMesh[i]);
		
		textMesh[i] = new THREE.Mesh( textGeom, material );
		textGeom.computeBoundingBox();
		var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;	
		textMesh[i].position.set( 0, 0, -500+i*500);  
		scene.add( textMesh[i] );
		
		
		if (j!=-1)
			objects[j]=textMesh[i];
		
	}
	
}

function cubeCreator(){
	var geometry = new THREE.BoxGeometry( 300, 300, 300 );
	var material = new THREE.MeshPhongMaterial( {ambient: 0xffff00, color: 0x0033ff, specular: 0x555555, shininess: 30} );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set( 0,1500,0 ); 
	scene.add( cube );
	objects.push(cube);
	currentCreation = cube;
	currentOffset = 300/2;         //for cube to lie on the ground rightly
	onCreateRenderer(); 
	
	
}

function sphereCreator(){
	var material = new THREE.MeshPhongMaterial({ambient: 0xffff00, color: 0x0033ff, specular: 0x555555, shininess: 30});

	var radius = 150;
	var segments = 32;

	var sphereGeometry = new THREE.SphereGeometry( 200, 32, 32 );		
	var sphere = new THREE.Mesh( sphereGeometry, material );
	sphere.position.set( 0,1500,0 ); 
	scene.add( sphere );
	objects.push(sphere);
	currentCreation = sphere;
	currentOffset = 200;
	onCreateRenderer();
	
}

function onCreateRenderer(){
	if (currentCreation.position.y <= currentOffset)
		return;
	window.requestAnimationFrame(onCreateRenderer);
	currentCreation.position.y-=10;
}
	
function animate() {
	window.requestAnimationFrame( animate );
	controls.update(); //for cameras
	renderer.render( scene, camera );
}
