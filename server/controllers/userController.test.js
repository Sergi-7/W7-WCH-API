const { registerUser } = require("./userController");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");
jest.mock("bcrypt");

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
