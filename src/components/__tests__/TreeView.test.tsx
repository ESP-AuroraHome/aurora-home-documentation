// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { type TreeItem, TreeView } from "../TreeView";

const items: TreeItem[] = [
	{
		name: "src",
		type: "folder",
		children: [
			{ name: "index.ts", type: "file" },
			{ name: "config.json", type: "file", comment: "main config" },
		],
	},
	{ name: "README.md", type: "file" },
];

describe("TreeView", () => {
	it("renders all item names", () => {
		render(<TreeView items={items} />);
		expect(screen.getByText(/src/)).toBeTruthy();
		expect(screen.getByText("index.ts")).toBeTruthy();
		expect(screen.getByText("config.json")).toBeTruthy();
		expect(screen.getByText("README.md")).toBeTruthy();
	});

	it("renders the title when provided", () => {
		render(<TreeView items={items} title="Project structure" />);
		expect(screen.getByText("Project structure")).toBeTruthy();
	});

	it("does not render a title bar when title is omitted", () => {
		render(<TreeView items={items} />);
		expect(screen.queryByText("Project structure")).toBeNull();
	});

	it("renders a comment next to the file", () => {
		render(<TreeView items={items} />);
		expect(screen.getByText(/main config/)).toBeTruthy();
	});

	it("appends / to folder names", () => {
		render(<TreeView items={items} />);
		expect(screen.getByText("src/")).toBeTruthy();
	});

	it("renders an empty tree without crashing", () => {
		render(<TreeView items={[]} />);
	});

	it("renders a file without children without crashing", () => {
		render(<TreeView items={[{ name: "solo.ts", type: "file" }]} />);
		expect(screen.getByText("solo.ts")).toBeTruthy();
	});
});
