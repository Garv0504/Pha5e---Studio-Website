document.addEventListener("DOMContentLoaded", function () {
    gsap.set(".slider path", {
        strokeDasharray: 300, 
        strokeDashoffset: 300, 
        fill: "transparent",
        scaleY: 0 
    });

    gsap.to(".slider path", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out"
    }).then(() => {
        gsap.to(".slider path", {
            fill: "white",
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out"
        });
    });
});

document.querySelectorAll('.main').forEach((main) => {
    const box = main.querySelector('.box');
    const back = main.querySelector('.back')
    const text = document.querySelector('.text')
    let mouseX = 0, mouseY = 0;
    let isMouseInside = false;

    const mainRect = main.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    let originalX = (mainRect.width - boxRect.width) / 2;
    let originalY = (mainRect.height - boxRect.height) / 2;
    let currentX = originalX, currentY = originalY;

    box.style.transform = `translate(${originalX}px, ${originalY}px)`;
    back.style.transform = `translate(${originalX}px, ${originalY}px)`;

    main.addEventListener("mouseenter", () => {
        isMouseInside = true;

        document.querySelectorAll('.main').forEach((otherMain) => {
            if (otherMain !== main) {
                otherMain.querySelector(".back").style.display = "block";
                otherMain.querySelector('.box').style.display = "none";
                otherMain.style.transition = "opacity 0.5s ease";
            }
        });

        const elems = document.querySelectorAll('.reveal-text')
        elems.forEach((elem) => {
            elem.style.fill = "none";
            elem.style.strokeWidth = "0.5";
            elem.style.stroke = "white"; 
            elem.style.opacity = '0.2';
        });
    });

    main.addEventListener("mousemove", (e) => {
        const mainRect = main.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        mouseX = e.clientX - mainRect.left - boxRect.width / 2;
        mouseY = e.clientY - mainRect.top - boxRect.height / 2;

        mouseX = Math.max(0, Math.min(mouseX, mainRect.width - boxRect.width));
        mouseY = Math.max(0, Math.min(mouseY, mainRect.height - boxRect.height));
    });

    main.addEventListener("mouseleave", () => {
        isMouseInside = false;

        document.querySelectorAll('.main').forEach((otherMain) => {
            otherMain.querySelector(".back").style.display = "none";
            otherMain.querySelector('.box').style.display = "block";
            otherMain.style.opacity = "1";
        });

        const elems = document.querySelectorAll('.reveal-text')
        elems.forEach((elem) => { 
            elem.style.fill = "white";
            elem.style.strokeWidth = "0";
            elem.style.opacity = '1';
        });
    });

    const moveBox = () => {
        if (isMouseInside) {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
        } else {
            currentX += (originalX - currentX) * 0.01;
            currentY += (originalY - currentY) * 0.01;
        }

        box.style.transform = `translate(${currentX}px, ${currentY}px)`;
        back.style.transform = `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(moveBox);
    };

    moveBox();
});

document.addEventListener("DOMContentLoaded", function () {
    const paths = document.querySelectorAll(".slider-main path");
    const app = document.querySelector(".app");
    const mask = document.querySelector(".mask");

    paths.forEach((path) => {
        const pathLength = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: 300,
            strokeDashoffset: 300,
            stroke: "rgba(255, 255, 255, 0.25)",
            strokeWidth: 0.5,
            fill: "transparent"
        });

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.out",
            onComplete: function () {
                gsap.to(path, {
                    fill: "white",
                    duration: 0.5
                });

                gsap.to(mask, {
                    display: "block",
                    y: "-100%",
                    duration: 1,
                    ease: "ease-out",
                    onComplete: function () {
                        gsap.to(path, {
                            visibility: "hidden"
                        });

                        gsap.to(app, {
                            opacity: 1,
                            duration: 0.5
                        });

                        gsap.to(mask, {
                            visibility: "hidden",
                        });
                    }
                });
            }
        });
    });
});
