const configValidationRules = (rules = {}) => {
  return {
    validation: {
      required: !!rules.required,
      minLength: rules.minLength,
      maxLength: rules.maxLength
    },
    valid: rules.valid || false,
    touched: false
  };
};

const configInputElement = (...args) => {
  const [type, placeholder, name, label, value, validation] = args;
  return {
    elementType: "input",
    elementLabel: label,
    elementDefaultProps: {
      type,
      placeholder,
      name
    },
    value,
    ...configValidationRules(validation)
  };
};

export const contactForm = {
  email: configInputElement(
    "email",
    "User name",
    "email",
    "Enter a Valid User name",
    ""
  ),
  password: configInputElement(
    "password",
    "Password",
    "password",
    "Enter Password"
  )
};

export default contactForm;
