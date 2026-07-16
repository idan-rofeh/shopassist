import type { OrderItem } from '@chatbot/shared';

export const ORDER_ITEMS: OrderItem[] = [
  // Order 1 — user 1
  {
    id: 1,
    orderId: 1,
    productId: 'prod-001', // Aurora Laptop 14
    quantity: 1,
    unitPrice: 899,
    createdAt: new Date('2026-06-01T10:00:00.000Z'),
    updatedAt: null,
  },
  {
    id: 2,
    orderId: 1,
    productId: 'prod-006', // ComfortFit Wireless Mouse
    quantity: 2,
    unitPrice: 29,
    createdAt: new Date('2026-06-01T10:00:00.000Z'),
    updatedAt: null,
  },
  {
    id: 3,
    orderId: 1,
    productId: 'prod-007', // MechType Keyboard TKL
    quantity: 1,
    unitPrice: 89,
    createdAt: new Date('2026-06-01T10:00:00.000Z'),
    updatedAt: null,
  },
  // Order 2 — user 1
  {
    id: 4,
    orderId: 2,
    productId: 'prod-008', // StudioSound USB Headset
    quantity: 1,
    unitPrice: 59,
    createdAt: new Date('2026-06-15T14:30:00.000Z'),
    updatedAt: null,
  },
  {
    id: 5,
    orderId: 2,
    productId: 'prod-010', // TravelShell 15" Sleeve
    quantity: 1,
    unitPrice: 35,
    createdAt: new Date('2026-06-15T14:30:00.000Z'),
    updatedAt: null,
  },
  // Order 3 — user 2
  {
    id: 6,
    orderId: 3,
    productId: 'prod-003', // NovaBook Air
    quantity: 1,
    unitPrice: 749,
    createdAt: new Date('2026-06-20T09:15:00.000Z'),
    updatedAt: null,
  },
  {
    id: 7,
    orderId: 3,
    productId: 'prod-009', // FlexStand Laptop Riser
    quantity: 1,
    unitPrice: 45,
    createdAt: new Date('2026-06-20T09:15:00.000Z'),
    updatedAt: null,
  },
  // Order 4 — user 2
  {
    id: 8,
    orderId: 4,
    productId: 'prod-005', // PixelLine Chrome 13
    quantity: 1,
    unitPrice: 599,
    createdAt: new Date('2026-07-01T16:45:00.000Z'),
    updatedAt: null,
  },
  {
    id: 9,
    orderId: 4,
    productId: 'prod-006', // ComfortFit Wireless Mouse
    quantity: 1,
    unitPrice: 29,
    createdAt: new Date('2026-07-01T16:45:00.000Z'),
    updatedAt: null,
  },
];
