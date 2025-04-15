let slider = document.querySelectorAll('.slide');
slider.forEach((item, ind) => {
    item.style.left = `${ind * 100}%`;
});

let temp = 0;

next = () => {
    temp++;
    if (temp > slider.length - 1) {
        temp = 0;
    }
    sliders();
};

prev = () => {
    temp--;
    if (temp < 0) {
        temp = slider.length - 1;
    }
    sliders();
};

setInterval(() => {
    temp++;
    if (temp > slider.length - 1) {
        temp = 0;
    }
    sliders();
}, 4000);

sliders = () => {
    slider.forEach((item) => {
        item.style.transform = `translateX(-${temp * 100}%)`;
    });
};