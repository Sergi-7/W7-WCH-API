const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("./userController");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a registerUser controller", () => {
  describe("When it receives a request with an already created username", () => {
    test("Then it should call next function with an error", async () => {
      const req = {
        body: {
          username: "Santi",
        },
      };

      User.findOne = jest.fn().mockResolvedValue(true);
      const next = jest.fn();

      await registerUser(req, null, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
  describe("Given a registerUser controller", () => {
    describe("When it receives a request with a non existant username", () => {
      test("Then it should respond with the method json and the newUser", async () => {
        const req = {
          body: {
            name: "Santi",
            username: "Figatablo",
            password: "figuitiufiguinemarazz",
          },
        };
        const res = {
          json: jest.fn(),
        };
        User.findOne = jest.fn().mockResolvedValue(false);

        await registerUser(req, res);

        expect(res.json).toHaveBeenCalledWith(req.body);
      });
    });
  });
});

describe("Given a loginUser controller", () => {
  describe("When it receives a request with a non existant user", () => {
    test("Then it should call the next method with an error", async () => {
      const req = {
        body: {
          username: "santiago",
        },
      };

      User.findOne = jest.fn().mockResolvedValue(false);
      const next = jest.fn();

      await loginUser(req, null, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });
  describe("When it receives a request with a correct username and password", () => {
    test("Then it should call the method json with and object with a token property", async () => {
      const req = {
        body: {
          username: "santi",
          password: "lari",
        },
      };

      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue({});

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const token = "figatablodelscolons";
      jwt.sign = jest.fn().mockReturnValue(token);

      const expectedResponse = {
        token,
      };

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
  describe("When it receives a correct username with an invalid password", () => {
    test("Then it should call next with an error", async () => {
      const req = {
        body: {
          username: "Santi",
          password: "lari",
        },
      };
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const next = jest.fn();

      const error = new Error("Incorrect password");
      error.code = 401;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});
