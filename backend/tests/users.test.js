const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
    await User.deleteMany({});
});

describe("User Routes", () => {
    describe("POST /api/users/signup", () => {
        it("should signup a new user with valid credentials", async () => {
            const userData = {
                name: "John Doe",
                username: "johndoe",
                password: "R3g5T7#gh",
                phone_number: "09-123-47890",
                gender: "Male",
                date_of_birth: "1999-01-01",
                address: {
                    street: "Main Street 1",
                    city: "Espoo",
                    zipCode: "02100"
                }
            };


            const result = await api.post("/api/users/signup").send(userData);

            expect(result.status).toBe(201);
            expect(result.body).toHaveProperty("token");

            // Extra check: user is actually saved in DB
            const savedUser = await User.findOne({ email: userData.email });
            expect(savedUser).not.toBeNull();
        });
        it("should return 400 when username is missing", async () => {
            const userData = {
                name: "Jane Doe",
                password: "R3g5T7#gh",
                phone_number: "1234567890",
                gender: "Female",
                date_of_birth: "1990-01-01",
                address: {
                    street: "Street 2",
                    city: "Helsinki",
                    zipCode: "00100"
                }
            };
            const res = await api.post("/api/users/signup").send(userData);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error");
        })
        it("should return 400 when password is missing", async () => {
            const userData = {
                name: "Jane Doe",
                username: "janedoe",
                phone_number: "1234567890",
                gender: "Female",
                date_of_birth: "1990-01-01",
                address: {
                    street: "Street 2",
                    city: "Helsinki",
                    zipCode: "00100"
                }
            };
            const res = await api.post("/api/users/signup").send(userData);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error");
        })
    });
    // ---------------- LOGIN ----------------
    describe("POST /api/users/login", () => {
        beforeEach(async () => {
            await api.post("/api/users/signup").send({
                name: "Login User",
                username: "loginuser",
                password: "R3g5T7#gh",
                phone_number: "09-123-47890",
                gender: "Female",
                date_of_birth: "1999-01-01",
                address: {
                    street: "Street 3",
                    city: "Espoo",
                    zipCode: "02100"
                }
            });
        })
        it("should login a user with valid credentials", async () => {

            // Then login
            const result = await api.post("/api/users/login").send({
                username: "loginuser",
                password: "R3g5T7#gh"
            });

            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("token");
        });

        it("should return 400 with wrong password", async () => {
            const result = await api.post("/api/users/login").send({
                username: "loginuser",
                password: "wrongpassword",
            });

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
        it("should return 400 with wrong pasword", async () => {
            const result = await api.post("/api/users/login").send({
                username: "loginuser",
                password: "wrongpassword"
            });
            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        })
        it("should return 400 when password is missing", async () => {
            const result = await api.post("/api/users/login").send({
                username: "loginuser"
            })
            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        })
        it("should return 400 when username is missing", async () => {
            const result = await api.post("/api/users/login").send({
                password: "R3g5T7#gh"
            });
            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });
});

// Close DB connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});