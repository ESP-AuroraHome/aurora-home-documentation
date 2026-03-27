import { ArrowRight, Code, FileCode } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type TreeItem, TreeView } from "@/components/TreeView";

function CodeBlock({ children, title }: { children: string; title?: string }) {
	return (
		<div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
			{title && (
				<div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-neutral-400">
					{title}
				</div>
			)}
			<pre className="p-4 overflow-x-auto">
				<code className="text-sm text-neutral-300">{children}</code>
			</pre>
		</div>
	);
}

const marketingTree: TreeItem[] = [
	{
		name: "aurora-home-marketing",
		type: "folder",
		children: [
			{
				name: "assets",
				type: "folder",
				children: [
					{
						name: "css",
						type: "folder",
						comment: "Tailwind v4 + layers glass-panel, glass-button",
						children: [
							{
								name: "main.css",
								type: "file",
								comment: "@layer base / components / utilities",
							},
						],
					},
				],
			},
			{
				name: "components",
				type: "folder",
				children: [
					{
						name: "TheHeader.vue",
						type: "file",
						comment: "Navigation sticky + badge panier",
					},
					{ name: "TheFooter.vue", type: "file", comment: "Copyright + liens" },
					{
						name: "LiquidGlass.vue",
						type: "file",
						comment: "Wrapper glass-morphism",
					},
					{
						name: "Product3DViewer.client.vue",
						type: "file",
						comment: "Viewer Three.js (client-only)",
					},
				],
			},
			{
				name: "pages",
				type: "folder",
				comment: "Routing fichier automatique Nuxt",
				children: [
					{
						name: "index.vue",
						type: "file",
						comment: "Accueil — hero + parallax souris",
					},
					{
						name: "product.vue",
						type: "file",
						comment: "Fiche produit + 3D viewer + AR",
					},
					{
						name: "cart.vue",
						type: "file",
						comment: "Tunnel d'achat multi-étapes",
					},
					{
						name: "about.vue",
						type: "file",
						comment: "À propos + mentions légales",
					},
					{
						name: "confirmation.vue",
						type: "file",
						comment: "Succès de commande",
					},
					{
						name: "admin.vue",
						type: "file",
						comment: "Dashboard admin — lazy-loaded",
					},
					{
						name: "docs.vue",
						type: "file",
						comment: "Redirection vers la documentation",
					},
				],
			},
			{
				name: "server",
				type: "folder",
				children: [
					{
						name: "api",
						type: "folder",
						children: [
							{
								name: "products",
								type: "folder",
								children: [
									{
										name: "index.get.ts",
										type: "file",
										comment: "Lister les produits",
									},
									{
										name: "[id].put.ts",
										type: "file",
										comment: "Mettre à jour le stock",
									},
								],
							},
							{
								name: "orders",
								type: "folder",
								children: [
									{
										name: "index.get.ts",
										type: "file",
										comment: "Lister les commandes",
									},
									{
										name: "confirm.post.ts",
										type: "file",
										comment: "Créer une commande — atomique",
									},
								],
							},
							{
								name: "payments",
								type: "folder",
								children: [
									{
										name: "create-intent.post.ts",
										type: "file",
										comment: "Créer un PaymentIntent Stripe",
									},
								],
							},
						],
					},
					{
						name: "db",
						type: "folder",
						children: [
							{
								name: "index.ts",
								type: "file",
								comment: "Singleton SQLite + schéma + seed",
							},
						],
					},
				],
			},
			{
				name: "shared",
				type: "folder",
				children: [
					{
						name: "types",
						type: "folder",
						children: [
							{
								name: "index.ts",
								type: "file",
								comment: "Product, CartItem, Order, CheckoutForm...",
							},
						],
					},
				],
			},
			{
				name: "stores",
				type: "folder",
				children: [
					{
						name: "cart.ts",
						type: "file",
						comment: "Pinia — panier persisté localStorage",
					},
				],
			},
			{
				name: "app.vue",
				type: "file",
				comment: "Racine Nuxt + TheHeader / TheFooter",
			},
			{
				name: "nuxt.config.ts",
				type: "file",
				comment: "Config Nuxt 4 + Pinia + Tailwind + Stripe",
			},
		],
	},
];

export default async function DocsMarketing() {
	const t = await getTranslations("marketing");

	return (
		<div>
			<div className="mb-12">
				<div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
					<span>{t("breadcrumbDocs")}</span>
					<ArrowRight className="hidden sm:block w-3 h-3" />
					<span className="hidden sm:inline">{t("breadcrumbSection")}</span>
					<ArrowRight className="w-3 h-3" />
					<span className="text-white">{t("breadcrumbCurrent")}</span>
				</div>
				<h1 className="text-2xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
				<p className="text-base sm:text-xl text-neutral-400 leading-relaxed">
					{t("description")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">
						aurora-home-marketing
					</code>
					.
				</p>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("stackTitle")}</h2>
				<div className="grid gap-3">
					{[
						{ name: "Nuxt 4", descKey: "nuxt4Desc" },
						{ name: "Vue 3", descKey: "vue3Desc" },
						{ name: "TypeScript 5", descKey: "ts5Desc" },
						{ name: "Tailwind CSS v4", descKey: "tailwindDesc" },
						{ name: "Three.js", descKey: "threejsDesc" },
						{ name: "Pinia", descKey: "piniaDesc" },
						{ name: "Stripe", descKey: "stripeDesc" },
						{ name: "Chart.js + vue-chartjs", descKey: "chartjsDesc" },
						{ name: "better-sqlite3", descKey: "sqliteDesc" },
						{ name: "Phosphor Icons", descKey: "phosphorDesc" },
						{ name: "ESLint + Husky", descKey: "eslintDesc" },
					].map(({ name, descKey }) => (
						<div
							key={name}
							className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5"
						>
							<code className="text-sm text-green-400 min-w-[180px]">
								{name}
							</code>
							<span className="text-sm text-neutral-500">{t(descKey)}</span>
						</div>
					))}
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("folderStructureTitle")}</h2>
				<TreeView items={marketingTree} title="aurora-home-marketing/" />
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("namingTitle")}</h2>
				<div className="grid gap-4">
					{[
						{
							icon: FileCode,
							color: "blue",
							titleKey: "filesTitle",
							rule: "kebab-case + method suffix",
							examples: [
								"cart.ts",
								"main.css",
								"index.get.ts",
								"confirm.post.ts",
								"[id].put.ts",
							],
						},
						{
							icon: Code,
							color: "purple",
							titleKey: "componentsTitle",
							rule: "PascalCase",
							examples: [
								"TheHeader.vue",
								"TheFooter.vue",
								"LiquidGlass.vue",
								"Product3DViewer.client.vue",
							],
						},
						{
							icon: Code,
							color: "green",
							titleKey: "storesTitle",
							rule: "use* camelCase",
							examples: [
								"useCartStore",
								"useRouter()",
								"useRuntimeConfig()",
								"addItem()",
								"isProcessing",
							],
						},
					].map((item) => (
						<div
							key={item.titleKey}
							className="p-5 rounded-xl border border-white/10 bg-white/[0.02]"
						>
							<div className="flex items-center gap-3 mb-3">
								<div className={`p-2 rounded-lg bg-${item.color}-500/10`}>
									<item.icon className={`w-4 h-4 text-${item.color}-400`} />
								</div>
								<div>
									<span className="font-medium">{t(item.titleKey)}</span>
									<code
										className={`ml-2 text-xs px-2 py-0.5 rounded bg-${item.color}-500/10 text-${item.color}-400`}
									>
										{item.rule}
									</code>
								</div>
							</div>
							<div className="flex gap-2 flex-wrap">
								{item.examples.map((ex) => (
									<code
										key={ex}
										className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400"
									>
										{ex}
									</code>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("clientOnlyTitle")}</h2>
				<p className="text-neutral-400 mb-4">
					{t("clientOnlyDesc")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-purple-400">
						.client.vue
					</code>
					{t("clientOnlyDesc2")}
				</p>
				<CodeBlock title="components/Product3DViewer.client.vue">{`// Suffixe .client.vue → Nuxt exclut ce composant du SSR
// Nécessaire car Three.js accède à window, document et WebGL

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

const loader = new OBJLoader()
loader.load('/models/model.obj', (obj) => scene.add(obj))

// Export GLTF pour la réalité augmentée (model-viewer)
const exporter = new GLTFExporter()
exporter.parse(scene, (gltf) => {
  const blob = new Blob([gltf as ArrayBuffer], { type: 'model/gltf-binary' })
  arUrl.value = URL.createObjectURL(blob)
}, { binary: true })`}</CodeBlock>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("piniaTitle")}</h2>
				<p className="text-neutral-400 mb-4">{t("piniaDesc2")}</p>
				<CodeBlock title="stores/cart.ts">{`export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
  )
  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  function hydrate() {
    if (!import.meta.client) return   // Guard SSR
    const saved = localStorage.getItem('aurora-cart')
    if (saved) items.value = JSON.parse(saved)
  }

  function persist() {
    localStorage.setItem('aurora-cart', JSON.stringify(items.value))
  }

  function addItem(product: Product) {
    const existing = items.value.find(i => i.id === product.id)
    existing ? existing.quantity++ : items.value.push({ ...product, quantity: 1 })
    persist()
  }

  return { items, total, count, hydrate, addItem, decreaseItem, removeItem, clear }
})`}</CodeBlock>
				<p className="text-sm text-neutral-500 mt-3">
					{t("piniaNote")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded">
						import.meta.client
					</code>{" "}
					{t("piniaNote2")}
				</p>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("apiTitle")}</h2>
				<p className="text-neutral-400 mb-4">{t("apiDesc")}</p>
				<CodeBlock title="server/api/orders/confirm.post.ts">{`export default defineEventHandler(async (event) => {
  const body = await readBody<ConfirmOrderBody>(event)

  // Transaction atomique : création commande + décrément stock
  return db.transaction(() => {
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO orders (total, delivery_type) VALUES (?, ?)'
    ).run(body.total, body.deliveryType)

    for (const item of body.items) {
      db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?')
        .run(item.quantity, item.id)
      db.prepare(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
      ).run(lastInsertRowid, item.id, item.quantity, item.price)
    }

    return { success: true } satisfies SuccessResponse
  })()
})`}</CodeBlock>
				<p className="text-sm text-neutral-500 mt-3">{t("apiNote")}</p>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("checkoutTitle")}</h2>
				<p className="text-neutral-400 mb-4">
					{t("checkoutDesc")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">
						CheckoutStep
					</code>
					.
				</p>
				<CodeBlock title="pages/cart.vue">{`type CheckoutStep = 'cart' | 'delivery' | 'checkout' | 'payment'

const step = ref<CheckoutStep>('cart')

// Navigation linéaire :
// cart → delivery → checkout → payment
//   ↑           ↑           ↑         ↑
// Panier   Livraison    Adresse    Stripe`}</CodeBlock>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("setupTitle")}</h2>
				<CodeBlock title="aurora-home-marketing">{`npm install
npm run dev     # http://localhost:3000
npm run build`}</CodeBlock>
			</div>

			<p className="text-sm text-neutral-500">
				{t("liveSiteLabel")}{" "}
				<a
					href="https://aurora-home-marketing.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:text-blue-300 transition-colors"
				>
					aurora-home-marketing.vercel.app
				</a>
			</p>
		</div>
	);
}
