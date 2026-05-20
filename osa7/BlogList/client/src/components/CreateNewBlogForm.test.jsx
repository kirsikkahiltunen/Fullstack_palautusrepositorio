import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateNewBlogForm from "./CreateNewBlogForm";
import { expect, test, vi } from "vitest";

test("CreateNewBlogForm updates parent with right information when creating a new blog", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<CreateNewBlogForm addNewBlog={createBlog} />);

  const titleInput = screen.getByLabelText("title");
  const authorInput = screen.getByLabelText("author");
  const urlInput = screen.getByLabelText("url");
  const createButton = screen.getByText("create");

  await user.type(titleInput, "blog title");
  await user.type(authorInput, "blog author");
  await user.type(urlInput, "testblog.fi");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("blog title");
  expect(createBlog.mock.calls[0][0].author).toBe("blog author");
  expect(createBlog.mock.calls[0][0].url).toBe("testblog.fi");
});
