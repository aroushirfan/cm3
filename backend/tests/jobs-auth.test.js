const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

// Seed data
const jobs = [
    {
        title: "Backend Developer",
        type: "Full-Time",
        description:
            "Design and maintain RESTful APIs, optimize database queries, and ensure system scalability.",
        company: {
            name: "TechCorp Solutions",
            contactEmail: "hr@techcorp.com",
            size: 100
        },
        location: { city: "Espoo", state: "Uusimaa" },
        salary: 6000,
        experienceLevel: "Entry",
        status: "open",
        applicationDeadline: "2025-12-31",
        requirements: ["node", "mvc"]
    },
    {
        title: "Frontend Engineer",
        type: "Contract",
        description:
            "Build responsive user interfaces with React, collaborate with designers, and improve UX performance.",
        company: {
            name: "Designify Studios",
            contactEmail: "jobs@designify.io",
            size: 200
        },
        location: { city: "Helsinki", state: "Uusimaa" },
        salary: 5000,
        experienceLevel: "Mid",
        status: "open",
        applicationDeadline: "2025-12-31",
        requirements: ["react", "css"]
    }
];

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
    await User.deleteMany({});
    const result = await api.post("/api/users/signup").send({
        name: "John Doe",
        username: "johndoe",
        password: "R3g5T7#gh",
        phone_number: "1234567890",
        gender: "Male",
        date_of_birth: "1990-01-01",
        address: {
            street: "Main Street 1",
            city: "Espoo",
            zipCode: "02100"
        }
    });
    token = result.body.token;
});

describe("Protected Job Routes", () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        await Promise.all([
            api
                .post("/api/jobs")
                .set("Authorization", "Bearer " + token)
                .send(jobs[0]),
            api
                .post("/api/jobs")
                .set("Authorization", "Bearer " + token)
                .send(jobs[1]),
        ]);
    });

    // ---------------- POST ----------------
    it("should create one job with valid token returning 201", async () => {
        const newJob = {
            title: "Full Stack Developer",
            type: "Full-Time",
            description: "Design APIs and build responsive UIs with React.",
            company: {
                name: "TechCorp Solutions",
                contactEmail: "hr@techcorp.com",
                size: 150
            },
            location: { city: "Espoo", state: "Uusimaa" },
            salary: 7000,
            experienceLevel: "Senior",
            status: "open",
            applicationDeadline: "2026-01-15",
            requirements: ["node", "react", "css"]
        };
        const response = await api
            .post("/api/jobs")
            .set("Authorization", "Bearer " + token)
            .send(newJob)
            .expect(201);

        expect(response.body.title).toBe(newJob.title);
    });

    it("should return 401 if no token is provided", async () => {
        const newJob = {
            title: "Full Stack Developer",
            type: "Full-Time",
            description: "Design APIs and build responsive UIs with React.",
            company: {
                name: "TechCorp Solutions",
                contactEmail: "hr@techcorp.com",
                size: 150
            },
            location: { city: "Espoo", state: "Uusimaa" },
            salary: 7000,
            experienceLevel: "Senior",
            status: "open",
            applicationDeadline: "2026-01-15",
            requirements: ["node", "react", "css"]
        };
        await api.post("/api/jobs").send(newJob).expect(401);
    });

    // ---------------- PUT ----------------
    it("should update one job with valid token returning 200", async () => {
        const job = await Job.findOne();
        const updatedJob = { title: "Updated job title", type: "Part-Time" };

        const response = await api
            .put(`/api/jobs/${job._id}`)
            .set("Authorization", "Bearer " + token)
            .send(updatedJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(updatedJob.title);

        const updatedJobCheck = await Job.findById(job._id);
        expect(updatedJobCheck.type).toBe(updatedJob.type);
    });

    it("should return 401 if no token is provided", async () => {
        const job = await Job.findOne();
        const updatedJob = { title: "Updated job title", type: "Part-Time" };

        await api.put(`/api/jobs/${job._id}`).send(updatedJob).expect(401);
    });

    // ---------------- DELETE ----------------
    it("should delete one job with valid token returning 200", async () => {
        const job = await Job.findOne();
        await api
            .delete(`/api/jobs/${job._id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        const jobCheck = await Job.findById(job._id);
        expect(jobCheck).toBeNull();
    });

    it("should return 401 if no token is provided", async () => {
        const job = await Job.findOne();
        await api.delete(`/api/jobs/${job._id}`).expect(401);
    });
});

// Close DB connection once after all tests
afterAll(async () => {
    await mongoose.connection.close();
});