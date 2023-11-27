import supertest from "supertest";
const app = require("../../routes/user.ts");

describe("User Route Test", () => {
    it("GET/ should return users", async () => {
        const res = await supertest(app).get("/user");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("users");
    });
    it("GET/:id should return user by id", async () => {
        const res = await supertest(app).get("/user/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it("GET/email/:email should return user by email", async () => {
        const res = await supertest(app).get("/user/email/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it("POST/ should create user", async () => {
        const res = await supertest(app).post("/user").send({
        name: "test",
        email: "test",
        password: "test",
        phone: "test",
        address: "test",
        role: "admin",
        });
        expect(res.statusCode).toEqual(200);
    });
    it("PUT/:id should update user", async () => {
        const res = await supertest(app).put("/user/1").send({
        name: "test",
        email: "test",
        password: "test",
        phone: "test",
        address: "test",
        role: "admin",
        });
        expect(res.statusCode).toEqual(200);
    });
    it("DELETE/:id should delete user", async () => {
        const res = await supertest(app).delete("/user/1");
        expect(res.statusCode).toEqual(200);
    });
    it("POST/login should login user", async () => {
        const res = await supertest(app).post("/user/login").send({
        email: "test",
        password: "test",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it('GET/:id should return 2faQrCode', async () => {
        const res = await supertest(app).get('/user/2faQrCode/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('qrCode');
    }
    );

    });