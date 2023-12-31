import * as THREE from "three";

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threejs-canvas').appendChild(renderer.domElement);

  const esferas = criarEsferas();
  esferas.forEach(esfera => scene.add(esfera));

  const controls = new THREE.OrbitControls(camera, renderer.domElement); // Add OrbitControls for camera

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(esferas);

    if (intersects.length > 0) {
      const esferaClicada = intersects[0].object;
      abrirFormulario(esferaClicada.name);
    }
  });

  animate();
}

function criarEsferas() {
  const geometria = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

  const esferaEmocional = new THREE.Mesh(geometria, material);
  esferaEmocional.position.set(-1.5, 0, 0);
  esferaEmocional.name = 'formularioEmocional';

  const esferaSaude = new THREE.Mesh(geometria, material);
  esferaSaude.position.set(1.5, 0, 0);
  esferaSaude.name = 'formularioSaude';

  const esferaDesenvolvimento = new THREE.Mesh(geometria, material);
  esferaDesenvolvimento.position.set(0, 1.5, 0);
  esferaDesenvolvimento.name = 'formularioDesenvolvimento';

  return [esferaEmocional, esferaSaude, esferaDesenvolvimento];
}

function abrirFormulario(nomeFormulario) {
  const formulario = document.getElementById(nomeFormulario);
  if (formulario) {
    formulario.style.display = 'block';
  }
}

function calcularMedia(formularioId) {
  const formulario = document.getElementById(formularioId);
  let total = 0, count = 0;
  formulario.querySelectorAll('input[type=range]').forEach(input => {
    total += parseInt(input.value, 10);
    count++;
  });
  const media = total / count;
  alert('Média para ' + formularioId + ': ' + media.toFixed(2));
}

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update OrbitControls in the animation loop
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', main); // Call main() when the DOM is ready
 
