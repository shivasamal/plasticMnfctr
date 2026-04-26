# Plastic ERP Flow Guide

## 1) Objective

This project simulates a plastic manufacturing ERP with seamless module flow and shared data:

- Track production per shift and machine
- Auto-generate batch codes at shift close
- Manage inventory with batch-wise visibility
- Dispatch using FIFO (oldest batch first)
- Show real-time style dashboard metrics and graphs
- Keep accountability by role/manager/operator links

## 2) Current Tech Setup

- Frontend: React + React Router
- UI: Bootstrap + Tailwind + custom ERP styles
- State/Logic: React Context (`ErpContext`)
- Exports: CSV and PDF (`jsPDF`)

## 3) Core Module Flow (End-to-End)

1. **User & Roles**  
   Create/manage Admin, Shift Manager, Operator, Warehouse Staff identities.

2. **Master Data**  
   Maintain Products, Machines, Shifts used by production and batch logic.

3. **Production Tracking**  
   Record shift-wise production entries:
   - date
   - shift
   - machine
   - product
   - quantity
   - manager
   - status (`open`/`closed`)

4. **Batch Generation (Core)**  
   On shift close:
   - picks all open production rows for that shift
   - groups by machine + product
   - creates batch code:
     - `YYYYMMDD-SHIFT-MACHINE-PRODUCT-N`
   - marks production rows as `closed`
   - creates inventory inward rows automatically

5. **Inventory**  
   Shows batch-wise stock with location and batch age visibility.

6. **Dispatch (FIFO)**  
   Dispatch form takes product + quantity + customer:
   - fetches available inventory rows for product
   - sorts by oldest batch date
   - consumes stock FIFO across one or many batches
   - creates dispatch transactions
   - updates inventory quantities

7. **Dashboard**  
   Uses shared live state from all modules:
   - KPI cards
   - production/shift charts
   - machine contribution pie-style chart
   - product-to-batch tree visualization
   - export CSV/PDF

## 4) Cross-Module Reflection Rules

- Production updates influence batch generation eligibility.
- Batch generation immediately increases inventory inward stock.
- Dispatch immediately reduces inventory quantities.
- Dashboard reads current context state, so values refresh with each operation.

## 5) Validation & Safeguards

- Dispatch blocks when stock is insufficient.
- Dispatch quantity must be positive.
- Master data delete is blocked if referenced:
  - Product/Machine/Shift linked to production or batch entries.
- Batch generation blocks if no open production exists for selected shift.

## 6) Notification Behavior

- Notifications are shown as top-right toasts.
- Toast appears for the active module context.
- Success/error tone is supported.

## 7) File Map (Important)

- `src/context/ErpContext.jsx`  
  Shared ERP state + core business logic
- `src/pages/ProductionPage.jsx`  
  Production entry + shift close batch generation
- `src/pages/BatchPage.jsx`  
  Batch register view
- `src/pages/InventoryPage.jsx`  
  Inventory view (batch-based)
- `src/pages/DispatchPage.jsx`  
  FIFO dispatch execution
- `src/pages/DashboardPage.jsx`  
  KPI + charts + export
- `src/pages/UserRolesPage.jsx`  
  Role management
- `src/pages/MasterDataPage.jsx`  
  Product/machine/shift CRUD with relational guards

## 8) Recommended Next Enhancements

- Add backend API (Node/Express + PostgreSQL) for persistence
- Add JWT auth and role-based route guards
- Add approval workflow for data changes
- Add Socket.io for live dashboard refresh
- Add automated test cases for:
  - batch generation
  - FIFO allocation correctness
  - role permissions
