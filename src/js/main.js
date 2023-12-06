import "../assets/styles/index.scss";

const randomizeArrayBtn = document.querySelector("#randomize_array_btn");
const sortBtn = document.querySelector("#sort_btn");
const barsContainer = document.querySelector(".bars");
const MIN_RANGE = 1;
const MAX_RANGE = 100;
const BARS_COUNT = 100;

let unsortedArray = new Array(BARS_COUNT);

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const createRandomArray = () => {
  for (let i = 0; i < BARS_COUNT; i++) {
    unsortedArray[i] = getRandomNumber(MIN_RANGE, MAX_RANGE);
  }
};

const renderBars = (array) => {
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${array[i]}%`;

    barsContainer.appendChild(bar);
  }
};

const clearBarContainer = () => {
  barsContainer.innerHTML = "";
};

const init = () => {
  clearBarContainer();
  createRandomArray();
  renderBars(unsortedArray);
};

const delay = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

const bubbleSort = async (array) => {
  const bars = barsContainer.querySelectorAll(".bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#e2cca5";
          }
        }

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = `${array[j]}%`;
        bars[j].style.backgroundColor = "#ec0b0b";

        bars[j + 1].style.height = `${array[j + 1]}%`;
        bars[j + 1].style.backgroundColor = "#ec0b0b";

        await delay(30);
      }
    }
    await delay(30);
  }

  return array;
};

const sort = (array, algorithm) => {
  sortBtn.setAttribute("disabled", true);
  algorithm(array).then(() => {
    console.log(1);
    sortBtn.removeAttribute("disabled");
  });
};

window.addEventListener("load", init);
randomizeArrayBtn.addEventListener("click", init);
sortBtn.addEventListener("click", () => sort(unsortedArray, bubbleSort));
