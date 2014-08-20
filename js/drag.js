			function onDocumentMouseDown( event ) {

				event.preventDefault();
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );

				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );

				var intersects = raycaster.intersectObjects( objects );

				if ( intersects.length > 0 ) {
					controls.enabled = false;		
					SELECTED = intersects[ 0 ].object;
					
	//				var intersects = raycaster.intersectObject( plane );
	//				offset.copy( intersects[ 0 ].point ).sub( plane.position );
					container.style.cursor = 'move';
				}
			}
			
			function onDocumentMouseMove( event ) {

				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			
				
				var vectorDrag = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vectorDrag, camera );

				var raycaster = new THREE.Raycaster( camera.position, vectorDrag.sub( camera.position ).normalize() );
				
				if ( SELECTED ) {
					
					var intersects = raycaster.intersectObject( plane );
					
			//		SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
					
					SELECTED.position.copy( intersects[ 0 ].point );
					//SELECTED.position.y += currentOffset;
					return;    //improve efficiency

				}         
				

			//	var intersects = raycaster.intersectObjects( objects );

			//	if ( intersects.length > 0 ) {

			//		if ( INTERSECTED != intersects[ 0 ].object ) {

					//	if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			//			INTERSECTED = intersects[ 0 ].object;
					//	INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

			//			plane.position.copy( INTERSECTED.position );
			//			plane.lookAt( camera.position );

			//		}

			//		container.style.cursor = 'pointer';

			//	} else {

				//	if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			//		INTERSECTED = null;

			//		container.style.cursor = 'auto';

			//	}

			}

			

			function onDocumentMouseUp( event ) {
			//	console.log(plane.position.x);
			//		console.log(plane.position.y);
			//		console.log(plane.position.z);
				event.preventDefault();

				controls.enabled = true;

				if ( SELECTED ) {
			//		plane.position.copy( INTERSECTED.position );

					SELECTED = null;

				}

				container.style.cursor = 'auto';

			}