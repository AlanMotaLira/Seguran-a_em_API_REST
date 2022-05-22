const { UserModels } = require("../../../api/src/models");
const User = require("../../../api/src/models/UserModels");
jest.mock("../../../api/src/dao/userDao");
describe("validação class UserModels", () => {
  jest.useFakeTimers();
  test("método validação usuário", async () => {
    const user = new UserModels({
      name: "teste",
      email: "teste@teste.com",
      password: "12345678",
    });

    expect(user.validate(user.name, user.email, user.password)).toBeUndefined();
  });
  test("método validação usuário", async () => {
    const user = new UserModels({
      name: "teste",
      email: "teste@teste.com",
      password: "123456",
    });

    expect(user.validate(false, false, user.password)).toThrow();
  });
  test("método adds", async () => {
    const user = new UserModels({
      name: "teste",
      email: "teste@teste.com",
      password: "12345678",
    });
    expect(user.adds()).rejects.toMatch(true);
  });
  test("método list", async () => {
    expect( await User.list()).rejects.toMatch([
      {
        id: 1,
        name: "Ana Souza",
        email: "ana@ana.com",
        password: "12345678",
      },
      {
        id: 2,
        name: "Marcos Cintra",
        email: "marcos@marcos.com",
        password: "12345678",
      },
      {
        id: 3,
        name: "Felipe Cardoso",
        email: "felipe@felipe.com",
        password: "12345678",
      },
    ]);
  });
});
