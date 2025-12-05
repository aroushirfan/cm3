# Self‑Assessment of Code

## App v1 – CRUD Operations Without Authentication

- Implemented full CRUD (`getAllJobs`, `getJobById`, `createJob`, `updateJob`, `deleteJob`).
- In v1, routes were open and accessible without authentication.

### Example: Tests Without Auth
```js
it("should create a new job", async () => {
  const response = await api.post("/api/jobs").send(newJob).expect(201);
  expect(response.body.title).toBe(newJob.title);
});
```
**Assessment:**
- Verified CRUD endpoints worked correctly.  
- Covered edge cases: invalid IDs, missing required fields.  
- Ensured database state matched expectations after operations.  

---

## App v2 – Route Protection and Authenticated Tests
Protected the routes using middleware.
Only authenticated users can create, update, or delete jobs.

### Example: Protected Routes
```js
await api
  .post("/api/jobs")
  .set("Authorization", "Bearer " + token)
  .send(newJob)
  .expect(201);  
  ```

**Assessment:**
- Enforced authentication for POST, PUT, DELETE routes.  
- Ensured secure access control with tokens.  

---

### Example: Auth Tests
```js
it("should return 401 if no token is provided", async () => {
  await api.post("/api/jobs").send(newJob).expect(401);
});
```
**Assessment:**
- Confirmed protected routes reject unauthenticated requests.