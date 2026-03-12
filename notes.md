**Önemli Notlar**
---
Kısa bir CSS hatırlatması ya da güzel bir yöntemini ezbere yapmak için buraya ekledim:
```CSS
/*Tailwind'de ortalayıp max-width ile kısmak için mükemmel*/
lg:px-0 px-5 container mx-auto
```

Şimdi GSAP'ta ilk yaptığımız NavBar'ın blurlu cam gibi aşağı inmesini implement ediyoruz ilk.
Bunun için yapılan adımlar:
- gsap timeline başlatıyoruz
- timeline'ın scrollTriger based olduğunu yazıyoruz.
- timeline'ın özelliklerini yazıyoruz (Ne zaman başlar, kimin için bu timeline gibi...).
- timeline içinde olacakları yazıyoruz.

Örnek kod:

```JavaScript
    useGSAP(()=>{
        const navTween = gsap.timeline({ 
            scrollTrigger: { 
                trigger: 'nav',
                start: 'bottom top' 
            }
        }); 

        navTween.fromTo({})
    },[]);
```

**scrollTriger** içindekiler:
- start: Controls where it start and ends. When the bottom of the nav bar reaches the top of the viewport, that's when we actually apply
- trigger: Which class is affected.
- scrollTriger, Creating a timeline based on Scroll Trigger 

**splitText** kullanımı:

```JavaScript
const heroSplit = new SplitText('.title',{type: 'chars, words'});

const paragraphSplit = new SplitText('.subtitle',{type: 'lines'});

heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
```

Burada title için konuşacak olursak bu SplitText sonrası bize işlem yapabilmemiz için `heroSplit.chars` ve `heroSplit.words` arrayleri dönülüyor. Bunlarla `forEach` işlemi ile `text-gradient` ekledik.

Ama ayrıca bunu belli bir süre ile ekrana yazdırdığımız bir timeline'ımız var:

```JavaScript
gsap.from(heroSplit.chars, {
    yPercent: 100,
    duration: 1.8,
    ease: 'expo.out',
    stagger: 0.05
});

gsap.from(paragraphSplit.lines ,{
    opacity:0,
    yPercent:100,
    duration: 1.8,
    ease: 'expo.out',
    stagger: 0.06,
    delay: 1
})
```
**from** içindekiler:
- stagger: Belli bir süre aralık ile devam edecek. her 0.06 sonrası bir kelime yPercent ilerliyor.
- ease: Easing is the primary way to change the timing of your tweens. Simply changing the ease can adjust the entire feel and personality of your animation.

---

```JavaScript
// top 50: when the top of the video reaches 50 percent down the screen
// center 60: when the center of the video reaches 60 percent down the screen
// 120 top: When the top of the video goes 120 percent pass the of the screen,
// meaning far off the screen, we end the animation. ss

const startValue = isMobile ? 'top 50%' : 'center 60%';
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
```

**Video scrub**

Şimdi video scrub dediğimiz şey aşağı doğru kaydırırken framelerin yavaş yavaş scroll ile ilerlemesi. Bu olayı gerçekleştirirken ffmpeg ile güzel bir çıktı çıkarmalıyız. Key frameler ile ilgili bu durum.