import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/Cocktails.jsx";
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import {useEffect, useRef} from "react";
import About from "./components/About.jsx";
import Art from "./components/Art.jsx";
import Menu from "./components/Menu.jsx";
import Contact from "./components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    const lenisRef = useRef();

    useEffect(() => {
        const lenisInstance = lenisRef.current?.lenis;

        if (lenisInstance) {
            lenisInstance.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenisInstance.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
        return () => {
            const lenisInstance = lenisRef.current?.lenis;
            if (lenisInstance) {
                lenisInstance.off('scroll', ScrollTrigger.update);
            }
        };
    }, []);

    return(
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
            }}
        >
        <main>
        <Navbar/>
        <Hero/>
        <Cocktails/>
        <About/>
        <Art/>
        <Menu/>
        <Contact/>
    </main>
        </ReactLenis>
    )
}

export default App