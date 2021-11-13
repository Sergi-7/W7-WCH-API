const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given a notFoundErrorHandler middleware", () => {
  describe("When it receives an object res", () => {
    test("Then it should respond with a 'Endpoint not found' and a 404 status", () => {
      const res = mockResponse();

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given a generalErrorHandler", () => {
  describe("When it receives an object error and an object res", () => {
    test("Then it should call the method status with a code and the method json with a message", () => {
      const res = mockResponse();
      const error = { code: 400, message: "blabla" };

      generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("When it receives an object res", () => {
    test("Then it should call the method status with 500 and json with a 'General error' message", () => {
      const res = mockResponse();
      const error = {};

      generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "General error" });
    });
  });
});
