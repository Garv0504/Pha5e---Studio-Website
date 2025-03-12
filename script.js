document.addEventListener("DOMContentLoaded", function () {
    gsap.set(".slider path", {
        strokeDasharray: 300, 
        strokeDashoffset: 300, 
        fill: "transparent",
        // transformOrigin: "50% 100%", // Set origin to bottom
        scaleY: 0 
    });

    // Stroke animation
    gsap.to(".slider path", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out"
    }).then(() => {
        // Fill animation (bottom to top)
        gsap.to(".slider path", {
            fill: "white",
            scaleY: 1, // Expands fill from bottom to top
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

    // Set initial position at center
    let originalX = (mainRect.width - boxRect.width) / 2;
    let originalY = (mainRect.height - boxRect.height) / 2;
    let currentX = originalX, currentY = originalY;

    // Apply initial position
    box.style.transform = `translate(${originalX}px, ${originalY}px)`;
    back.style.transform = `translate(${originalX}px, ${originalY}px)`;

    main.addEventListener("mouseenter", () => {
        isMouseInside = true;

        // Fade out other .main divs except the hovered one
        document.querySelectorAll('.main').forEach((otherMain) => {
            if (otherMain !== main) {
                // otherMain.style.opacity = "0.3";
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

        // Get mouse position relative to this .main div
        mouseX = e.clientX - mainRect.left - boxRect.width / 2;
        mouseY = e.clientY - mainRect.top - boxRect.height / 2;

        // Restrict movement within this .main
        mouseX = Math.max(0, Math.min(mouseX, mainRect.width - boxRect.width));
        mouseY = Math.max(0, Math.min(mouseY, mainRect.height - boxRect.height));
    });

    main.addEventListener("mouseleave", () => {
        isMouseInside = false;

        // Reset all .main divs to full opacity
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
    })
    });

    // Smoothly move the box inside its respective .main div
    const moveBox = () => {
        if (isMouseInside) {
            // Move smoothly toward the mouse
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
        } else {
            // Smoothly return to original (center) position
            currentX += (originalX - currentX) * 0.01;
            currentY += (originalY - currentY) * 0.01;
        }

        box.style.transform = `translate(${currentX}px, ${currentY}px)`;
        back.style.transform = `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(moveBox);
    };

    moveBox(); // Start animation loop for this specific box
});


// GSAP Animation for smooth text reveal
// Animate text appearing from below




