import * as userRepository from "../data-access/user-repository";

afterEach(async () => {
  await userRepository.cleanupData();
});

test("add User", () => {
  // userRepository.addUser({ name: "wei jun", email: "weijun.com@gmail.com" });
});
