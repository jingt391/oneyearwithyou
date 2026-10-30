/* =========================================================
   TAO & JING
   THREE.JS EXPERIENCE
========================================================= */


/* =========================================================
   BASIC SETUP
========================================================= */

const container =
    document.getElementById(
        "canvas-container"
    );


const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth /
        window.innerHeight,
        0.1,
        200
    );


camera.position.z = 18;


const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        1.5
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


container.appendChild(
    renderer.domElement
);


/* =========================================================
   GLOBAL
========================================================= */

const clock =
    new THREE.Clock();


const mouse = {

    x: 0,
    y: 0,

    smoothX: 0,
    smoothY: 0

};


let scrollProgress = 0;

let smoothScroll = 0;


/* =========================================================
   HEART
========================================================= */

const PARTICLE_COUNT = 26000;


function heartPoint() {

    const t =
        Math.random() *
        Math.PI *
        2;


    let x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    let y =
        13 *
            Math.cos(t)
        - 5 *
            Math.cos(2 * t)
        - 2 *
            Math.cos(3 * t)
        - Math.cos(4 * t);


    const fill =
        Math.sqrt(
            Math.random()
        );


    x *= fill;
    y *= fill;


    y -= 0.25;


    const lobeStrength =
        Math.max(
            0,
            1 -
            Math.abs(x) / 7
        );


    if (y > 0) {

        y +=
            lobeStrength *
            0.55 *
            Math.random();

    }


    const zThickness =
        Math.sqrt(
            Math.random()
        ) *
        2 -
        1;


    let z =
        zThickness *
        5;


    x *= 0.18;
    y *= 0.18;
    z *= 0.18;


    const noise = 0.025;


    x +=
        (
            Math.random() -
            0.5
        ) *
        noise;


    y +=
        (
            Math.random() -
            0.5
        ) *
        noise;


    z +=
        (
            Math.random() -
            0.5
        ) *
        noise;


    return {
        x,
        y,
        z
    };

}


/* =========================================================
   HEART PARTICLES
========================================================= */

const positions =
    new Float32Array(
        PARTICLE_COUNT * 3
    );


const startPositions =
    new Float32Array(
        PARTICLE_COUNT * 3
    );


const targetPositions =
    new Float32Array(
        PARTICLE_COUNT * 3
    );


const particleColors =
    new Float32Array(
        PARTICLE_COUNT * 3
    );


const particleSizes =
    new Float32Array(
        PARTICLE_COUNT
    );


const heartColor1 =
    new THREE.Color(
        "#ff2f92"
    );


const heartColor2 =
    new THREE.Color(
        "#ff6db5"
    );


const heartColor3 =
    new THREE.Color(
        "#ffc4e0"
    );


const heartColor4 =
    new THREE.Color(
        "#9c0050"
    );


function putColor(
    index,
    color
) {

    particleColors[
        index * 3
    ] = color.r;

    particleColors[
        index * 3 + 1
    ] = color.g;

    particleColors[
        index * 3 + 2
    ] = color.b;

}


for (
    let i = 0;
    i < PARTICLE_COUNT;
    i++
) {

    const i3 =
        i * 3;


    const radius =
        5 +
        Math.random() *
        13;


    const theta =
        Math.random() *
        Math.PI *
        2;


    const phi =
        Math.acos(
            2 *
            Math.random() -
            1
        );


    startPositions[i3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);


    startPositions[
        i3 + 1
    ] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);


    startPositions[
        i3 + 2
    ] =
        radius *
        Math.cos(phi);


    positions[i3] =
        startPositions[i3];


    positions[
        i3 + 1
    ] =
        startPositions[
            i3 + 1
        ];


    positions[
        i3 + 2
    ] =
        startPositions[
            i3 + 2
        ];


    const point =
        heartPoint();


    targetPositions[i3] =
        point.x;


    targetPositions[
        i3 + 1
    ] =
        point.y;


    targetPositions[
        i3 + 2
    ] =
        point.z;


    const random =
        Math.random();


    if (random < 0.48) {

        putColor(
            i,
            heartColor1
        );

    }

    else if (random < 0.76) {

        putColor(
            i,
            heartColor2
        );

    }

    else if (random < 0.93) {

        putColor(
            i,
            heartColor3
        );

    }

    else {

        putColor(
            i,
            heartColor4
        );

    }


    particleSizes[i] =
        0.035 +
        Math.random() *
        0.055;

}


const heartGeometry =
    new THREE.BufferGeometry();


heartGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


heartGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
        particleColors,
        3
    )
);


heartGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(
        particleSizes,
        1
    )
);


const heartMaterial =
    new THREE.PointsMaterial({

        size: 0.055,

        vertexColors: true,

        transparent: true,

        opacity: 0.92,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const heart =
    new THREE.Points(
        heartGeometry,
        heartMaterial
    );


scene.add(
    heart
);


/* =========================================================
   STARFIELD
========================================================= */

const STAR_COUNT = 1800;


const starPositions =
    new Float32Array(
        STAR_COUNT * 3
    );


const starColors =
    new Float32Array(
        STAR_COUNT * 3
    );


const starColorPink =
    new THREE.Color(
        "#ff75b9"
    );


const starColorLight =
    new THREE.Color(
        "#ffc5df"
    );


for (
    let i = 0;
    i < STAR_COUNT;
    i++
) {

    const i3 =
        i * 3;


    const radius =
        15 +
        Math.random() *
        35;


    const theta =
        Math.random() *
        Math.PI *
        2;


    const phi =
        Math.acos(
            2 *
            Math.random() -
            1
        );


    starPositions[i3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);


    starPositions[
        i3 + 1
    ] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);


    starPositions[
        i3 + 2
    ] =
        radius *
        Math.cos(phi);


    const color =
        Math.random() < 0.7
            ? starColorPink
            : starColorLight;


    starColors[i3] =
        color.r;


    starColors[
        i3 + 1
    ] =
        color.g;


    starColors[
        i3 + 2
    ] =
        color.b;

}


const starGeometry =
    new THREE.BufferGeometry();


starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        starPositions,
        3
    )
);


starGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
        starColors,
        3
    )
);


const starMaterial =
    new THREE.PointsMaterial({

        size: 0.035,

        vertexColors: true,

        transparent: true,

        opacity: 0.28,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );


scene.add(
    stars
);


/* =========================================================
   MOUSE
========================================================= */

window.addEventListener(
    "mousemove",
    function (event) {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) *
            2 -
            1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) *
            2 +
            1;

    }
);


/* =========================================================
   SCROLL
========================================================= */

function updateScroll() {

    const maxScroll =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    if (maxScroll <= 0) {

        scrollProgress = 0;

        return;

    }


    scrollProgress =
        THREE.MathUtils.clamp(
            window.scrollY /
            maxScroll,
            0,
            1
        );

}


window.addEventListener(
    "scroll",
    updateScroll,
    {
        passive: true
    }
);


updateScroll();


/* =========================================================
   TIMER
========================================================= */

const daysElement =
    document.getElementById(
        "days"
    );


const hoursElement =
    document.getElementById(
        "hours"
    );


const minutesElement =
    document.getElementById(
        "minutes"
    );


const secondsElement =
    document.getElementById(
        "seconds"
    );


const startDate =
    new Date(
        "2025-11-07T18:30:00"
    );


function updateTimer() {

    const now =
        new Date();


    let difference =
        now.getTime() -
        startDate.getTime();


    if (difference < 0) {

        difference = 0;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds /
            86400
        );


    const hours =
        Math.floor(
            (
                totalSeconds %
                86400
            ) /
            3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds %
                3600
            ) /
            60
        );


    const seconds =
        totalSeconds %
        60;


    daysElement.textContent =
        days;


    hoursElement.textContent =
        String(hours)
            .padStart(2, "0");


    minutesElement.textContent =
        String(minutes)
            .padStart(2, "0");


    secondsElement.textContent =
        String(seconds)
            .padStart(2, "0");

}


updateTimer();


setInterval(
    updateTimer,
    1000
);


/* =========================================================
   FINAL DIARY ICON
========================================================= */

const options =
    document.getElementById(
        "options"
    );


const optionElements =
    document.querySelectorAll(
        ".option"
    );


function createIconCanvas(
    id
) {

    const canvas =
        document.getElementById(
            id
        );


    if (!canvas) {
        return null;
    }


    canvas.width = 500;
    canvas.height = 500;


    return canvas;

}


function drawParticleIcon(
    canvas,
    points
) {

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    function render() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "#ffffff";


        for (
            let i = 0;
            i < points.length;
            i++
        ) {

            const point =
                points[i];


            const alpha =
                0.72 +
                Math.sin(
                    performance.now() *
                    0.002 +
                    i
                ) *
                0.22;


            ctx.globalAlpha =
                Math.max(
                    0.2,
                    alpha
                );


            ctx.beginPath();


            ctx.arc(
                point.x,
                point.y,
                1.5,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        ctx.globalAlpha = 1;


        requestAnimationFrame(
            render
        );

    }


    render();

}


const diaryCanvas =
    createIconCanvas(
        "diary-icon"
    );


if (diaryCanvas) {

    const diaryPoints = [];


    const left = 155;
    const right = 345;

    const top = 110;
    const bottom = 390;


    function addDiaryPoint(
        x,
        y,
        spread = 2
    ) {

        diaryPoints.push({

            x:
                x +
                (
                    Math.random() -
                    0.5
                ) *
                spread,

            y:
                y +
                (
                    Math.random() -
                    0.5
                ) *
                spread

        });

    }


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        const t =
            Math.random();


        addDiaryPoint(
            left +
            25 +
            140 * t,

            top
        );


        addDiaryPoint(
            left +
            25 +
            140 * t,

            bottom
        );

    }


    for (
        let i = 0;
        i < 240;
        i++
    ) {

        const t =
            Math.random();


        addDiaryPoint(
            left,

            top +
            20 +
            240 * t
        );


        addDiaryPoint(
            right,

            top +
            20 +
            240 * t
        );

    }


    for (
        let y = 185;
        y <= 325;
        y += 35
    ) {

        for (
            let i = 0;
            i < 75;
            i++
        ) {

            const t =
                Math.random();


            addDiaryPoint(
                215 +
                90 * t,

                y
            );

        }

    }


    for (
        let i = 0;
        i < 220;
        i++
    ) {

        const t =
            Math.random();


        addDiaryPoint(
            182,

            130 +
            230 * t,

            2.5
        );

    }


    drawParticleIcon(
        diaryCanvas,
        diaryPoints
    );

}


/* =========================================================
   OPTION HOVER
========================================================= */

optionElements.forEach(
    function (option) {

        option.addEventListener(
            "mouseenter",
            function () {

                option.style.transform =
                    "translateY(-6px) scale(1.015)";

            }
        );


        option.addEventListener(
            "mouseleave",
            function () {

                option.style.transform =
                    "translateY(0) scale(1)";

            }
        );

    }
);


/* =========================================================
   HELPERS
========================================================= */

function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


function smoothstep(
    edge0,
    edge1,
    x
) {

    const t =
        clamp(
            (
                x -
                edge0
            ) /
            (
                edge1 -
                edge0
            ),
            0,
            1
        );


    return (
        t *
        t *
        (
            3 -
            2 * t
        )
    );

}


/* =========================================================
   MAIN ANIMATION
========================================================= */

const timerElement =
    document.getElementById(
        "timer"
    );


const dateElement =
    document.getElementById(
        "dateLabel"
    );


const scrollIndicator =
    document.getElementById(
        "scrollIndicator"
    );


const positionAttribute =
    heartGeometry.attributes
        .position;


function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    mouse.smoothX +=
        (
            mouse.x -
            mouse.smoothX
        ) *
        0.045;


    mouse.smoothY +=
        (
            mouse.y -
            mouse.smoothY
        ) *
        0.045;


    smoothScroll +=
        (
            scrollProgress -
            smoothScroll
        ) *
        0.045;


    const formationProgress =
        smoothstep(
            0,
            3.8,
            elapsed
        );


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const i3 =
            i * 3;


        positionAttribute.array[i3] =
            THREE.MathUtils.lerp(
                startPositions[i3],
                targetPositions[i3],
                formationProgress
            );


        positionAttribute.array[
            i3 + 1
        ] =
            THREE.MathUtils.lerp(
                startPositions[
                    i3 + 1
                ],
                targetPositions[
                    i3 + 1
                ],
                formationProgress
            );


        positionAttribute.array[
            i3 + 2
        ] =
            THREE.MathUtils.lerp(
                startPositions[
                    i3 + 2
                ],
                targetPositions[
                    i3 + 2
                ],
                formationProgress
            );

    }


    positionAttribute.needsUpdate =
        true;


    const breathing =
        1 +
        Math.sin(
            elapsed * 1.4
        ) *
        0.035;


    const scrollScale =
        1 +
        smoothScroll *
        5.4;


    heart.scale.set(
        breathing * scrollScale,
        breathing * scrollScale,
        breathing * scrollScale
    );


    heart.position.y =
        Math.sin(
            elapsed * 0.55
        ) *
        0.08;


    heart.position.x =
        mouse.smoothX *
        0.12;


    heart.position.z =
        mouse.smoothY *
        0.08;


    camera.position.z =
        18 -
        smoothScroll *
        13;


    camera.position.x +=
        (
            mouse.smoothX *
            0.22 -
            camera.position.x
        ) *
        0.025;


    camera.position.y +=
        (
            mouse.smoothY *
            0.14 -
            camera.position.y
        ) *
        0.025;


    camera.lookAt(
        0,
        0,
        0
    );


    let timerOpacity = 0;


    if (
        smoothScroll >
        0.035
    ) {

        timerOpacity =
            smoothstep(
                0.035,
                0.075,
                smoothScroll
            );

    }


    if (
        smoothScroll >
        0.27
    ) {

        timerOpacity *=
            1 -
            smoothstep(
                0.27,
                0.43,
                smoothScroll
            );

    }


    timerElement.style.opacity =
        timerOpacity;


    const dateAppear =
        smoothstep(
            0.08,
            0.18,
            smoothScroll
        );


    const dateFade =
        smoothstep(
            0.31,
            0.45,
            smoothScroll
        );


    dateElement.style.opacity =
        dateAppear *
        (
            1 -
            dateFade
        );


    const indicatorFade =
        smoothstep(
            0.03,
            0.12,
            smoothScroll
        );


    scrollIndicator.style.opacity =
        0.65 *
        (
            1 -
            indicatorFade
        );


    const optionProgress =
        smoothstep(
            0.32,
            0.55,
            smoothScroll
        );


    options.style.opacity =
        optionProgress;


    options.style.pointerEvents =
        optionProgress > 0.92
            ? "auto"
            : "none";


    optionElements.forEach(
        function (option) {

            const eased =
                smoothstep(
                    0,
                    1,
                    optionProgress
                );


            option.style.opacity =
                eased;


            option.style.transform =
                `
                translateY(
                    ${35 * (1 - eased)}px
                )
                scale(
                    ${0.88 + 0.12 * eased}
                )
                `;

        }
    );


    const backgroundFade =
        Math.max(
            0,
            1 -
            optionProgress *
            0.82
        );


    starMaterial.opacity =
        0.28 *
        backgroundFade;


    const heartFade =
        1 -
        smoothstep(
            0.43,
            0.62,
            smoothScroll
        );


    heartMaterial.opacity =
        0.92 *
        heartFade;


    stars.rotation.y +=
        0.00018;


    stars.rotation.x +=
        0.00004;


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                1.5
            )
        );


        resizeCableCarCanvas();

        resizeChristmasTreeCanvas();

        resizeBirthdayCakeCanvas();

        resizeEarthCanvas();

        resizeCalendarCanvas();

    }
);


/* =========================================================
   DIARY
========================================================= */

const diaryOption =
    document.getElementById(
        "diaryOption"
    );


const diaryPage =
    document.getElementById(
        "diaryPage"
    );


const diaryBack =
    document.getElementById(
        "diaryBack"
    );


const typewriterText =
    document.getElementById(
        "typewriterText"
    );


const diaryScrollHint =
    document.getElementById(
        "diaryScrollHint"
    );


const diaryContent =
    document.querySelector(
        ".diary-content"
    );


const cableCarCanvas =
    document.getElementById(
        "cableCarCanvas"
    );


const christmasTreeCanvas =
    document.getElementById(
        "christmasTreeCanvas"
    );


const birthdayCakeCanvas =
    document.getElementById(
        "birthdayCakeCanvas"
    );


const earthCanvas =
    document.getElementById(
        "earthCanvas"
    );


const calendarCanvas =
    document.getElementById(
        "calendarCanvas"
    );


/* =========================================================
   NINE STORIES
========================================================= */

const DIARY_TEXT_1 =
`这一年，我第一次学会喜欢一个人，
也第一次学会怎么和一个人相爱。

二零二五年十一月七日。
我们在一起了，
那时候的我其实什么都不知道。
不知道恋爱应该是什么样子，
不知道喜欢一个人以后会变得这么容易开心，
也会让自己变得这么脆弱。`;


const DIARY_TEXT_2 =
`我以前总觉得，恋爱应该是一件很浪漫的事情。
可真正和你在一起以后，我才发现，
恋爱好像并不只是鲜花、蛋糕、和约会。
它更多的时候，是一些很小很小的事情。`;


const DIARY_TEXT_3 =
`我到现在都记得那次去滑雪。

你明明不会滑，却还是要陪我坐缆车。
我当时还在想，你到底要怎么下来。

结果一转头，就看到你抱着雪板追着我跑。
姿势笨笨的，甚至有一点好笑。

可是我就是在那个瞬间觉得，好喜欢你。
`;


const DIARY_TEXT_4 =
`后来我随口说，今年想要一棵圣诞树，你记住了。
有一天，它就这样出现在我家门口。

我小时候相信圣诞老人会实现我的愿望，
可是现在我发现有些愿望不需要圣诞老人。

因为你会记住我随口说过的话和提到的小事，
其实这些都不是什么特别费劲和盛大的事。
可是我就是会因为这些很小很小的事情倍感幸福`;


const DIARY_TEXT_5 =
`当然，这一年也不是一直都很好。
我们有过争吵，也有过失望。
我会在深夜因为思念偷偷掉眼泪到凌晨。
会因为你的一句话难过很久，又怕是自己太敏感。
我会苦恼，为什么你总是那么吝啬于表达爱意，
为什么不多夸夸我，多表达一点对我的喜欢。
明知道你只在开玩笑，可有些话听多了我会伤心。

有时我也会想，为什么你就不能多迁就我一点呢？
可又不希望你为难，不希望你因为迁就我而不开心。
好像在这些事情上，
我总是一边希望自己能被你多偏爱一点，
一边又舍不得让你不开心。`;


const DIARY_TEXT_6 =
`我一直以为自己是一个情绪很稳定的人。
可后来我发现，喜欢一个人，
好像真的会让人产生很多从前没有过的情绪。
有时候连我自己都说不清楚，更不知道该怎么处理。

我也慢慢意识到，原来我还有很多需要学习的地方。
学着更好的表达自己，学着理解彼此的不同，
也学着怎么在爱一个人的同时，
成为一个更好的自己。`;


const DIARY_TEXT_7 =
`我们都知道，新鲜感会褪去，会产生倦意，
会慢慢看见彼此更多的缺点。

我也经常问自己：喜欢是什么？爱又是什么？

我现在好像有点明白了。
爱不是永远不失望，不吵架。

爱是当时间把所有的掩体都拿掉之后，
慢慢看见一个人的缺点、脾气、固执和不完美以后，

还是会想：好吧，我还是想和你在一起。`;


const DIARY_TEXT_8 =
`我不知道我们以后会变成什么样子。
不知道一年、三年、十年以后，
我们是不是还会像现在这样。

我以前很害怕这件事情。
因为我总觉得，如果不知道结局，
就好像没有办法安心地去爱一个人。

可现在我好像慢慢明白了。

爱一个人，本来就不是因为知道结局才决定开始。
是因为在不知道结局的时候，还是愿意认真地走这一段路。`;


const DIARY_TEXT_9 =
`去年的今天，我很开心，我们恋爱了。
今年的此时此刻，我很幸福，身边有你。

以前我总说，
爱是一件很沉重的事，
是无法轻易说出口的词。

但是今天我想对你说：`;


const DIARY_TEXTS = [

    null,

    DIARY_TEXT_1,

    DIARY_TEXT_2,

    DIARY_TEXT_3,

    DIARY_TEXT_4,

    DIARY_TEXT_5,

    DIARY_TEXT_6,

    DIARY_TEXT_7,

    DIARY_TEXT_8,

    DIARY_TEXT_9

];


const TYPE_SPEED = 65;


let diaryTypingTimer = null;

let diaryStage = 0;

let diaryOpened = false;

let diaryTransitioning = false;


/* =========================================================
   TYPEWRITER
========================================================= */
function startDiaryTyping(text) {
    clearInterval(diaryTypingTimer);

    // 确保日记文字容器存在
    if (!typewriterText || !diaryContent) {
        console.error("Diary text container not found.");
        return;
    }

    // 防止语音播放出错，影响日记文字显示
    try {
        if (typeof playStoryVoice === "function") {
            playStoryVoice(diaryStage);
        }
    } catch (error) {
        console.warn("Story voice could not play:", error);
    }

    // 如果没有收到文字，尝试从原来的九段文字中读取
    if (typeof text !== "string" || text.length === 0) {
        if (
            typeof DIARY_TEXTS !== "undefined" &&
            typeof DIARY_TEXTS[diaryStage] === "string"
        ) {
            text = DIARY_TEXTS[diaryStage];
        } else if (
            typeof DIARY_TEXT_1 !== "undefined" &&
            diaryStage === 1
        ) {
            text = DIARY_TEXT_1;
        } else {
            console.error("Diary text is missing for stage:", diaryStage);
            return;
        }
    }

    typewriterText.textContent = "";

    const previousHeart =
        diaryContent.querySelector(".final-love-heart");

    if (previousHeart) {
        previousHeart.remove();
    }

    diaryScrollHint.classList.remove("visible");

    let index = 0;

    diaryTypingTimer = setInterval(function () {
        if (index >= text.length) {
            clearInterval(diaryTypingTimer);

            // 前八段打完后显示向下箭头
            if (diaryStage >= 1 && diaryStage <= 8) {
                setTimeout(function () {
                    if (
                        diaryOpened &&
                        diaryStage >= 1 &&
                        diaryStage <= 8
                    ) {
                        diaryScrollHint.classList.add("visible");
                    }
                }, 450);
            }

            // 最后一段结束后显示粉色爱心
            if (diaryStage === 9) {
                diaryScrollHint.classList.remove("visible");

                const finalHeart = document.createElement("div");
                finalHeart.className = "final-love-heart";
                finalHeart.setAttribute("aria-label", "Pink heart");

                diaryContent.appendChild(finalHeart);
            }

            return;
        }

        typewriterText.textContent += text.charAt(index);
        index++;
    }, TYPE_SPEED);
}


/* =========================================================
   CHANGE GRAPHICS
========================================================= */

function hideAllDiaryGraphics() {

    cableCarCanvas
        .classList
        .remove(
            "visible"
        );


    christmasTreeCanvas
        .classList
        .remove(
            "visible"
        );


    birthdayCakeCanvas
        .classList
        .remove(
            "visible"
        );


    earthCanvas
        .classList
        .remove(
            "visible"
        );


    calendarCanvas
        .classList
        .remove(
            "visible"
        );

}
/* =========================================================
   HIDDEN YOUTUBE BACKGROUND MUSIC
========================================================= */

const YOUTUBE_MUSIC_ID = "78gghNKOINU";

let youtubeMusicPlayer = null;
let youtubeMusicReady = false;
let musicRequested = false;

function onYouTubeIframeAPIReady() {
    youtubeMusicPlayer = new YT.Player("youtubeMusicPlayer", {
        width: 1,
        height: 1,

        videoId: YOUTUBE_MUSIC_ID,

        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            rel: 0
        },

        events: {
            onReady: function () {
                youtubeMusicReady = true;

                // Start only if the user has already opened the diary.
                if (musicRequested) {
                    playDiaryMusic();
                }
            },

            onError: function (event) {
                console.warn(
                    "YouTube music could not be played.",
                    event.data
                );
            }
        }
    });
}

function playDiaryMusic() {
    musicRequested = true;

    if (!youtubeMusicReady || !youtubeMusicPlayer) {
        return;
    }

    try {
        youtubeMusicPlayer.unMute();
        youtubeMusicPlayer.setVolume(55);
        youtubeMusicPlayer.playVideo();
    } catch (error) {
        console.warn("Music playback failed:", error);
    }
}

function stopDiaryMusic() {
    musicRequested = false;

    if (
        youtubeMusicReady &&
        youtubeMusicPlayer
    ) {
        youtubeMusicPlayer.pauseVideo();
    }
}
/* =========================================================
   OPEN DIARY
========================================================= */

diaryOption.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        diaryOpened = true;
        playDiaryMusic();
    

        diaryTransitioning =
            false;

        diaryStage = 1;


        document.body
            .classList
            .add(
                "diary-open"
            );


        diaryPage
            .classList
            .add(
                "active"
            );


        diaryContent
            .className =
            "diary-content";


        diaryScrollHint
            .classList
            .remove(
                "visible"
            );


        hideAllDiaryGraphics();


        resetCableCar();

        resetChristmasTree();

        resetBirthdayCake();

        resetEarth();

        resetCalendar();


        setTimeout(
            function () {

                startDiaryTyping(
                    DIARY_TEXT_1
                );

            },
            650
        );

    }
);


/* =========================================================
   GENERIC STORY TRANSITION
========================================================= */


function showDiaryStory(nextStage) {
    if (!diaryOpened) return;
    if (diaryTransitioning) return;
    if (nextStage < 2 || nextStage > 9) return;
    if (nextStage !== diaryStage + 1) return;

    diaryTransitioning = true;
    diaryStage = nextStage;

    diaryScrollHint.classList.remove("visible");
    diaryContent.classList.add("fade-up");

    setTimeout(function () {
        typewriterText.textContent = "";

        // Hide previous story graphics before showing the next one.
        hideAllDiaryGraphics();

        const pageNames = {
            2: "second-page",
            3: "third-page",
            4: "fourth-page",
            5: "fifth-page",
            6: "sixth-page",
            7: "seventh-page",
            8: "eighth-page",
            9: "ninth-page"
        };

        diaryContent.className =
            "diary-content " + pageNames[nextStage];

        requestAnimationFrame(function () {
            diaryContent.classList.add("show");
        });

        // Story 3: cable car.
        if (nextStage === 3) {
            setTimeout(function () {
                cableCarCanvas.classList.add("visible");
            }, 250);
        }

        // Story 4: Christmas tree.
        if (nextStage === 4) {
            setTimeout(function () {
                christmasTreeCanvas.classList.add("visible");
            }, 250);
        }

        // Story 5: text only. Birthday cake removed.

        // Story 6: Earth.
        if (nextStage === 6) {
            setTimeout(function () {
                earthCanvas.classList.add("visible");
            }, 250);
        }

        // Story 8: calendar.
        if (nextStage === 8) {
            setTimeout(function () {
                calendarCanvas.classList.add("visible");
            }, 250);
        }

        // Start typing the next story.
        setTimeout(function () {
            startDiaryTyping(DIARY_TEXTS[nextStage]);
            diaryTransitioning = false;
        }, 550);

    }, 850);
}



/* =========================================================
   MOUSE WHEEL
========================================================= */

window.addEventListener(
    "wheel",
    function (event) {

        if (!diaryOpened) {
            return;
        }


        if (
            event.deltaY <= 0
        ) {
            return;
        }


        if (
            diaryStage >= 1 &&
            diaryStage < 9
        ) {

            showDiaryStory(
                diaryStage + 1
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   TOUCH SWIPE
========================================================= */

let diaryTouchStartY = 0;


window.addEventListener(
    "touchstart",
    function (event) {

        if (!diaryOpened) return;


        diaryTouchStartY =
            event.touches[0]
                .clientY;

    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    function (event) {

        if (!diaryOpened) return;


        const touchEndY =
            event.changedTouches[0]
                .clientY;


        const distance =
            diaryTouchStartY -
            touchEndY;


        if (
            distance < 45
        ) {
            return;
        }


        if (
            diaryStage >= 1 &&
            diaryStage < 9
        ) {

            showDiaryStory(
                diaryStage + 1
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   CABLE CAR PARTICLES
========================================================= */

const cableCarCtx =
    cableCarCanvas.getContext(
        "2d"
    );


let cableCarWidth = 0;

let cableCarHeight = 0;

let cableCarParticles = [];


function resizeCableCarCanvas() {

    const rect =
        cableCarCanvas
            .getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            1.5
        );


    cableCarWidth =
        rect.width;


    cableCarHeight =
        rect.height;


    cableCarCanvas.width =
        cableCarWidth *
        dpr;


    cableCarCanvas.height =
        cableCarHeight *
        dpr;


    cableCarCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createCableCarParticles();

}


function createCableCarParticles() {

    cableCarParticles = [];


    const cx =
        cableCarWidth *
        0.54;


    const topY =
        cableCarHeight *
        0.28;


    const carTop =
        cableCarHeight *
        0.42;


    const carBottom =
        cableCarHeight *
        0.72;


    const carLeft =
        cableCarWidth *
        0.28;


    const carRight =
        cableCarWidth *
        0.72;


    function addParticle(
        x,
        y
    ) {

        cableCarParticles.push({
            x,
            y
        });

    }


    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const t =
            Math.random();


        addParticle(

            cableCarWidth *
            0.05 +
            cableCarWidth *
            0.9 *
            t,

            topY +
            Math.sin(
                t * Math.PI
            ) *
            10 +
            (
                Math.random() -
                0.5
            ) *
            2

        );

    }


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const t =
            Math.random();


        addParticle(

            cx +
            (
                Math.random() -
                0.5
            ) *
            3,

            topY +
            (
                carTop -
                topY
            ) *
            t

        );

    }


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        const t =
            Math.random();


        addParticle(

            carLeft +
            (
                carRight -
                carLeft
            ) *
            t,

            carTop +
            (
                Math.random() -
                0.5
            ) *
            3

        );


        addParticle(

            carLeft +
            (
                carRight -
                carLeft
            ) *
            t,

            carBottom +
            (
                Math.random() -
                0.5
            ) *
            3

        );

    }


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        const t =
            Math.random();


        addParticle(

            carLeft +
            (
                Math.random() -
                0.5
            ) *
            3,

            carTop +
            (
                carBottom -
                carTop
            ) *
            t

        );


        addParticle(

            carRight +
            (
                Math.random() -
                0.5
            ) *
            3,

            carTop +
            (
                carBottom -
                carTop
            ) *
            t

        );

    }


    const windowTop =
        carTop + 32;


    const windowBottom =
        carTop + 100;


    const leftWindow =
        carLeft + 45;


    const rightWindow =
        carRight - 45;


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const t =
            Math.random();


        addParticle(

            leftWindow +
            (
                rightWindow -
                leftWindow
            ) *
            t,

            windowTop

        );


        addParticle(

            leftWindow +
            (
                rightWindow -
                leftWindow
            ) *
            t,

            windowBottom

        );

    }


    for (
        let x of [
            leftWindow +
            (
                rightWindow -
                leftWindow
            ) *
            0.33,

            leftWindow +
            (
                rightWindow -
                leftWindow
            ) *
            0.66
        ]
    ) {

        for (
            let i = 0;
            i < 70;
            i++
        ) {

            addParticle(

                x +
                (
                    Math.random() -
                    0.5
                ) *
                2,

                windowTop +
                (
                    windowBottom -
                    windowTop
                ) *
                Math.random()

            );

        }

    }

}


function renderCableCar(
    time
) {

    if (!cableCarWidth) {

        requestAnimationFrame(
            renderCableCar
        );

        return;

    }


    cableCarCtx.clearRect(
        0,
        0,
        cableCarWidth,
        cableCarHeight
    );


    const floating =
        Math.sin(
            time *
            0.0012
        ) *
        4;


    cableCarCtx.fillStyle =
        "#ffffff";


    for (
        let i = 0;
        i < cableCarParticles.length;
        i++
    ) {

        const particle =
            cableCarParticles[i];


        cableCarCtx.globalAlpha =
            0.48 +
            Math.sin(
                time *
                0.002 +
                i *
                0.37
            ) *
            0.25;


        cableCarCtx.beginPath();


        cableCarCtx.arc(

            particle.x,

            particle.y +
            floating,

            1.25,

            0,

            Math.PI * 2

        );


        cableCarCtx.fill();

    }


    cableCarCtx.globalAlpha = 1;


    requestAnimationFrame(
        renderCableCar
    );

}


resizeCableCarCanvas();


requestAnimationFrame(
    renderCableCar
);


function resetCableCar() {

    cableCarCanvas
        .classList
        .remove(
            "visible"
        );

}


/* =========================================================
   CHRISTMAS TREE
========================================================= */

const christmasTreeCtx =
    christmasTreeCanvas.getContext(
        "2d"
    );


let christmasTreeWidth = 0;

let christmasTreeHeight = 0;

let christmasTreeParticles = [];


function resizeChristmasTreeCanvas() {

    const rect =
        christmasTreeCanvas
            .getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            1.5
        );


    christmasTreeWidth =
        rect.width;


    christmasTreeHeight =
        rect.height;


    christmasTreeCanvas.width =
        christmasTreeWidth *
        dpr;


    christmasTreeCanvas.height =
        christmasTreeHeight *
        dpr;


    christmasTreeCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createChristmasTreeParticles();

}


function createChristmasTreeParticles() {

    christmasTreeParticles = [];


    const cx =
        christmasTreeWidth *
        0.5;


    const top =
        christmasTreeHeight *
        0.08;


    const bottom =
        christmasTreeHeight *
        0.83;


    const trunkTop =
        christmasTreeHeight *
        0.75;


    function addTreeParticle(
        x,
        y,
        size = 1.3
    ) {

        christmasTreeParticles.push({

            x,
            y,

            size

        });

    }


    const layers = [

        {
            y1:
                top,

            y2:
                christmasTreeHeight *
                0.39,

            width:
                christmasTreeWidth *
                0.25
        },

        {
            y1:
                christmasTreeHeight *
                0.24,

            y2:
                christmasTreeHeight *
                0.56,

            width:
                christmasTreeWidth *
                0.39
        },

        {
            y1:
                christmasTreeHeight *
                0.40,

            y2:
                christmasTreeHeight *
                0.73,

            width:
                christmasTreeWidth *
                0.52
        },

        {
            y1:
                christmasTreeHeight *
                0.57,

            y2:
                bottom,

            width:
                christmasTreeWidth *
                0.66
        }

    ];


    layers.forEach(
        function (layer) {

            for (
                let i = 0;
                i < 420;
                i++
            ) {

                const t =
                    Math.random();


                const y =
                    layer.y1 +
                    (
                        layer.y2 -
                        layer.y1
                    ) *
                    t;


                const normalized =
                    (
                        y -
                        layer.y1
                    ) /
                    (
                        layer.y2 -
                        layer.y1
                    );


                const currentWidth =
                    layer.width *
                    normalized;


                const x =
                    cx +
                    (
                        Math.random() -
                        0.5
                    ) *
                    currentWidth;


                addTreeParticle(
                    x,
                    y,
                    1.15 +
                    Math.random() *
                    0.7
                );

            }

        }
    );


    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const t =
            Math.random();


        addTreeParticle(

            cx +
            (
                Math.random() -
                0.5
            ) *
            6,

            top +
            (
                trunkTop -
                top
            ) *
            t,

            1.5

        );

    }


    for (
        let i = 0;
        i < 240;
        i++
    ) {

        const y =
            christmasTreeHeight *
            (
                0.30 +
                Math.random() *
                0.43
            );


        const width =
            (
                y /
                christmasTreeHeight
            ) *
            christmasTreeWidth *
            0.75;


        const side =
            Math.random() <
            0.5
                ? -1
                : 1;


        const startX =
            cx +
            side *
            width *
            0.15;


        const endX =
            cx +
            side *
            width *
            0.45;


        const t =
            Math.random();


        addTreeParticle(

            startX +
            (
                endX -
                startX
            ) *
            t,

            y +
            (
                Math.random() -
                0.5
            ) *
            4,

            1.2

        );

    }


    for (
        let i = 0;
        i < 160;
        i++
    ) {

        const t =
            Math.random();


        addTreeParticle(

            cx +
            (
                Math.random() -
                0.5
            ) *
            20,

            trunkTop +
            (
                bottom -
                trunkTop
            ) *
            t,

            1.5

        );

    }


    const starX =
        cx;


    const starY =
        top -
        7;


    for (
        let i = 0;
        i < 140;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            Math.random() *
            16;


        addTreeParticle(

            starX +
            Math.cos(angle) *
            radius,

            starY +
            Math.sin(angle) *
            radius,

            1.4

        );

    }


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        addTreeParticle(

            cx +
            (
                Math.random() -
                0.5
            ) *
            christmasTreeWidth *
            0.82,

            top +
            Math.random() *
            (
                bottom -
                top
            ),

            0.9

        );

    }

}


function renderChristmasTree(
    time
) {

    if (
        !christmasTreeWidth
    ) {

        requestAnimationFrame(
            renderChristmasTree
        );

        return;

    }


    christmasTreeCtx.clearRect(
        0,
        0,
        christmasTreeWidth,
        christmasTreeHeight
    );


    const floating =
        Math.sin(
            time *
            0.0009
        ) *
        3;


    christmasTreeCtx.fillStyle =
        "#ffffff";


    for (
        let i = 0;
        i <
        christmasTreeParticles.length;
        i++
    ) {

        const particle =
            christmasTreeParticles[i];


        const alpha =
            0.45 +
            Math.sin(
                time *
                0.0018 +
                i *
                0.27
            ) *
            0.27;


        christmasTreeCtx.globalAlpha =
            Math.max(
                0.16,
                alpha
            );


        christmasTreeCtx.beginPath();


        christmasTreeCtx.arc(

            particle.x,

            particle.y +
            floating,

            particle.size,

            0,

            Math.PI * 2

        );


        christmasTreeCtx.fill();

    }


    christmasTreeCtx.globalAlpha = 1;


    requestAnimationFrame(
        renderChristmasTree
    );

}


resizeChristmasTreeCanvas();


requestAnimationFrame(
    renderChristmasTree
);


function resetChristmasTree() {

    christmasTreeCanvas
        .classList
        .remove(
            "visible"
        );

}


/* =========================================================
   BIRTHDAY CAKE
========================================================= */

const birthdayCakeCtx =
    birthdayCakeCanvas.getContext(
        "2d"
    );


let birthdayCakeWidth = 0;

let birthdayCakeHeight = 0;

let birthdayCakeParticles = [];


function resizeBirthdayCakeCanvas() {

    const rect =
        birthdayCakeCanvas
            .getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            1.5
        );


    birthdayCakeWidth =
        rect.width;


    birthdayCakeHeight =
        rect.height;


    birthdayCakeCanvas.width =
        birthdayCakeWidth *
        dpr;


    birthdayCakeCanvas.height =
        birthdayCakeHeight *
        dpr;


    birthdayCakeCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createBirthdayCakeParticles();

}


function createBirthdayCakeParticles() {

    birthdayCakeParticles = [];


    const cx =
        birthdayCakeWidth *
        0.52;


    const cakeTop =
        birthdayCakeHeight *
        0.37;


    const cakeBottom =
        birthdayCakeHeight *
        0.65;


    const cakeLeft =
        birthdayCakeWidth *
        0.25;


    const cakeRight =
        birthdayCakeWidth *
        0.75;


    function add(
        x,
        y,
        size = 1.35
    ) {

        birthdayCakeParticles.push({
            x,
            y,
            size
        });

    }


    /* Cake top */

    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const t =
            Math.random();


        add(

            cakeLeft +
            (
                cakeRight -
                cakeLeft
            ) *
            t,

            cakeTop +
            (
                Math.random() -
                0.5
            ) *
            3

        );

    }


    /* Cake bottom */

    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const t =
            Math.random();


        add(

            cakeLeft +
            (
                cakeRight -
                cakeLeft
            ) *
            t,

            cakeBottom +
            (
                Math.random() -
                0.5
            ) *
            3

        );

    }


    /* Cake sides */

    for (
        let i = 0;
        i < 240;
        i++
    ) {

        const t =
            Math.random();


        add(

            cakeLeft +
            (
                Math.random() -
                0.5
            ) *
            3,

            cakeTop +
            (
                cakeBottom -
                cakeTop
            ) *
            t

        );


        add(

            cakeRight +
            (
                Math.random() -
                0.5
            ) *
            3,

            cakeTop +
            (
                cakeBottom -
                cakeTop
            ) *
            t

        );

    }


    /* Cake horizontal layers */

    for (
        let y =
            cakeTop + 55;

        y < cakeBottom - 20;

        y += 58
    ) {

        for (
            let i = 0;
            i < 170;
            i++
        ) {

            const t =
                Math.random();


            add(

                cakeLeft +
                20 +
                (
                    cakeRight -
                    cakeLeft -
                    40
                ) *
                t,

                y +
                (
                    Math.random() -
                    0.5
                ) *
                2

            );

        }

    }


    /* Frosting */

    for (
        let i = 0;
        i < 220;
        i++
    ) {

        const t =
            Math.random();


        const x =
            cakeLeft +
            (
                cakeRight -
                cakeLeft
            ) *
            t;


        const wave =
            Math.sin(
                t * Math.PI * 6
            ) *
            10;


        add(
            x,
            cakeTop + 25 + wave
        );

    }


    /* Plate */

    const plateY =
        cakeBottom + 48;


    for (
        let i = 0;
        i < 230;
        i++
    ) {

        const t =
            Math.random();


        add(

            cx -
            birthdayCakeWidth *
            0.32 +
            birthdayCakeWidth *
            0.64 *
            t,

            plateY +
            (
                Math.random() -
                0.5
            ) *
            3,

            1.1

        );

    }


    /* Candle */

    const candleX =
        cx;


    const candleTop =
        cakeTop -
        105;


    const candleBottom =
        cakeTop +
        10;


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        const t =
            Math.random();


        add(

            candleX +
            (
                Math.random() -
                0.5
            ) *
            8,

            candleTop +
            (
                candleBottom -
                candleTop
            ) *
            t,

            1.4

        );

    }


    /* Candle top */

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            Math.random() *
            10;


        add(

            candleX +
            Math.cos(angle) *
            radius,

            candleTop -
            8 +
            Math.sin(angle) *
            radius,

            1.4

        );

    }


    /* Flame */

    const flameY =
        candleTop -
        34;


    for (
        let i = 0;
        i < 130;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            Math.random() *
            16;


        const vertical =
            Math.random();


        add(

            candleX +
            Math.cos(angle) *
            radius *
            0.55,

            flameY +
            Math.sin(angle) *
            radius -
            vertical * 5,

            1.5

        );

    }

}


function renderBirthdayCake(
    time
) {

    if (!birthdayCakeWidth) {

        requestAnimationFrame(
            renderBirthdayCake
        );

        return;

    }


    birthdayCakeCtx.clearRect(
        0,
        0,
        birthdayCakeWidth,
        birthdayCakeHeight
    );


    const floating =
        Math.sin(
            time * 0.001
        ) *
        3;


    birthdayCakeCtx.fillStyle =
        "#ffffff";


    for (
        let i = 0;
        i < birthdayCakeParticles.length;
        i++
    ) {

        const particle =
            birthdayCakeParticles[i];


        birthdayCakeCtx.globalAlpha =
            0.5 +
            Math.sin(
                time *
                0.0018 +
                i *
                0.31
            ) *
            0.25;


        birthdayCakeCtx.beginPath();


        birthdayCakeCtx.arc(

            particle.x,

            particle.y +
            floating,

            particle.size,

            0,
            Math.PI * 2

        );


        birthdayCakeCtx.fill();

    }


    birthdayCakeCtx.globalAlpha = 1;


    requestAnimationFrame(
        renderBirthdayCake
    );

}


resizeBirthdayCakeCanvas();


requestAnimationFrame(
    renderBirthdayCake
);


function resetBirthdayCake() {

    birthdayCakeCanvas
        .classList
        .remove(
            "visible"
        );

}


/* =========================================================
   EARTH
========================================================= */

const earthCtx =
    earthCanvas.getContext(
        "2d"
    );


let earthWidth = 0;

let earthHeight = 0;

let earthParticles = [];


function resizeEarthCanvas() {

    const rect =
        earthCanvas
            .getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            1.5
        );


    earthWidth =
        rect.width;


    earthHeight =
        rect.height;


    earthCanvas.width =
        earthWidth *
        dpr;


    earthCanvas.height =
        earthHeight *
        dpr;


    earthCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createEarthParticles();

}


function createEarthParticles() {

    earthParticles = [];


    const cx =
        earthWidth * 0.5;


    const cy =
        earthHeight * 0.46;


    const radius =
        Math.min(
            earthWidth,
            earthHeight
        ) *
        0.31;


    function add(
        x,
        y,
        color = "white",
        size = 1.3
    ) {

        earthParticles.push({
            x,
            y,
            color,
            size
        });

    }


    /* Globe outline */

    for (
        let i = 0;
        i < 900;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const r =
            radius +
            (
                Math.random() -
                0.5
            ) *
            3;


        add(

            cx +
            Math.cos(angle) *
            r,

            cy +
            Math.sin(angle) *
            r

        );

    }


    /* Latitude lines */

    for (
        let latitude = -0.7;
        latitude <= 0.7;
        latitude += 0.35
    ) {

        const y =
            cy +
            latitude *
            radius;


        const width =
            Math.sqrt(
                Math.max(
                    0,
                    1 -
                    latitude *
                    latitude
                )
            ) *
            radius;


        for (
            let i = 0;
            i < 150;
            i++
        ) {

            const t =
                Math.random();


            add(

                cx -
                width +
                width *
                2 *
                t,

                y +
                (
                    Math.random() -
                    0.5
                ) *
                2

            );

        }

    }


    /* Longitude lines */

    for (
        let longitude = -0.65;
        longitude <= 0.65;
        longitude += 0.32
    ) {

        const width =
            Math.cos(
                longitude
            ) *
            radius;


        for (
            let i = 0;
            i < 130;
            i++
        ) {

            const t =
                Math.random();


            add(

                cx +
                Math.sin(
                    longitude
                ) *
                radius,

                cy -
                radius +
                radius *
                2 *
                t

            );

        }

    }


    /*
       Stylized continents
       made from particle clusters.
    */

    function continent(
        centerX,
        centerY,
        width,
        height,
        count
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const x =
                (
                    Math.random() -
                    0.5
                ) *
                width;


            const y =
                (
                    Math.random() -
                    0.5
                ) *
                height;


            const ellipse =
                (
                    x * x
                ) /
                (
                    width *
                    width *
                    0.25
                ) +
                (
                    y * y
                ) /
                (
                    height *
                    height *
                    0.25
                );


            if (
                ellipse < 1
            ) {

                const px =
                    centerX + x;


                const py =
                    centerY + y;


                const dx =
                    px - cx;


                const dy =
                    py - cy;


                if (
                    dx * dx +
                    dy * dy <
                    radius * radius
                ) {

                    add(
                        px,
                        py
                    );

                }

            }

        }

    }


    /* North America */

    continent(
        cx - radius * 0.35,
        cy - radius * 0.22,
        radius * 0.75,
        radius * 0.55,
        500
    );


    /* South America */

    continent(
        cx - radius * 0.10,
        cy + radius * 0.42,
        radius * 0.34,
        radius * 0.65,
        350
    );


    /* Europe / Asia */

    continent(
        cx + radius * 0.40,
        cy - radius * 0.18,
        radius * 0.85,
        radius * 0.48,
        550
    );


    /* Africa */

    continent(
        cx + radius * 0.20,
        cy + radius * 0.27,
        radius * 0.42,
        radius * 0.65,
        400
    );


    /* Australia */

    continent(
        cx + radius * 0.62,
        cy + radius * 0.55,
        radius * 0.30,
        radius * 0.20,
        160
    );


    /*
       NEW YORK
    */

    const newYorkX =
        cx -
        radius *
        0.50;


    const newYorkY =
        cy -
        radius *
        0.10;


    /*
       SHANGHAI
    */

    const shanghaiX =
        cx +
        radius *
        0.55;


    const shanghaiY =
        cy +
        radius *
        0.04;


    function addMarker(
        x,
        y
    ) {

        /*
           Pink glow particles
        */

        for (
            let i = 0;
            i < 100;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const r =
                Math.random() *
                14;


            add(

                x +
                Math.cos(angle) *
                r,

                y +
                Math.sin(angle) *
                r,

                "pink",

                1.7

            );

        }


        /*
           Vertical marker
        */

        for (
            let i = 0;
            i < 40;
            i++
        ) {

            add(
                x +
                (
                    Math.random() -
                    0.5
                ) *
                3,

                y -
                14 +
                Math.random() *
                28,

                "pink",

                1.6
            );

        }

    }


    addMarker(
        newYorkX,
        newYorkY
    );


    addMarker(
        shanghaiX,
        shanghaiY
    );

}


function renderEarth(
    time
) {

    if (!earthWidth) {

        requestAnimationFrame(
            renderEarth
        );

        return;

    }


    earthCtx.clearRect(
        0,
        0,
        earthWidth,
        earthHeight
    );


    for (
        let i = 0;
        i < earthParticles.length;
        i++
    ) {

        const particle =
            earthParticles[i];


        let alpha =
            0.46 +
            Math.sin(
                time *
                0.0017 +
                i *
                0.19
            ) *
            0.24;


        if (
            particle.color ===
            "pink"
        ) {

            earthCtx.fillStyle =
                "#ff6fae";


            alpha =
                0.8 +
                Math.sin(
                    time *
                    0.003 +
                    i
                ) *
                0.18;

        }

        else {

            earthCtx.fillStyle =
                "#ffffff";

        }


        earthCtx.globalAlpha =
            Math.max(
                0.18,
                alpha
            );


        earthCtx.beginPath();


        earthCtx.arc(

            particle.x,

            particle.y,

            particle.size,

            0,
            Math.PI * 2

        );


        earthCtx.fill();

    }


    earthCtx.globalAlpha = 1;


    requestAnimationFrame(
        renderEarth
    );

}


resizeEarthCanvas();


requestAnimationFrame(
    renderEarth
);


function resetEarth() {

    earthCanvas
        .classList
        .remove(
            "visible"
        );

}


/* =========================================================
   CALENDAR
========================================================= */

const calendarCtx =
    calendarCanvas.getContext(
        "2d"
    );


let calendarWidth = 0;

let calendarHeight = 0;

let calendarParticles = [];


function resizeCalendarCanvas() {

    const rect =
        calendarCanvas
            .getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            1.5
        );


    calendarWidth =
        rect.width;


    calendarHeight =
        rect.height;


    calendarCanvas.width =
        calendarWidth *
        dpr;


    calendarCanvas.height =
        calendarHeight *
        dpr;


    calendarCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createCalendarParticles();

}


function createCalendarParticles() {

    calendarParticles = [];


    const left =
        calendarWidth * 0.22;


    const right =
        calendarWidth * 0.78;


    const top =
        calendarHeight * 0.20;


    const bottom =
        calendarHeight * 0.78;


    function add(
        x,
        y,
        size = 1.35
    ) {

        calendarParticles.push({
            x,
            y,
            size
        });

    }


    /* Outer rectangle */

    for (
        let i = 0;
        i < 350;
        i++
    ) {

        const t =
            Math.random();


        add(
            left +
            (
                right -
                left
            ) *
            t,

            top +
            (
                Math.random() -
                0.5
            ) *
            3
        );


        add(
            left +
            (
                right -
                left
            ) *
            t,

            bottom +
            (
                Math.random() -
                0.5
            ) *
            3
        );

    }


    for (
        let i = 0;
        i < 300;
        i++
    ) {

        const t =
            Math.random();


        add(

            left +
            (
                Math.random() -
                0.5
            ) *
            3,

            top +
            (
                bottom -
                top
            ) *
            t

        );


        add(

            right +
            (
                Math.random() -
                0.5
            ) *
            3,

            top +
            (
                bottom -
                top
            ) *
            t

        );

    }


    /* Header line */

    const headerY =
        top +
        85;


    for (
        let i = 0;
        i < 260;
        i++
    ) {

        const t =
            Math.random();


        add(

            left +
            (
                right -
                left
            ) *
            t,

            headerY +
            (
                Math.random() -
                0.5
            ) *
            3

        );

    }


    /* Binding rings */

    const ringXs = [

        left + 65,

        left + 145,

        left + 225,

        left + 305

    ];


    ringXs.forEach(
        function (x) {

            for (
                let i = 0;
                i < 90;
                i++
            ) {

                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const radius =
                    12 +
                    Math.random() *
                    3;


                add(

                    x +
                    Math.cos(angle) *
                    radius,

                    top +
                    Math.sin(angle) *
                    radius

                );

            }

        }
    );


    /* Calendar grid */

    const gridTop =
        headerY +
        48;


    const gridBottom =
        bottom -
        30;


    const columns = 7;

    const rows = 5;


    for (
        let row = 0;
        row <= rows;
        row++
    ) {

        const y =
            gridTop +
            (
                gridBottom -
                gridTop
            ) *
            (
                row /
                rows
            );


        for (
            let i = 0;
            i < 120;
            i++
        ) {

            const t =
                Math.random();


            add(

                left +
                35 +
                (
                    right -
                    left -
                    70
                ) *
                t,

                y +
                (
                    Math.random() -
                    0.5
                ) *
                2

            );

        }

    }


    for (
        let column = 0;
        column <= columns;
        column++
    ) {

        const x =
            left +
            35 +
            (
                right -
                left -
                70
            ) *
            (
                column /
                columns
            );


        for (
            let i = 0;
            i < 90;
            i++
        ) {

            const t =
                Math.random();


            add(

                x +
                (
                    Math.random() -
                    0.5
                ) *
                2,

                gridTop +
                (
                    gridBottom -
                    gridTop
                ) *
                t

            );

        }

    }


    /*
       Small marked dates
    */

    const markedDates = [

        [1, 1],

        [3, 2],

        [5, 3],

        [2, 4],

        [6, 4]

    ];


    markedDates.forEach(
        function (date) {

            const column =
                date[0];


            const row =
                date[1];


            const x =
                left +
                35 +
                (
                    right -
                    left -
                    70
                ) *
                (
                    column /
                    columns
                );


            const y =
                gridTop +
                (
                    gridBottom -
                    gridTop
                ) *
                (
                    row /
                    rows
                );


            for (
                let i = 0;
                i < 55;
                i++
            ) {

                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const radius =
                    Math.random() *
                    10;


                add(

                    x +
                    Math.cos(angle) *
                    radius,

                    y +
                    Math.sin(angle) *
                    radius,

                    1.55

                );

            }

        }
    );

}


function renderCalendar(
    time
) {

    if (!calendarWidth) {

        requestAnimationFrame(
            renderCalendar
        );

        return;

    }


    calendarCtx.clearRect(
        0,
        0,
        calendarWidth,
        calendarHeight
    );


    calendarCtx.fillStyle =
        "#ffffff";


    for (
        let i = 0;
        i < calendarParticles.length;
        i++
    ) {

        const particle =
            calendarParticles[i];


        calendarCtx.globalAlpha =
            0.45 +
            Math.sin(
                time *
                0.0017 +
                i *
                0.23
            ) *
            0.25;


        calendarCtx.beginPath();


        calendarCtx.arc(

            particle.x,

            particle.y,

            particle.size,

            0,
            Math.PI * 2

        );


        calendarCtx.fill();

    }


    calendarCtx.globalAlpha = 1;


    requestAnimationFrame(
        renderCalendar
    );

}


resizeCalendarCanvas();


requestAnimationFrame(
    renderCalendar
);


function resetCalendar() {

    calendarCanvas
        .classList
        .remove(
            "visible"
        );

}


/* =========================================================
   BACK
========================================================= */

diaryBack.addEventListener(
    "click",
    function () {

        clearInterval(
            diaryTypingTimer
        );


        diaryOpened = false;

        diaryTransitioning =
            false;

        diaryStage = 0;


        diaryScrollHint
            .classList
            .remove(
                "visible"
            );


        hideAllDiaryGraphics();


        resetCableCar();

        resetChristmasTree();

        resetBirthdayCake();

        resetEarth();

        resetCalendar();


        typewriterText.textContent =
            "";


        diaryContent.className =
            "diary-content";


        diaryPage
            .classList
            .remove(
                "active"
            );


        document.body
            .classList
            .remove(
                "diary-open"
            );

            stopDiaryMusic();

    }
    
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            diaryOpened
        ) {

            diaryBack.click();

        }

    }
);

/* =========================================================
   ANNIVERSARY CAKE PAGE
   Click the final pink heart to open the cake experience.
========================================================= */

(function initAnniversaryCakePage() {
    if (document.getElementById("anniversaryCakePage")) return;

    /* ---------- Styles ---------- */

    const style = document.createElement("style");

    style.textContent = `
        #anniversaryCakePage {
            position: fixed;
            inset: 0;
            z-index: 99999;
            overflow: hidden;
            background: #030303;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 1s ease, visibility 1s ease;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        #anniversaryCakePage.is-open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        #anniversaryCakePage.candle-out {
            background: #000;
        }

        #anniversaryCakeCanvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            display: block;
            transition: opacity 1.5s ease;
        }

        #anniversaryCakePage.candle-out #anniversaryCakeCanvas {
            opacity: 0;
        }

        #anniversaryBack {
            position: absolute;
            z-index: 5;
            top: 28px;
            left: 32px;
            display: flex;
            align-items: center;
            gap: 9px;
            border: 0;
            padding: 10px 0;
            background: transparent;
            color: rgba(255,255,255,.8);
            font: 300 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
            cursor: pointer;
            transition: opacity .3s ease, transform .3s ease;
        }

        #anniversaryBack:hover {
            opacity: 1;
            transform: translateX(-3px);
        }

        #anniversaryBack .back-arrow {
            font-size: 25px;
            line-height: 1;
        }

        #anniversaryMessage {
            position: absolute;
            z-index: 3;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 17px;
            color: #fff;
            text-align: center;
            opacity: 0;
            transform: translateY(12px);
            pointer-events: none;
            transition:
                opacity 2.4s ease,
                transform 2.4s cubic-bezier(.16,1,.3,1);
        }

        #anniversaryCakePage.message-visible #anniversaryMessage {
            opacity: 1;
            transform: translateY(0);
        }

        #anniversaryMessage .anniversary-line-one {
            font-size: clamp(27px, 4vw, 48px);
            font-weight: 300;
            letter-spacing: .12em;
        }

        #anniversaryMessage .anniversary-line-two {
            font-size: clamp(22px, 3vw, 34px);
            font-weight: 300;
            letter-spacing: .2em;
        }

        #anniversaryCakePage.candle-out #anniversaryBack {
            opacity: .4;
        }

        @media (max-width: 600px) {
            #anniversaryBack {
                top: 20px;
                left: 20px;
            }

            #anniversaryMessage {
                gap: 14px;
                padding: 24px;
            }

            #anniversaryMessage .anniversary-line-one {
                letter-spacing: .08em;
            }

            #anniversaryMessage .anniversary-line-two {
                letter-spacing: .16em;
            }
        }
    `;

    document.head.appendChild(style);

    /* ---------- Create page ---------- */

    const page = document.createElement("section");
    page.id = "anniversaryCakePage";
    page.setAttribute("aria-label", "Our first anniversary");

    page.innerHTML = `
    <button id="anniversaryBack" type="button" aria-label="Back to the beginning">
        <span class="back-arrow">←</span>
        <span></span>
    </button>

    <canvas id="anniversaryCakeCanvas"></canvas>

    <div id="anniversaryMessage">
        <div class="anniversary-line-one">一周年快乐</div>
        <div class="anniversary-line-two">我爱你。</div>
    </div>
`;
    // Match the anniversary message to the original diary typewriter font.
    const fontSyncStyle = document.createElement("style");

    fontSyncStyle.textContent = `
        #anniversaryMessage .anniversary-line-one,
        #anniversaryMessage .anniversary-line-two {
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            font-style: inherit;
            letter-spacing: inherit;
            line-height: inherit;
            text-transform: none;
        }
    `;

    document.head.appendChild(fontSyncStyle);

    document.body.appendChild(page);

    const canvas = document.getElementById("anniversaryCakeCanvas");
    const ctx = canvas.getContext("2d");
    const backButton = document.getElementById("anniversaryBack");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationFrame = 0;
    let extinguished = false;
    let opened = false;
    let startTime = performance.now();

    /* ---------- Particle helpers ---------- */

    function addParticle(x, y, size = 1.3, phase = Math.random() * 6.28) {
        particles.push({
            x, y, size, phase,
            twinkle: 0.35 + Math.random() * 0.65
        });
    }

    function addLine(x1, y1, x2, y2, count, spread = 1.2) {
        for (let i = 0; i <= count; i++) {
            const t = i / count;

            addParticle(
                x1 + (x2 - x1) * t + (Math.random() - .5) * spread,
                y1 + (y2 - y1) * t + (Math.random() - .5) * spread,
                .8 + Math.random() * 1.1
            );
        }
    }

    function addEllipse(cx, cy, rx, ry, count) {
        for (let i = 0; i < count; i++) {
            const a = Math.PI * 2 * i / count;

            addParticle(
                cx + Math.cos(a) * rx,
                cy + Math.sin(a) * ry,
                .8 + Math.random() * 1.2
            );
        }
    }

    function addFilledEllipse(cx, cy, rx, ry, count) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random());

            addParticle(
                cx + Math.cos(a) * rx * r,
                cy + Math.sin(a) * ry * r,
                .7 + Math.random() * 1.1
            );
        }
    }

    /* ---------- Build cake from white star particles ---------- */

    function buildCake() {
        particles = [];

        const scale = Math.min(width / 900, height / 720, 1);
        const s = Math.max(.62, scale);

        const cx = width * .5;
        const cakeY = height * .59;

        const tier1W = 220 * s;
        const tier1H = 42 * s;
        const tier1Side = 85 * s;

        const tier2W = 155 * s;
        const tier2H = 32 * s;
        const tier2Side = 70 * s;

        // Bottom tier: top ellipse, side edges, bottom ellipse.
        addEllipse(cx, cakeY, tier1W, tier1H, 300);
        addEllipse(cx, cakeY + tier1Side, tier1W, tier1H, 300);
        addLine(cx - tier1W, cakeY, cx - tier1W, cakeY + tier1Side, 100);
        addLine(cx + tier1W, cakeY, cx + tier1W, cakeY + tier1Side, 100);

        // Sparse interior star points give the cake body volume.
        addFilledEllipse(cx, cakeY + tier1Side * .55, tier1W, tier1Side * .56, 520);

        // Upper tier.
        const upperY = cakeY - tier1H * .8;
        addEllipse(cx, upperY, tier2W, tier2H, 240);
        addEllipse(cx, upperY + tier2Side, tier2W, tier2H, 240);
        addLine(cx - tier2W, upperY, cx - tier2W, upperY + tier2Side, 80);
        addLine(cx + tier2W, upperY, cx + tier2W, upperY + tier2Side, 80);
        addFilledEllipse(cx, upperY + tier2Side * .5, tier2W, tier2Side * .5, 330);

        // Decorative dotted icing.
        addEllipse(cx, upperY + tier2Side, tier2W * .96, tier2H * .96, 180);

        for (let i = 0; i < 9; i++) {
            const x = cx - tier1W * .8 + i * tier1W * 1.6 / 8;
            addParticle(x, cakeY + tier1Side * .25, 1.5 + Math.random());
            addParticle(x, cakeY + tier1Side * .75, 1.5 + Math.random());
        }

        // Candle body: deliberately narrow and clearly above the cake.
        const candleX = cx;
        const candleTop = upperY - 78 * s;
        const candleBottom = upperY + 2 * s;
        addLine(candleX - 5 * s, candleTop, candleX - 5 * s, candleBottom, 55, .7);
        addLine(candleX + 5 * s, candleTop, candleX + 5 * s, candleBottom, 55, .7);
        addLine(candleX - 5 * s, candleTop, candleX + 5 * s, candleTop, 20, .6);
        addLine(candleX - 5 * s, candleBottom, candleX + 5 * s, candleBottom, 20, .6);

        // Tiny floating stars around the cake.
        for (let i = 0; i < 100; i++) {
            const x = cx + (Math.random() - .5) * width * .72;
            const y = cakeY - Math.random() * height * .48;

            if (Math.abs(x - cx) < tier1W * .95 &&
                y > upperY - 95 * s && y < cakeY + tier1Side) {
                continue;
            }

            addParticle(x, y, .5 + Math.random() * 1.1);
        }
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        buildCake();
    }

    /* ---------- Draw the candle flame ---------- */

    function drawFlame(time) {
        const scale = Math.max(.62, Math.min(width / 900, height / 720, 1));
        const cx = width * .5;
        const cakeY = height * .59;
        const upperY = cakeY - 42 * scale * .8;
        const candleTop = upperY - 78 * scale;

        const flicker = Math.sin(time * .012) * 3 * scale;
        const lean = Math.sin(time * .009) * 4 * scale;

        const fx = cx + lean;
        const fy = candleTop - 9 * scale + flicker;

        if (!extinguished) {
            const glow = ctx.createRadialGradient(fx, fy, 1, fx, fy, 28 * scale);
            glow.addColorStop(0, "rgba(255,255,255,.23)");
            glow.addColorStop(.4, "rgba(255,220,170,.08)");
            glow.addColorStop(1, "rgba(255,255,255,0)");

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(fx, fy, 28 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Small, wavering flame made of light.
            ctx.beginPath();
            ctx.moveTo(fx, fy - 17 * scale);
            ctx.bezierCurveTo(
                fx - 13 * scale, fy - 4 * scale,
                fx - 9 * scale, fy + 8 * scale,
                fx, fy + 9 * scale
            );
            ctx.bezierCurveTo(
                fx + 12 * scale, fy + 5 * scale,
                fx + 9 * scale, fy - 6 * scale,
                fx, fy - 17 * scale
            );

            const flameGradient = ctx.createLinearGradient(fx, fy - 17 * scale, fx, fy + 9 * scale);
            flameGradient.addColorStop(0, "#fffef7");
            flameGradient.addColorStop(.45, "#fff0ce");
            flameGradient.addColorStop(1, "#ffffff");

            ctx.fillStyle = flameGradient;
            ctx.shadowColor = "rgba(255,255,255,.8)";
            ctx.shadowBlur = 18 * scale;
            ctx.fill();
            ctx.shadowBlur = 0;

            // The clickable target is intentionally generous.
            canvas.style.cursor = "pointer";
        } else {
            // A tiny trail of smoke after the candle is blown out.
            const smokeAlpha = Math.max(0, 1 - (time - extinguishedAt) / 1300);

            if (smokeAlpha > 0) {
                for (let i = 0; i < 6; i++) {
                    const rise = ((time - extinguishedAt) * .025 + i * 8) * scale;

                    ctx.beginPath();
                    ctx.arc(
                        cx + Math.sin(time * .004 + i) * 4 * scale,
                        candleTop - 4 * scale - rise,
                        (2 + i * .45) * scale,
                        0, Math.PI * 2
                    );
                    ctx.fillStyle = `rgba(210,210,210,${smokeAlpha * .12})`;
                    ctx.fill();
                }
            }

            canvas.style.cursor = "default";
        }
    }

    let extinguishedAt = 0;

    /* ---------- Animation ---------- */

    function render(time) {
        ctx.clearRect(0, 0, width, height);

        const fadeStart = extinguished ? extinguishedAt : Infinity;
        const fadeProgress = extinguished
            ? Math.min(1, Math.max(0, (time - fadeStart) / 1700))
            : 0;

        for (const p of particles) {
            const twinkle = .65 + Math.sin(time * .0018 + p.phase) * .25;
            const alpha = p.twinkle * twinkle * (1 - fadeProgress);

            if (alpha <= 0) continue;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        }

        drawFlame(time);

        if (extinguished && time - extinguishedAt > 1550 && !page.classList.contains("message-visible")) {
            page.classList.add("message-visible");
        }

        animationFrame = requestAnimationFrame(render);
    }

    /* ---------- Open from final diary heart ---------- */

    function openCakePage() {
        if (opened) return;

        opened = true;
        extinguished = false;
        page.classList.remove("candle-out", "message-visible");
        page.classList.add("is-open");
        startTime = performance.now();

                // Copy the actual computed typography from the diary text.
                const diaryFontSource =
                document.getElementById("typewriterText") ||
                document.getElementById("diaryContent");
    
            if (diaryFontSource) {
                const diaryFont = window.getComputedStyle(diaryFontSource);
    
                page.querySelectorAll(
                    ".anniversary-line-one, .anniversary-line-two"
                ).forEach(line => {
                    line.style.fontFamily = diaryFont.fontFamily;
                    line.style.fontSize = diaryFont.fontSize;
                    line.style.fontWeight = diaryFont.fontWeight;
                    line.style.fontStyle = diaryFont.fontStyle;
                    line.style.letterSpacing = diaryFont.letterSpacing;
                    line.style.lineHeight = diaryFont.lineHeight;
                });
            }

        resize();
    }

    document.addEventListener("click", function (event) {
        const heart = event.target.closest(".final-love-heart");
        if (!heart) return;

        event.preventDefault();
        event.stopPropagation();

        openCakePage();
    });

    /* ---------- Click the candle to blow it out ---------- */

    canvas.addEventListener("click", function (event) {
        if (!opened || extinguished) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const scale = Math.max(.62, Math.min(width / 900, height / 720, 1));
        const candleX = width * .5;
        const cakeY = height * .59;
        const candleTop = cakeY - 42 * scale * .8 - 78 * scale;

        // Click near the candle or flame.
        const nearCandle =
            Math.abs(x - candleX) < 32 * scale &&
            y > candleTop - 34 * scale &&
            y < candleTop + 22 * scale;

        if (!nearCandle) return;

        extinguished = true;
        extinguishedAt = performance.now();
        page.classList.add("candle-out");
    });

    /* ---------- Back to the original big heart ---------- */

    backButton.addEventListener("click", function () {
        opened = false;
        extinguished = false;

        page.classList.remove("is-open", "candle-out", "message-visible");

        // Return to the initial scene without deleting the diary or music.
        if (typeof scrollProgress !== "undefined") scrollProgress = 0;
        if (typeof smoothScroll !== "undefined") smoothScroll = 0;

        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("resize", function () {
        if (opened) resize();
    });

    resize();
    animationFrame = requestAnimationFrame(render);
})();