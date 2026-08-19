# EdgeStone Ticketing System - Context

This document contains all the endpoints, base URLs, and credentials for the EdgeStone Ticketing Backend system. It can be used to automate use-case testing or build external applications.

## Credentials & Configuration

### Application Credentials
* **Production API Base URL**: `https://edgestonebackend-production.up.railway.app`
* **Local API Base URL**: `http://localhost:5000/api`
* **Test User Email**: `it@edgestone.in`
* **Test User Password**: `i@edgestone123`

### Internal System Configuration (from `.env.example`)
* **Database URL**: `postgresql://user:password@localhost:5432/edgestone_db?schema=public`
* **JWT Secret**: `your_jwt_secret_key_here` (Expires in 1 day)
* **Mail Server User**: `support@edgestone.in` (Zoho Mail)

---

## API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/login` - Authenticate and get JWT token
* `GET /api/auth/me` - Get current authenticated user (Protected)
* `PUT /api/auth/profile-picture` - Update current user's profile picture (Protected)
* `GET /api/auth/superadmin-test` - Verify superadmin access (Protected, SuperAdmin only)

### 🎫 Tickets (`/api/tickets`)
*(All routes require authentication)*
* `GET /api/tickets/` - List all tickets
* `POST /api/tickets/` - Create a new ticket
* `PATCH /api/tickets/:id` - Update a ticket's properties
* `PATCH /api/tickets/:id/sla-toggle` - Toggle SLA status for a ticket
* `POST /api/tickets/:id/reply` - Reply to a client ticket
* `GET /api/tickets/:id/vendor-emails` - Fetch emails linked to a vendor ticket
* `POST /api/tickets/:id/vendor-reply` - Reply to a vendor ticket
* `POST /api/tickets/:ticketId/work-notes` - Add an internal work note to a ticket
* `GET /api/tickets/:ticketId/work-notes` - Get all internal work notes for a ticket
* `GET /api/tickets/:ticketId/activity-logs` - Get audit trail/activity logs for a ticket

### 🛡️ SLA Management (`/api/sla`)
* `GET /api/sla/` - List all SLAs
* `GET /api/sla/grouped` - Get SLAs grouped by customer/vendor
* `POST /api/sla/` - Create a new SLA definition
* `GET /api/sla/:id` - Get a specific SLA
* `PUT /api/sla/:id` - Update SLA rules
* `PATCH /api/sla/:id/status` - Patch SLA status
* `POST /api/sla/:id/calculate` - Force calculate an SLA's status and compensation
* `GET /api/sla/:id/rules` - Get rules for a specific SLA
* `POST /api/sla/:id/rules` - Add a new rule to an SLA
* `PUT /api/sla/:id/rules/:ruleId` - Update an SLA rule
* `DELETE /api/sla/:id/rules/:ruleId` - Delete an SLA rule

### 📈 SLA Records (`/api/sla-records`)
* `GET /api/sla-records/` - Get all SLA Records
* `GET /api/sla-records/export` - Export SLA Records to Excel
* `POST /api/sla-records/` - Create a new SLA record
* `GET /api/sla-records/ticket/:ticketId` - Get SLA records for a specific ticket
* `PATCH /api/sla-records/:id/closure` - Mark an SLA record as closed
* `PUT /api/sla-records/:id/manual-update` - Manually update an SLA record
* `PUT /api/sla-records/:id/status` - Manually update SLA record status

### 🔌 Circuits (`/api/circuits`)
*(Require Auth, Roles: Manager, Support crew)*
* `GET /api/circuits/` - List all circuits
* `POST /api/circuits/` - Create a new circuit
* `PUT /api/circuits/:id` - Update an existing circuit

### 🏢 Clients (`/api/clients`)
*(Require Auth, Roles: Manager, Support crew)*
* `GET /api/clients/` - List all clients
* `GET /api/clients/:id` - Get specific client
* `POST /api/clients/` - Create a new client (Manager only)
* `PUT /api/clients/:id` - Update a client (Manager only)

### 🏭 Vendors (`/api/vendors`)
*(Require Auth, Roles: Manager, Support crew)*
* `GET /api/vendors/` - List all vendors
* `GET /api/vendors/:id` - Get specific vendor
* `POST /api/vendors/` - Create a new vendor (Manager only)
* `PUT /api/vendors/:id` - Update a vendor (Manager only)

### 👥 Agents (`/api/agents`)
*(Require Auth, SuperAdmin only)*
* `GET /api/agents/` - List all agents
* `GET /api/agents/:id` - Get specific agent
* `POST /api/agents/` - Create a new agent
* `PUT /api/agents/:id` - Update an agent

### 🤖 AI Support (`/api/ai`)
*(Require Auth)*
* `POST /api/ai/chat` - Chat with Keery (the AI Assistant)
* `POST /api/ai/extract-sla-start/:ticketId` - Extract SLA downtime start using AI

### 📝 Global Notes (`/api/global-note`)
*(Require Auth)*
* `GET /api/global-note/` - Fetch the shift handover sticky note
* `PUT /api/global-note/` - Update the shift handover sticky note

### 🔔 Notifications (`/api/notifications`)
* `GET /api/notifications/stream` - Server-Sent Events (SSE) endpoint for real-time notifications
* `GET /api/notifications/` - List notifications
* `PUT /api/notifications/read-all` - Mark all notifications as read
* `PUT /api/notifications/:id/read` - Mark a specific notification as read

### 🗺️ Roadmap (`/api/roadmap`)
* `GET /api/roadmap/` - Fetch roadmap mapping data (tickets mapped to circuits)
* `POST /api/roadmap/analyze` - AI analysis of roadmap health

### ✍️ Signatures (`/api/signatures`)
* `GET /api/signatures/` - List user signatures
* `POST /api/signatures/` - Create an email signature
* `PUT /api/signatures/:id/set-default` - Set a signature as default (for new/reply)
* `PUT /api/signatures/:id` - Update a signature
* `DELETE /api/signatures/:id` - Delete a signature
* `POST /api/signatures/upload-image` - Upload an image to embed in a signature

### 📁 Uploads (`/api/upload`)
* `POST /api/upload/profile` - Upload a profile picture (single file)
* `POST /api/upload/document` - Upload a general document (single file)
* `POST /api/upload/attachments` - Upload ticket attachments (up to 10 files)

### 📧 Email Webhooks (`/api/email`)
* `POST /api/email/webhook` - Webhook to receive incoming emails from external providers
