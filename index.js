const claimBtn = document.querySelector(".intro-right--btn_green");

const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#emailaddress");
const password = document.querySelector("#password");

const selectSiblings = function (input) {
  const inputSibling = input.nextElementSibling;
  const inputSecondSibling = inputSibling.nextElementSibling;

  return [inputSibling, inputSecondSibling];
};

// wil display errors img and message
const showError = function (input) {
  const [firstSibling, secondSibling] = [...selectSiblings(input)];

  input.classList.add("show-error");
  firstSibling.classList.add("show-opacity");
  secondSibling.classList.add("show-opacity");
};

// will remove errors img and message
const successInput = function (input, inputValue) {
  const [firstSibling, secondSibling] = [...selectSiblings(input)];

  input.value = inputValue;
  input.classList.remove("show-error");
  firstSibling.classList.remove("show-opacity");
  secondSibling.classList.remove("show-opacity");
};

// validate email using regx
const isValidEmail = (email) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(String(email).toLowerCase());
};

// will show wrong email inserted in the placeholder as error
const showErrorEmail = function (email) {
  let emailValue = email.value;
  //   let placeHolder = email.placeholder;
  document.querySelector("#emailaddress").placeholder = emailValue;
  email.value = "";
  email.classList.add("redplaceholder");
};

// will initialize the values if all the inputs are entered correctly.
const initialValue = function (input) {
  input.value = "";
};

// this will validate all the inputs
const validateInputs = function () {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (firstNameValue === "") {
    showError(firstName);
  } else {
    successInput(firstName, firstNameValue);
  }

  if (lastNameValue === "") {
    showError(lastName);
  } else {
    successInput(lastName, lastNameValue);
  }

  if (emailValue === "") {
    showError(email);
  } else if (!isValidEmail(emailValue)) {
    showError(email);
    showErrorEmail(email);
  } else {
    successInput(email, emailValue);
    email.classList.remove("redplaceholder");
    document.querySelector("#emailaddress").placeholder = "Email Address";
  }

  if (passwordValue === "") {
    showError(password);
  } else if (passwordValue.length < 8) {
    showError(password);
  } else {
    successInput(password, passwordValue);
  }

  if (
    firstNameValue &&
    lastNameValue &&
    emailValue &&
    isValidEmail(emailValue) &&
    passwordValue &&
    passwordValue.length >= 8
  ) {
    initialValue(firstName);
    initialValue(lastName);
    initialValue(email);
    initialValue(password);
  }
};

claimBtn.addEventListener("click", function () {
  validateInputs();
});
