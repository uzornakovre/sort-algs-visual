import "../assets/styles/index.scss";
import {
  MAX_DELAY,
  MIN_ARRAY_RANGE,
  SORT_ALGORITHMS,
} from "../utils/constants";

const randomizeArrayBtn = document.querySelector("#randomize_array_btn");
const sortBtn = document.querySelector("#sort_btn");
const barsContainer = document.querySelector(".bars");
const delayInput = document.querySelector("#speed");
const arrayLengthInput = document.querySelector("#length");
const algorithmSelect = document.querySelector("#algorithm");

let arrayLength = 100;
let delay = 30;
let unsortedArray = null;
let sortAlgorithm = SORT_ALGORITHMS.bubbleSort;

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const createRandomArray = () => {
  for (let i = 0; i < arrayLength; i++) {
    unsortedArray[i] = getRandomNumber(MIN_ARRAY_RANGE, arrayLength);
  }
};

const renderBars = (array) => {
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${(array[i] / array.length) * 100}%`;

    barsContainer.appendChild(bar);
  }
};

const clearBarContainer = () => {
  barsContainer.innerHTML = "";
};

const init = () => {
  unsortedArray = new Array(arrayLength);

  clearBarContainer();
  createRandomArray();
  renderBars(unsortedArray);
  enableControls();
};

const sleep = (ms) => {
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

        bars[j].style.height = `${(array[j] / array.length) * 100}%`;
        bars[j].style.backgroundColor = "#ec0b0b";

        bars[j + 1].style.height = `${(array[j + 1] / array.length) * 100}%`;
        bars[j + 1].style.backgroundColor = "#ec0b0b";

        await sleep(delay);
      }
    }
    await sleep(delay);
  }

  return array;
};

const sort = (array, algorithm) => {
  disableControls();
  algorithm(array).then(() => {
    enableControls();
  });
};

const handleChangeSpeed = (evt) => {
  delay = MAX_DELAY - evt.target.value;
};

const handleChangeArrayLength = (evt) => {
  arrayLength = evt.target.value;
};

const handleChangeSortAlgorithm = (evt) => {
  sortAlgorithm = evt.target.value;
  console.log(sortAlgorithm);
};

const disableControls = () => {
  sortBtn.setAttribute("disabled", true);
  arrayLengthInput.setAttribute("disabled", true);
};

const enableControls = () => {
  sortBtn.removeAttribute("disabled");
  arrayLengthInput.removeAttribute("disabled");
};

window.addEventListener("load", init);
delayInput.addEventListener("input", handleChangeSpeed);
arrayLengthInput.addEventListener("input", handleChangeArrayLength);
algorithmSelect.addEventListener("change", handleChangeSortAlgorithm);
randomizeArrayBtn.addEventListener("click", init);
sortBtn.addEventListener("click", () => sort(unsortedArray, bubbleSort));
