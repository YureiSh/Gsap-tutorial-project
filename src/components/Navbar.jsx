import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";
import gsap from "gsap";

const Navbar = () => {
    
    useGSAP(()=>{
        const navTween = gsap.timeline({ //Creating a timeline based on Scroll Trigger 
            scrollTrigger: { 
                trigger: 'nav',
                start: 'bottom top' //Controls where it start and ends. 
                // When the bottom of the nav bar reaches the top of the viewport, that's when we actually apply
            }
        }); 

        navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)', //backdropFilter(gsap) = backdrop-filter(CSS)
            duration: 1,
            ease: 'power1.inOut'
        });
        //backgroundFilter çalışıyor mu?
    },[]);

    return(
    <>
    <nav>
        <div>
            <a href="#home" className="flex items-center gap-2">
                <img src="/images/logo.png" alt="logo" />
                <p>Taste of Afterlife</p>
            </a>

            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
    </>
    );
}
export default Navbar