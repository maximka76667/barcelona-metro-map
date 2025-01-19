import { calculateDistance } from "./utils"; // Update with your actual path

describe("calculateDistance function", () => {
  // 1. Basic distance test
  it("should return correct distance between (0, 0) and (3, 4)", () => {
    const result = calculateDistance(0, 0, 3, 4);
    expect(result).toBeCloseTo(5); // Pythagorean theorem (3-4-5 triangle)
  });

  // 2. Negative coordinates
  it("should return correct distance between (-1, -1) and (2, 2)", () => {
    const result = calculateDistance(-1, -1, 2, 2);
    expect(result).toBeCloseTo(4.24264, 5); // Using Pythagorean theorem
  });

  // 3. Zero distance (same point)
  it("should return 0 when both points are the same (0, 0) and (0, 0)", () => {
    const result = calculateDistance(0, 0, 0, 0);
    expect(result).toBe(0);
  });

  // 4. Floating point values
  it("should handle floating-point numbers correctly between (1.1, 1.1) and (4.4, 4.4)", () => {
    const result = calculateDistance(1.1, 1.1, 4.4, 4.4);
    expect(result).toBeCloseTo(4.6669, 4); // Should be roughly 4.6669
  });

  // 5. Large numbers
  it("should correctly calculate distance with large values", () => {
    const result = calculateDistance(
      1_000_000,
      1_000_000,
      2_000_000,
      2_000_000
    );
    expect(result).toBeCloseTo(1414213.562, 3); // Expected distance between large numbers
  });

  // 6. Points with 0 differences in one axis
  it("should return correct distance when there is no change in x axis", () => {
    const result = calculateDistance(1, 1, 1, 4);
    expect(result).toBe(3); // Vertical distance (same x, different y)
  });

  it("should return correct distance when there is no change in y axis", () => {
    const result = calculateDistance(1, 1, 4, 1);
    expect(result).toBe(3); // Horizontal distance (same y, different x)
  });
});
