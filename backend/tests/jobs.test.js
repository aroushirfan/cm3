const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Job = require("../models/jobModel");

// Seed data for tests
const jobs = [
    {
        title: "Backend Developer",
        type: "Full-Time",
        description:
            "Design and maintain RESTful APIs, optimize database queries, and ensure system scalability.",
        company: {
            name: "TechCorp Solutions",
            contactEmail: "hr@techcorp.com",
            size: 100,
        },
        location: {
            city: "Espoo",
            state: "Uusimaa"
        },
        salary: 6000,
        experienceLevel: "Entry",
        status: "open",
        applicationDeadline: new Date("2025-12-31"),
        requirements: ["node", "mvc"]
    },
    {
        title: "Frontend Engineer",
        type: "Contract",
        description:
            "Build responsive user interfaces with React, collaborate with designers, and improve UX performance.",
        company: {
            name: "TechCorp Solutions",
            contactEmail: "hr@techcorp.com",
            size: 200,
        },
        location: {
            city: "Helsinki",
            state: "Uusimaa"
        },
        salary: 6000,
        experienceLevel: "Entry",
        status: "open",
        applicationDeadline: new Date("2025-12-31"),
        requirements: ["react", "css"]
    },
];

// Reset the jobs collection before each test
beforeEach(async () => {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
});

// ---------------- GET ----------------
describe("GET /api/jobs", () => {
    it("should return all jobs as JSON when GET /api/jobs is requested", async () => {
        const response = await api
            .get("/api/jobs")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toHaveLength(jobs.length);
        const job = response.body[0];
        expect(job).toHaveProperty("title");
        expect(job).toHaveProperty("type");
        expect(job).toHaveProperty("description");
        expect(job).toHaveProperty("company");
        expect(job.company).toHaveProperty("name");
        expect(job.company).toHaveProperty("contactEmail");
        expect(job.company).toHaveProperty("size");
        expect(job).toHaveProperty("location");
        expect(job.location).toHaveProperty("city");
        expect(job.location).toHaveProperty("state");
        expect(job).toHaveProperty("salary");
        expect(job).toHaveProperty("experienceLevel");
        expect(job).toHaveProperty("postedDate");
        expect(job).toHaveProperty("status");
        expect(job).toHaveProperty("applicationDeadline");
        expect(job).toHaveProperty("requirements");
    });
    it("should return an empty array when no jobs exist", async () => {
        await Job.deleteMany({});
        const res = await api.get("/api/jobs").expect(200);
        expect(res.body).toEqual([]);
    })
});

describe("GET /api/jobs/:id", () => {
    it("should return one job by ID when GET /api/jobs/:id is requested", async () => {
        const job = await Job.findOne();
        const response = await api
            .get(`/api/jobs/${job._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(job.title);
    });

    it("should return 404 for a non-existing job ID", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        await api.get(`/api/jobs/${nonExistentId}`).expect(404);
    });
});

// ---------------- POST ----------------
describe("POST /api/jobs", () => {
    it("should create a new job", async () => {
        const newJob = {
            title: "Backend Developer",
            type: "Full-Time",
            description:
                "Design and maintain RESTful APIs, optimize database queries, and ensure system scalability.",
            company: {
                name: "TechCorp Solutions",
                contactEmail: "hr@techcorp.com",
                size: 100,
            },
            location: {
                city: "Espoo",
                state: "Uusimaa"
            },
            salary: 6000,
            experienceLevel: "Entry",
            status: "open",
            applicationDeadline: new Date("2025-12-31"),
            requirements: ["node", "mvc"]
        }

        const response = await api
            .post("/api/jobs")
            .send(newJob)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(newJob.title);

        const jobsAfterPost = await Job.find({});
        expect(jobsAfterPost).toHaveLength(jobs.length + 1);
    });
    it("should return 400 for missing required fields", async () => {
        const invalidJob = {
            type: "Part-Time",
            description: "This job is missing the title field.",
            company: {
                name: "TechCorp Solutions",
                contactEmail: "hr@techcorp.com",
                contactPhone: "+1-555-123-4567",
            },
        };
        await api.post("/api/jobs").send(invalidJob).expect(400);
    });
});

// ---------------- PUT ----------------
describe("PUT /api/jobs/:id", () => {
    it("should update a job with partial data", async () => {
        const job = await Job.findOne();
        const updatedJob = { title: "Updated info", type: "Part-Time" };

        const response = await api
            .put(`/api/jobs/${job._id}`)
            .send(updatedJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(updatedJob.title);

        const updatedJobCheck = await Job.findById(job._id);
        expect(updatedJobCheck.type).toBe(updatedJob.type);
    });

    it("should return 400 for invalid job ID", async () => {
        const invalidId = "12345"; // invalid format, not a valid ObjectId
        await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
    });
});

// ---------------- DELETE ----------------
describe("DELETE /api/jobs/:id", () => {
    it("should delete a job by ID", async () => {
        const job = await Job.findOne();
        await api.delete(`/api/jobs/${job._id}`).expect(200);

        const deletedJobCheck = await Job.findById(job._id);
        expect(deletedJobCheck).toBeNull();
    });

    it("should return 400 for invalid job ID", async () => {
        const invalidId = "12345"; // invalid format
        await api.delete(`/api/jobs/${invalidId}`).expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});