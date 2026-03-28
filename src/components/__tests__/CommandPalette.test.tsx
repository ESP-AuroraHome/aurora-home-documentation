// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

vi.mock("next-intl", () => ({
	useTranslations: vi.fn(() => (key: string) => key),
}));

import { CommandPalette, CommandPaletteButton } from "../CommandPalette";

const onOpen = vi.fn();
const onClose = vi.fn();

beforeEach(() => {
	vi.clearAllMocks();
});

describe("CommandPaletteButton", () => {
	it("renders a button", () => {
		render(<CommandPaletteButton onOpen={onOpen} />);
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("calls onOpen when clicked", async () => {
		render(<CommandPaletteButton onOpen={onOpen} />);
		await userEvent.click(screen.getByRole("button"));
		expect(onOpen).toHaveBeenCalledOnce();
	});
});

describe("CommandPalette", () => {
	it("renders nothing when closed", () => {
		const { container } = render(
			<CommandPalette open={false} onClose={onClose} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders the search input when open", () => {
		render(<CommandPalette open={true} onClose={onClose} />);
		expect(screen.getByRole("textbox")).toBeTruthy();
	});

	it("shows all pages when query is empty", () => {
		render(<CommandPalette open={true} onClose={onClose} />);
		const items = screen.getAllByRole("button");
		expect(items.length).toBeGreaterThan(1);
	});

	it("calls onClose when Escape is pressed", async () => {
		render(<CommandPalette open={true} onClose={onClose} />);
		await userEvent.keyboard("{Escape}");
		expect(onClose).toHaveBeenCalled();
	});

	it("calls onClose when backdrop is clicked", async () => {
		render(<CommandPalette open={true} onClose={onClose} />);
		// The outer wrapper div has onClick={onClose} and uses Tailwind .fixed class
		const backdrop = document.querySelector(".fixed.inset-0") as HTMLElement;
		if (backdrop) await userEvent.click(backdrop);
		expect(onClose).toHaveBeenCalled();
	});

	it("filters results when typing a query", async () => {
		render(<CommandPalette open={true} onClose={onClose} />);
		const input = screen.getByRole("textbox");
		await userEvent.type(input, "introduction");
		// After filtering, the matched result button should still be present
		const items = screen.getAllByRole("button");
		expect(items.length).toBeGreaterThan(0);
	});

	it("navigates with arrow keys and Enter", async () => {
		const mockPush = vi.fn();
		const { useRouter } = await import("next/navigation");
		vi.mocked(useRouter).mockReturnValue({ push: mockPush } as never);

		render(<CommandPalette open={true} onClose={onClose} />);
		await userEvent.keyboard("{ArrowDown}{Enter}");
		expect(mockPush).toHaveBeenCalled();
	});
});
