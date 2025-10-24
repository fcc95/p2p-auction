import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getAuctionsByStatus,
  getAuctionStatus,
  isAuctionRunning,
  canBid,
} from "./auctionHelper";
import type { Auction } from "../store/auction/auctionTypes";

describe("auctionHelper", () => {
  // Mock current time for consistent testing
  const NOW = new Date("2024-01-15T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getAuctionStatus", () => {
    it("should return 'scheduled' when auction hasn't started yet", () => {
      const startAt = new Date("2024-01-20T12:00:00Z");
      const endsAt = new Date("2024-01-25T12:00:00Z");

      const status = getAuctionStatus(startAt, endsAt);

      expect(status).toBe("scheduled");
    });

    it("should return 'running' when auction is currently active", () => {
      const startAt = new Date("2024-01-10T12:00:00Z");
      const endsAt = new Date("2024-01-20T12:00:00Z");

      const status = getAuctionStatus(startAt, endsAt);

      expect(status).toBe("running");
    });

    it("should return 'ended' when auction has finished", () => {
      const startAt = new Date("2024-01-05T12:00:00Z");
      const endsAt = new Date("2024-01-10T12:00:00Z");

      const status = getAuctionStatus(startAt, endsAt);

      expect(status).toBe("ended");
    });

    it("should return 'running' when current time equals start time", () => {
      const startAt = new Date("2024-01-15T12:00:00Z");
      const endsAt = new Date("2024-01-20T12:00:00Z");

      const status = getAuctionStatus(startAt, endsAt);

      expect(status).toBe("running");
    });

    it("should return 'ended' when current time equals end time", () => {
      const startAt = new Date("2024-01-10T12:00:00Z");
      const endsAt = new Date("2024-01-15T12:00:00Z");

      const status = getAuctionStatus(startAt, endsAt);

      expect(status).toBe("ended");
    });
  });

  describe("getAuctionsByStatus", () => {
    const createMockAuction = (
      id: string,
      startAt: Date,
      endsAt: Date
    ): Auction => ({
      id,
      ownerId: "owner-1",
      ownerName: "Owner Name",
      title: `Auction ${id}`,
      desc: "Test auction description",
      startingPrice: 100,
      startAt,
      endsAt,
    });

    const auctions: Auction[] = [
      createMockAuction(
        "1",
        new Date("2024-01-20T12:00:00Z"),
        new Date("2024-01-25T12:00:00Z")
      ), // scheduled
      createMockAuction(
        "2",
        new Date("2024-01-10T12:00:00Z"),
        new Date("2024-01-20T12:00:00Z")
      ), // running
      createMockAuction(
        "3",
        new Date("2024-01-05T12:00:00Z"),
        new Date("2024-01-10T12:00:00Z")
      ), // ended
      createMockAuction(
        "4",
        new Date("2024-01-12T12:00:00Z"),
        new Date("2024-01-18T12:00:00Z")
      ), // running
      createMockAuction(
        "5",
        new Date("2024-01-22T12:00:00Z"),
        new Date("2024-01-28T12:00:00Z")
      ), // scheduled
    ];

    it("should filter scheduled auctions", () => {
      const result = getAuctionsByStatus(auctions, "scheduled");

      expect(result).toHaveLength(2);
      expect(result.map((a) => a.id)).toEqual(["1", "5"]);
    });

    it("should filter running auctions", () => {
      const result = getAuctionsByStatus(auctions, "running");

      expect(result).toHaveLength(2);
      expect(result.map((a) => a.id)).toEqual(["2", "4"]);
    });

    it("should filter ended auctions", () => {
      const result = getAuctionsByStatus(auctions, "ended");

      expect(result).toHaveLength(1);
      expect(result.map((a) => a.id)).toEqual(["3"]);
    });

    it("should return empty array when no auctions match status", () => {
      const allEndedAuctions = [
        createMockAuction(
          "1",
          new Date("2024-01-01T12:00:00Z"),
          new Date("2024-01-05T12:00:00Z")
        ),
      ];

      const result = getAuctionsByStatus(allEndedAuctions, "running");

      expect(result).toHaveLength(0);
    });

    it("should return empty array when given empty auction list", () => {
      const result = getAuctionsByStatus([], "running");

      expect(result).toHaveLength(0);
    });
  });

  describe("isAuctionRunning", () => {
    it("should return true when auction is running", () => {
      const startAt = new Date("2024-01-10T12:00:00Z");
      const endsAt = new Date("2024-01-20T12:00:00Z");

      const result = isAuctionRunning(startAt, endsAt);

      expect(result).toBe(true);
    });

    it("should return false when auction is scheduled", () => {
      const startAt = new Date("2024-01-20T12:00:00Z");
      const endsAt = new Date("2024-01-25T12:00:00Z");

      const result = isAuctionRunning(startAt, endsAt);

      expect(result).toBe(false);
    });

    it("should return false when auction has ended", () => {
      const startAt = new Date("2024-01-05T12:00:00Z");
      const endsAt = new Date("2024-01-10T12:00:00Z");

      const result = isAuctionRunning(startAt, endsAt);

      expect(result).toBe(false);
    });

    it("should handle Date objects passed as parameters", () => {
      const startAt = new Date("2024-01-10T12:00:00Z");
      const endsAt = new Date("2024-01-20T12:00:00Z");

      const result = isAuctionRunning(startAt, endsAt);

      expect(result).toBe(true);
    });
  });

  describe("canBid", () => {
    const createMockAuction = (
      ownerId: string,
      startAt: Date,
      endsAt: Date
    ): Auction => ({
      id: "auction-1",
      ownerId,
      ownerName: "Owner Name",
      title: "Test Auction",
      desc: "Test auction description",
      startingPrice: 100,
      startAt,
      endsAt,
    });

    it("should return true when bidder is not owner and auction is running", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-10T12:00:00Z"),
        new Date("2024-01-20T12:00:00Z")
      );

      const result = canBid(auction, "bidder-1");

      expect(result).toBe(true);
    });

    it("should return false when bidder is the owner", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-10T12:00:00Z"),
        new Date("2024-01-20T12:00:00Z")
      );

      const result = canBid(auction, "owner-1");

      expect(result).toBe(false);
    });

    it("should return false when auction is not running (scheduled)", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-20T12:00:00Z"),
        new Date("2024-01-25T12:00:00Z")
      );

      const result = canBid(auction, "bidder-1");

      expect(result).toBe(false);
    });

    it("should return false when auction is not running (ended)", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-05T12:00:00Z"),
        new Date("2024-01-10T12:00:00Z")
      );

      const result = canBid(auction, "bidder-1");

      expect(result).toBe(false);
    });

    it("should return false when bidder is owner and auction is not running", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-20T12:00:00Z"),
        new Date("2024-01-25T12:00:00Z")
      );

      const result = canBid(auction, "owner-1");

      expect(result).toBe(false);
    });

    it("should handle edge case when auction just started", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-15T12:00:00Z"),
        new Date("2024-01-20T12:00:00Z")
      );

      const result = canBid(auction, "bidder-1");

      expect(result).toBe(true);
    });

    it("should handle edge case when auction just ended", () => {
      const auction = createMockAuction(
        "owner-1",
        new Date("2024-01-10T12:00:00Z"),
        new Date("2024-01-15T12:00:00Z")
      );

      const result = canBid(auction, "bidder-1");

      expect(result).toBe(false);
    });

    it("should handle different bidder IDs correctly", () => {
      const auction = createMockAuction(
        "owner-123",
        new Date("2024-01-10T12:00:00Z"),
        new Date("2024-01-20T12:00:00Z")
      );

      expect(canBid(auction, "bidder-456")).toBe(true);
      expect(canBid(auction, "bidder-789")).toBe(true);
      expect(canBid(auction, "owner-123")).toBe(false);
    });
  });
});
