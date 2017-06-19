var scene, camera;
var container, stats, controls;

init();

render();

function init() {
    container = document.getElementById('container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);
    camera.lookAt(scene.position);

    var axes = new THREE.AxisHelper(1);
    scene.add(axes);

    var gridHelper = new THREE.GridHelper(10, 20);
    scene.add(gridHelper);

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, -1).normalize();
    scene.add(directionalLight);

    loadModel();

    loadFont();

    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModel() {
    var colladaLoader = new THREE.ColladaLoader();
    colladaLoader.options.convertUpAxis = true;
    colladaLoader.load('./models/hyena.dae', function (collada) {
        var object = collada.scene;
        object.position.set(0, 0, 0);
        scene.add(object);
    });
}

function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('./fonts/IndieFlower.json', function (x) {

        var textGeo = new THREE.TextGeometry("R", {
            font: x,
            size: 5,
            height: 2,
            // curveSegments: 12,
            // bevelThickness: 2,
            // bevelSize: 5,
            // bevelEnabled: true
        });
        var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        var mesh = new THREE.Mesh(textGeo, textMaterial);
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    stats.update();
}
