# Testing Credentials & Example Requests

These are example testing credentials and curl examples you can use to exercise backend auth and admin-only endpoints in a development environment. Do NOT use real production credentials here.

Example (placeholder) admin credentials:
- Email: `admin@example.com`
- Password: `Test1234!`

How to obtain a token (if backend supports `/auth/login`):
```bash
curl -X POST "${VITE_API_BASE_URL:-https://coeec-dev-backend.onrender.com/api}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Test1234!"}'
```

If the backend is hosted remotely (render) and you don't control it, you must ask the backend maintainer to provide test accounts or to seed test data.

Guidance for adding test data (admin-only endpoints):
- Use admin endpoints only in a safe test environment. Example: `POST /news` to create a news item, `POST /staff` to create a test staff member.
- Always delete test data after verification.

If you want, I can prepare example `curl` payloads for each public endpoint (news, departments, staff, research) to help populate a local or staging backend.
