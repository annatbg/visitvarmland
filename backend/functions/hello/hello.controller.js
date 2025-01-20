// Controller logic for hello route
const sayHello = (req, res) => {
  res.json({ message: "Hello from the Hello module!" });
};

module.exports = {
  sayHello,
};
