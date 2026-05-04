import type { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../modules/user/domain/user.repository.js";
import { UserController } from "../../modules/user/presentation/user.controller.js";

jest.mock("../../modules/user/domain/user.repository.ts");
describe("UserController", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;
	let controller: UserController;
	beforeEach(() => {
		req = {};
		res = {
			json: jest.fn().mockReturnThis(),
			status: jest.fn().mockReturnThis(),
		};
		next = jest.fn();
		controller = new UserController();
	});
	it("should return all users", async () => {
		const users = [{ id: 1, username: "test", email: "test@example.com" }];
		(UserRepository.prototype.read as jest.Mock).mockResolvedValue(users);
		await controller.browse(req as Request, res as Response, next);
		expect(res.json).toHaveBeenCalledWith(users);
		expect(res.status).toHaveBeenCalledWith(200);
	});
});
