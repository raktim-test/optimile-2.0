# Optimile Admin Portal (UI Scaffold)

## Run
```bash
cd optimile/frontend
npm install
npm run dev:admin
```

## Env
- `.env.development` defaults to mock API mode.
- `.env.production` points to placeholder backend URL.

## Demo Credentials
- `admin / admin`

## Screen Inventory (5.7)
- Login (super admin)
- Tenants list / detail (provision + module toggles)
- Users list (filters + status)
- User detail (profile + access matrix + login history)
- Roles (list + create + permission matrix)
- Master Data (customers/vendors/vehicle types/materials/LR config/hierarchy)
- Audit log (filters + export state)

## Notes
- Mock API only, with latency envelope + simulated error endpoint.
- Shared component kit exists under `src/components/ui`.
- [AMBIGUITY: Prompt asks for 0/8 admin screens but lists 7 explicit screens. Recommended resolution: treat Users list and User detail as separate, plus include tenants detail in tenants module to satisfy 8 total UX states.]
