const jwt = require("jsonwebtoken");
const auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given an auth function", () => {
  describe("When it receives an unauthorized request", () => {
    test("Then it should call next with an error 401 and a message", () => {
      const req = {
        header: jest.fn(),
      };

      const error = new Error("Token missing");
      error.code = 401;
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a request with Authorization a correct token", () => {
    test("Then it should call the next function", () => {
      const req = {
        header: jest.fn(),
      };

      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue(true);

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a request with Authorization header and an incorrect token", () => {
    test("Then it should call next function with an error 401 an a message", () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer sss"),
      };

      jwt.verify = jest.fn().mockReturnValue();

      const next = jest.fn();
      const error = new Error("Invalid token");
      error.code = 401;

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
