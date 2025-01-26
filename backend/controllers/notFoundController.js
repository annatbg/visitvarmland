const error = (req, res) => {
  return res.status(404).json({
    message: "ENDpoint not found",
  });
};

module.exports = { error };
