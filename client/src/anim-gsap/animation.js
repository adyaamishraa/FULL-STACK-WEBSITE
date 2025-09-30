import gsap from "gsap";

export const Animation = (btnRef, infoRef, navRef) => {

    const tl = gsap.timeline();
   
    tl.fromTo(
        navRef.current,
        {y: -100, opacity: 0}, // From
        {y: 0, opacity:1 , duration: 0.5, ease: "power3.out"} //To
    );

    tl.fromTo(  // This is universal animation function
        infoRef.current,
        {opacity: 0}, // From
        {opacity: 1, duration: 1, delay: 0.3, ease: "power3.out"} // To
    );

    tl.fromTo(  // This is universal animation function
        btnRef.current,
        {opacity: 0}, // From
        {opacity: 1, duration: 1, delay: 0.1, ease: "power3.out"} // To
    );

    btnRef.current.addEventListener("mouseenter", () => {
        tl.to(btnRef.current, { scale: 1.1, duration: 0.3 })
    });

    btnRef.current.addEventListener("mouseleave", () => {
        tl.to(btnRef.current, { scale: 1, duration: 0.3 })
    });

    // cancelRef.current.addEventListener("mouseenter", () => {
    //     tl.to(cancelRef.current, {scale: 1.1, duration: 0.3})
    // })


}