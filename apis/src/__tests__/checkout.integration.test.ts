/**
 * Integration test: checkout flow. Register -> add to cart -> checkout -> get order.
 * Requires DATABASE_URL (e.g. test DB). Run with: pnpm test (or vitest run).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";

// Mock io so checkout controller doesn't need real Socket.io
const mockIo = {
  to: () => ({ emit: () => { } }),
};
app.set("io", mockIo as never);

describe.skipIf(!process.env.DATABASE_URL)("Checkout flow (requires DATABASE_URL)", () => {
  let accessToken: string;
  let orderId: string;

  beforeAll(async () => {
    // Ensure we have at least one product (seed may have run)
    const count = await prisma.product.count();
    if (count === 0) {
      await prisma.product.create({
        data: {
          name: "Test Product",
          price: 9.99,
          category: "Test",
          stock: 10,
        },
      });
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("registers and returns tokens", async () => {
    const email = `test-${Date.now()}@example.com`;
    const res = await request(app)
      .post("/auth/register")
      .send({ email, password: "password123", name: "Test" })
      .expect(201);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body.user.email).toBe(email);
    accessToken = res.body.accessToken;
  });

  it("adds item to cart", async () => {
    const products = await prisma.product.findMany({ take: 1 });
    expect(products.length).toBeGreaterThan(0);
    const productId = products[0]!.id;
    const res = await request(app)
      .post("/cart/items")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId, quantity: 1 })
      .expect(201);
    expect(res.body).toHaveProperty("items");
    expect(res.body.items.length).toBe(1);
  });

  it("checkout creates order", async () => {
    const res = await request(app)
      .post("/checkout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        shippingAddress: "123 Test St",
        contactEmail: "test@example.com",
        contactPhone: "555-0000",
      })
      .expect(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.status).toBe("placed");
    orderId = res.body.id;
  });

  it("GET /orders/:id returns the order", async () => {
    const res = await request(app)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
    expect(res.body.id).toBe(orderId);
    expect(res.body.items.length).toBeGreaterThan(0);
  });
});
