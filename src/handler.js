exports.hello = async (event) => {
  return {
    status: 200,
    body: JSON.stringify({
      message: "Hola mundo!",
    }),
  };
};
