export default class Controller {
  constructor(
    barsContainer,
    arrayLengthInput,
    algorithmSelect,
    randomizeArrayBtn,
    sortBtn,
    stopBtn,
    SORT_ALGORITHMS
  ) {
    this.barsContainer = barsContainer;
    this.arrayLengthInput = arrayLengthInput;
    this.algorithmSelect = algorithmSelect;
    this.randomizeArrayBtn = randomizeArrayBtn;
    this.sortBtn = sortBtn;
    this.stopBtn = stopBtn;
    this.arrayLength = 100;
    this.SORT_ALGORITHMS = SORT_ALGORITHMS;
    this.sortAlgorithm = SORT_ALGORITHMS.gnome;
    this.unsortedArray = null;
    this.minArrayRange = 2;
  }

  setEventListeners = () => {
    this.arrayLengthInput.addEventListener(
      "input",
      this.handleChangeArrayLength.bind(this)
    );
    this.algorithmSelect.addEventListener(
      "change",
      this.handleChangeSortAlgorithm.bind(this)
    );
    this.randomizeArrayBtn.addEventListener(
      "click",
      this.renderNewArray.bind(this)
    );
    this.sortBtn.addEventListener("click", () =>
      this.handleStartSort(this.unsortedArray, this.sortAlgorithm)
    );
  };

  init = () => {
    this.setEventListeners();
    this.disableControls([this.stopBtn]);
    this.renderNewArray();
  };

  getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  createRandomArray = () => {
    for (let i = 0; i < this.arrayLength; i++) {
      this.unsortedArray[i] = this.getRandomNumber(
        this.minArrayRange,
        this.arrayLength
      );
    }
  };

  renderBars = (array) => {
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${(array[i] / array.length) * 100}%`;

      this.barsContainer.appendChild(bar);
    }
  };

  clearBarContainer = () => {
    this.barsContainer.innerHTML = "";
  };

  renderNewArray = () => {
    this.unsortedArray = new Array(this.arrayLength);

    this.clearBarContainer();
    this.createRandomArray();
    this.renderBars(this.unsortedArray);
    this.enableControls([this.sortBtn, this.arrayLengthInput]);
  };

  handleChangeArrayLength = (evt) => {
    this.arrayLength = evt.target.value;
  };

  handleChangeSortAlgorithm = (evt) => {
    this.sortAlgorithm = this.SORT_ALGORITHMS[evt.target.value];
    console.log(this.SORT_ALGORITHMS[evt.target.value]);
  };

  disableControls = (elements) => {
    elements.forEach((element) => {
      element.setAttribute("disabled", true);
    });
  };

  enableControls = (elements) => {
    elements.forEach((element) => {
      element.removeAttribute("disabled");
    });
  };

  handleStartSort = (array, algorithm) => {
    this.disableControls([
      this.sortBtn,
      this.arrayLengthInput,
      this.randomizeArrayBtn,
    ]);
    this.enableControls([this.stopBtn]);
    algorithm(array).then((res) => {
      console.log(res);
      this.disableControls([this.stopBtn]);
      this.enableControls([
        this.sortBtn,
        this.arrayLengthInput,
        this.randomizeArrayBtn,
      ]);
    });
  };
}
