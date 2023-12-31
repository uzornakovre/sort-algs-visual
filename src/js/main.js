import "../assets/styles/index.scss";
import Setup from "./components/setup";
import Sort from "./components/sort";

const randomizeArrayBtn = document.querySelector("#randomize_array_btn");
const sortBtn = document.querySelector("#sort_btn");
const stopBtn = document.querySelector("#stop_btn");
const barsContainer = document.querySelector(".bars");
const delayInput = document.querySelector("#speed");
const arrayLengthInput = document.querySelector("#length");
const algorithmSelect = document.querySelector("#algorithm");

const sort = new Sort(barsContainer, delayInput, stopBtn);

const SORT_ALGORITHMS = {
  bubble: sort.bubbleSort,
  quick: sort.quickSort,
  selection: sort.selectionSort,
  gnome: sort.gnomeSort,
  shell: sort.shellSort,
};

const setup = new Setup(
  barsContainer,
  arrayLengthInput,
  algorithmSelect,
  randomizeArrayBtn,
  sortBtn,
  stopBtn,
  SORT_ALGORITHMS
);

window.addEventListener("load", setup.init);
