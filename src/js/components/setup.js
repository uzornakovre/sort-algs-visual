export default class Setup {
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
    this.sortAlgorithm = SORT_ALGORITHMS.quick;
    this.unsortedArray = null;
    this.minArrayRange = 2;
  }

  _setEventListeners = () => {
    this.arrayLengthInput.addEventListener(
      "input",
      this._handleChangeArrayLength.bind(this)
    );
    this.algorithmSelect.addEventListener(
      "change",
      this._handleChangeSortAlgorithm.bind(this)
    );
    this.randomizeArrayBtn.addEventListener(
      "click",
      this._renderNewArray.bind(this)
    );
    this.sortBtn.addEventListener("click", () =>
      this._handleStartSort(this.unsortedArray, this.sortAlgorithm)
    );
  };

  init = () => {
    this._setEventListeners();
    this._disableControls([this.stopBtn]);
    this._renderNewArray();
  };

  _getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  _createRandomArray = () => {
    for (let i = 0; i < this.arrayLength; i++) {
      this.unsortedArray[i] = this._getRandomNumber(
        this.minArrayRange,
        this.arrayLength
      );
    }
  };

  _renderBars = (array) => {
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${(array[i] / array.length) * 100}%`;

      this.barsContainer.appendChild(bar);
    }
  };

  _clearBarContainer = () => {
    this.barsContainer.innerHTML = "";
  };

  _renderNewArray = () => {
    this.unsortedArray = new Array(this.arrayLength);

    this._clearBarContainer();
    this._createRandomArray();
    this._renderBars(this.unsortedArray);
    this._enableControls([this.sortBtn, this.arrayLengthInput]);
  };

  _handleChangeArrayLength = (evt) => {
    this.arrayLength = evt.target.value;
  };

  _handleChangeSortAlgorithm = (evt) => {
    this.sortAlgorithm = this.SORT_ALGORITHMS[evt.target.value];
  };

  _disableControls = (elements) => {
    elements.forEach((element) => {
      element.setAttribute("disabled", true);
    });
  };

  _enableControls = (elements) => {
    elements.forEach((element) => {
      element.removeAttribute("disabled");
    });
  };

  _handleStartSort = (array, algorithm) => {
    this._disableControls([
      this.sortBtn,
      this.arrayLengthInput,
      this.randomizeArrayBtn,
    ]);
    this._enableControls([this.stopBtn]);
    algorithm(array).then((res) => {
      this._disableControls([this.stopBtn]);
      this._enableControls([
        this.sortBtn,
        this.arrayLengthInput,
        this.randomizeArrayBtn,
      ]);
    });
  };
}
