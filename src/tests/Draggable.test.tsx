import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as stories from "../stories/Draggable.stories";
import { composeStories } from "@storybook/react";

const { Primary } = composeStories(stories);

describe("Draggable component", () => {
  afterEach(cleanup);

  it("Should render", () => {
    render(<Primary></Primary>);
    expect(screen.getByText("Drag me")).toBeDefined();
  });

  it.skip("Should move", async () => {
    const element = render(<Primary></Primary>);
    const queryElement = element.getByTestId("draggable");

    const clickEvent = createEvent.pointerDown(queryElement, {
      pointerId: 1,
      clientX: 0,
      clientY: 0,
      buttons: 1,
    });
    const moveEvent = createEvent.pointerMove(queryElement, {
      pointerId: 1,
      clientX: 20,
      clientY: 50,
      buttons: 1,
    });
    const releaseEvent = createEvent.pointerUp(queryElement, { pointerId: 1 });

    fireEvent(queryElement, clickEvent);
    fireEvent(queryElement, moveEvent);
    fireEvent(queryElement, releaseEvent);

    await waitFor(() => {
      expect(queryElement.style.top).toBe(20);
    });

    expect(queryElement).toBeDefined();
    console.log(queryElement.style);
  });
});
