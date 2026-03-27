import { File, FileCode, FileJson, Folder } from "lucide-react";

export type TreeItem = {
	name: string;
	type: "file" | "folder";
	comment?: string;
	children?: TreeItem[];
};

function getFileIcon(name: string) {
	const ext = name.split(".").pop()?.toLowerCase();
	if (["ts", "tsx", "js", "jsx", "cpp", "ino", "c", "h"].includes(ext ?? ""))
		return <FileCode className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
	if (["json", "ini", "toml", "yaml", "yml", "env"].includes(ext ?? ""))
		return <FileJson className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />;
	return <File className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />;
}

/**
 * Recursive node renderer for a single file or folder in the tree, indented by depth.
 *
 * @param item - The file or folder data to render
 * @param depth - Current nesting level, used to calculate left indentation
 */
function TreeNode({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
	return (
		<div>
			<div
				className="flex items-center gap-2 py-0.5 group"
				style={{ paddingLeft: depth * 20 }}
			>
				{item.type === "folder" ? (
					<Folder className="w-3.5 h-3.5 text-yellow-500/80 flex-shrink-0" />
				) : (
					getFileIcon(item.name)
				)}
				<span
					className={`text-sm font-mono ${
						item.type === "folder"
							? "text-neutral-200 font-medium"
							: "text-neutral-400"
					}`}
				>
					{item.name}
					{item.type === "folder" && item.children && item.children.length > 0
						? "/"
						: ""}
				</span>
				{item.comment && (
					<span className="text-xs text-neutral-600 ml-1">
						# {item.comment}
					</span>
				)}
			</div>
			{item.children && item.children.length > 0 && (
				<div>
					{item.children.map((child) => (
						<TreeNode key={child.name} item={child} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);
}

/**
 * File and folder tree visualization component with optional title bar.
 *
 * @param items - Top-level tree items to render (may contain nested children)
 * @param title - Optional label displayed above the tree in a header bar
 */
export function TreeView({
	items,
	title,
}: {
	items: TreeItem[];
	title?: string;
}) {
	return (
		<div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
			{title && (
				<div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-neutral-400">
					{title}
				</div>
			)}
			<div className="p-4 overflow-x-auto">
				{items.map((item) => (
					<TreeNode key={item.name} item={item} />
				))}
			</div>
		</div>
	);
}
