const formLabelFocus = ({ type }, ref = "", value) => {
  switch (type) {
    case "focus":
      ref.current.classList.add("label-active");
      break;
    case "blur":
      if (value) return;
      ref.current.classList.remove("label-active");
  }
};

export default formLabelFocus;
