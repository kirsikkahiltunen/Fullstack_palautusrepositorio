import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect, test, vi } from "vitest";

test("renders title, author, url and likes, but not any buttons", () => {
  const blog = {
    title: "Testi blogi",
    author: "Erkki Esimerkki",
    likes: 3,
    url: "testiblogi.fi",
    user: {
      name: "test user",
    },
  };

  render(<Blog blog={blog} />);

  const titleElement = screen.findByText("Testi blogi");
  const authorElement = screen.findByText("Erkki Esimerkki");
  const urlElement = screen.queryByText("testiblogi.fi");
  const likesElement = screen.queryByText(3);
  const button = screen.queryByText("like");
  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
  expect(button).toBeNull();
});

test("Only like button is shown to logged in user", async () => {
  const blog = {
    title: "Testi blogi",
    author: "Erkki Esimerkki",
    likes: 3,
    url: "testiblogi.fi",
    user: {
      username: "Testi123",
      name: "test user",
    },
  };

  render(<Blog blog={blog} user={"new user"} />);

  const titleElement = screen.findByText("Testi blogi");
  const authorElement = screen.findByText("Erkki Esimerkki");
  const urlElement = screen.findByText("testiblogi.fi");
  const likesElement = screen.findByText(3);
  const likeButton = screen.findByText("like");
  const removeButton = screen.queryByText("remove");
  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(removeButton).toBeNull();
});

test("Remove button is shown to the user who created the blog", async () => {
  const blog = {
    title: "Testi blogi",
    author: "Erkki Esimerkki",
    likes: 3,
    url: "testiblogi.fi",
    user: {
      username: "Testi123",
      name: "test user",
    },
  };

  render(<Blog blog={blog} user={"test user"} />);

  const titleElement = screen.findByText("Testi blogi");
  const authorElement = screen.findByText("Erkki Esimerkki");
  const urlElement = screen.findByText("testiblogi.fi");
  const likesElement = screen.findByText(3);
  const likeButton = screen.findByText("like");
  const removeButton = screen.findByText("remove");
  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(removeButton).toBeDefined();
});

test("When like-buton is pressed two times, event handler is called two times", async () => {
  const blog = {
    title: "Testi blogi",
    author: "Erkki Esimerkki",
    likes: 3,
    url: "testiblogi.fi",
    user: {
      username: "Testi123",
      name: "test user",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={"test user"} addLikes={mockHandler} />);

  const user = userEvent.setup();
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
