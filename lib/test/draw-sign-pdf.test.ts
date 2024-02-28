import { render, screen } from '@testing-library/vue'
import { DrawSignPdf } from "..";

/* eslint-disable vue/one-component-per-file */

describe("DrawSignPDF — DrawSignPdf", () => {
  test("renders", async () => {
    render(DrawSignPdf);

    const el = await screen.findByText(/hello world/);

    expect(el).toBeTruthy();
  });
});
