var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var camera;
var mouseCoords = [-1, -1];
var mouseInPage = false;
var axisToRotate = 0;
var rotating = false;

function toVector(coords) {
  return new THREE.Vector3(coords[0], coords[1], coords[2]);
}

function linearScale(x, a1, a2, b1, b2) {
  return ((x - a1) * (b2 - b1) / (a2 - a1)) + b1;
}

function mod(a, b) {
  var ret = a % b;
  return (ret >= 0 ? ret : ret + b);
}

function between(n, low, high) {
  return (n >= low && n <= high);
}

function init() {  
  camera = new THREE.PerspectiveCamera(70, $(window).width() / $(window).height(),
                                       0.1, 1000);
  camera.position.set(50, 50, 50);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));  

  scene.add(camera);

  var test = [{
    type: 'line',
    start: [0, 0, 0],
    end: [100, 0, 0],
    color: 0xFF0000
  }, {
    type: 'line',
    start: [0, 0, 0],
    end: [0, 100, 0],
    color: 0x00FF00
  }, {
    type: 'line',
    start: [0, 0, 0],
    end: [0, 0, 100],
    color: 0x0000FF
  }];

  for (var i = 0; i < test.length; i++) {
    switch (test[i].type) {
    case 'box':
      var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(test[i].size,
                              test[i].size,
                              test[i].size),
        new THREE.MeshBasicMaterial({
          color: test[i].color
        }));
      mesh.position.set.apply(this, test[i].position);
      scene.add(mesh);
      break;
    case 'line':
      var geometry = new THREE.Geometry();
      geometry.vertices = [toVector(test[i].start), toVector(test[i].end)];
      var line = new THREE.Line(geometry,
                                new THREE.LineBasicMaterial({
                                  color: test[i].color
                                }));
      scene.add(line);
      break;
    default:
      break;
    }
  }

  renderer.setSize($(window).width(), $(window).height());
  var canvas = renderer.domElement;
  console.log(canvas);
  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  canvas.addEventListener('mousemove', function(e) {
    mouseCoords = [e.offsetX, e.offsetY];
    mouseInPage = true;
  });
  canvas.addEventListener('mouseout', function() {
    mouseInPage = false;
  });
  canvas.addEventListener('mousedown', function(e) {
    if (e.which == 1) {
      rotating = true;
    } else if (e.which == 3) {
      axisToRotate = mod(axisToRotate + 1, 3);
      return false;
    }
  });
  canvas.addEventListener('mouseup', function(e) {
    if (e.which == 1) {
      rotating = false;
    }
  });
  $('#container').append(canvas);
}

function animate() {
  window.requestAnimationFrame(animate);
  update();
  render();
}

function update() {
  var mouseLocation = [linearScale(mouseCoords[0], 0, $(window).width(), -1, 1),
                       linearScale(mouseCoords[1], 0, $(window).height(), 1, -1)];

  var mouseAngle = mod(Math.atan2(mouseLocation[1], mouseLocation[0]), 2 * Math.PI);

  var color = [0xFF0000, 0x00FF00, 0x0000FF][axisToRotate];
  var mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
                            new THREE.MeshBasicMaterial({
                              color: color
                            }));
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
  
  if (mouseInPage && rotating) {
    var coord = ['x', 'y', 'z'][axisToRotate];
    console.log(coord);
    if (between(mouseAngle, 0, Math.PI / 2) || between(mouseAngle, Math.PI * 3 / 2, 2 * Math.PI)) {
      camera.rotation[coord] += Math.PI / 200;
    } else if (between(mouseAngle, Math.PI / 2, Math.PI * 3 / 2)) {
      camera.rotation[coord] -= Math.PI / 200;
    }
  }
}

function render() {
  renderer.render(scene, camera);
}

$(document).ready(function() {
  init();
  animate();
});
