import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                scrub: true, //
            }
        })
            .to('.right-leaf', { y: 100 }, 0)
            .to('.left-leaf', { y: 100 }, 0)
        // top 50: when the top of the video reaches 50 percent down the screen
        // center 60: when the center of the video reaches 60 percent down the screen
        // 120 top: When the top of the video goes 120 percent pass the of the screen,
        // meaning far off the screen, we end the animation. ss

        const startValue = isMobile ? 'bottom 50%' : 'center 60%'; //aslında burası top 50%
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,//Which means it'll make the video play while scroll, (scroll pozisyonu ile animasyon progress’ini senkronize eder.) 
                pin: true //This will keep the video stuck on the screen while you scroll.
            }
        })
        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

    }, []);

    return (
        <>
            <section id="hero" className="noisy" >
                <h1 className="title">
                    Silverhand
                </h1>

                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">Sip the spirit <br /> of Summer</p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>

                    </div>

                </div>

            </section>
            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    );
}
export default Hero;