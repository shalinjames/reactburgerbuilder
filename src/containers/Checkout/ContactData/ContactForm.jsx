const configValidationRules = (rules = {}) => {
  return {
    validation: {
      required: rules.required || true,
      minLength: rules.minLength,
      maxLength: rules.maxLength
    },
    valid: rules.valid || false,
    touched: false
  };
};

const configSelectElement = (options, name, value) => {
  return {
    name,
    elementType: "select",
    elementDefaultProps: { options },
    value,
    ...configValidationRules({ requried: false })
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
  name: configInputElement("text", "Name", "name", "Enter Full Name"),
  street: configInputElement(
    "text",
    "Street",
    "street",
    "Enter Street Number",
    ""
  ),
  zipCode: configInputElement(
    "text",
    "Zipcode",
    "zipcode",
    "Enter Zipcode",
    "",
    { minLength: 6, maxLength: 6 }
  ),
  country: configInputElement(
    "text",
    "Country",
    "country",
    "Enter a Country Name",
    ""
  ),
  email: configInputElement(
    "email",
    "E-mail",
    "email",
    "Enter a Valid E-mail Address",
    ""
  ),
  mobile: configInputElement(
    "text",
    "Mobile",
    "mobile",
    "Enter a Valid Mobile Number",
    ""
  ),
  deliveryMethod: configSelectElement(
    [
      { value: "quickest", displayValue: "15mins Delivery" },
      { value: "fasetest", displayValue: "Fastest" },
      { value: "cheapest", displayValue: "Cheapest" }
    ],
    "deliverymethod",
    "",
    ""
  )
};

export default contactForm;
