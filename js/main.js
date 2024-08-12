import Slider from "./slider.js";

const mobileWidth = 375;
const desktopWidth = 1366;

window.addEventListener('load', (e) => {
    const width = window.innerWidth;
    const slideCount = width >= desktopWidth ? 3 : 1;

    const playersSlider = new Slider(
        document.getElementById('slider1'),
        {
            slideCount: slideCount,
            autoPlay: true,
            loop: true,
            autoPlayInterval: 4000,
            showIndicators: false
        }
    );
    playersSlider.init();

    const stagesSlider = new Slider(
        document.getElementById('slider2'),
        {
            slideCount: 1,
            autoPlay: false,
            loop: false,
            autoPlayInterval: 3000,
            showIndicators: true
        }
    )

    // if (width <= desktopWidth) {
    stagesSlider.init();
    // }
    // stagesSlider.destroy();
})

window.addEventListener('resize', (e) => {
    const width = window.innerWidth;
    const slideCount = width >= desktopWidth ? 3 : 1;

    const playersSlider = new Slider(
        document.getElementById('slider1'),
        {
            slideCount: slideCount,
            autoPlay: true,
            loop: true,
            autoPlayInterval: 4000,
            showIndicators: false
        }
    );
    playersSlider.init();

    const stagesSlider = new Slider(
        document.getElementById('slider2'),
        {
            slideCount: 1,
            autoPlay: false,
            loop: false,
            autoPlayInterval: 3000,
            showIndicators: true
        }
    )
    // if (width <= desktopWidth) {
    stagesSlider.init();
    // }
    // } else {
    // stagesSlider.destroy();
    // }
});