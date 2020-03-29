class State {
  constructor(formClass) {
    this.formClass = formClass;
    this.inputs = Array.from(
      document.querySelector(this.formClass).querySelectorAll("input")
    );
    this.clearButton = Array.from(
      document.querySelectorAll(`${this.formClass} [data-button='clear']`)
    )[0];
    this.submitButton = Array.from(
      document.querySelectorAll(`${this.formClass} [data-button='submit']`)
    )[0];
    const initialState = this.deserializeState();
    this.initializeState(initialState);
  }

  serializeState() {
    window.localStorage.setItem(
      this.formClass,
      window.btoa(JSON.stringify(this.inputs.map(input => input.value)))
    );
  }

  deserializeState() {
    const serializedState = window.localStorage.getItem(this.formClass);
    return serializedState ? JSON.parse(window.atob(serializedState)) : null;
  }

  initializeState(initialState) {
    this.inputs.forEach((input, i) => {
      input.onkeydown = this.serializeState.bind(this);
      input.value = initialState ? initialState[i] : "";
    });
    this.clearButton.onclick = this.clearState.bind(this);
    this.submitButton.onclick = this.submit.bind(this);
  }

  clearState() {
    window.localStorage.removeItem(this.formClass);
  }

  submit() {
    // do something with submit here
  }
}

let service = new State(".main__form-container__body__form");
