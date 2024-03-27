import type { ComponentType } from "svelte";
import { Cog, Search, type Icon, AreaChart, Bot, LayoutDashboard, WalletCards, ArrowRightLeft, HandCoins, PiggyBank } from "lucide-svelte";

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
	path: string
};

export const primaryRoutes: Route[] = [
	{
		title: "Dashboard",
		label: "",
		icon: LayoutDashboard,
		variant: "default",
		path: "",
	},
	{
		title: "Accounts",
		label: "9",
		icon: WalletCards,
		variant: "ghost",
		path: "/accounts",
	},
	{
		title: "Transactions",
		label: "",
		icon: ArrowRightLeft,
		variant: "ghost",
		path: "/transactions",
	},
	{
		title: "Budgets",
		label: "23",
		icon: HandCoins,
		variant: "ghost",
		path: "/budgets",
	},
	{
		title: "Savings",
		label: "",
		icon: PiggyBank,
		variant: "ghost",
		path: "/savings",
	}
];

export const secondaryRoutes: Route[] = [
	{
		title: "Analytics",
		label: "",
		icon: AreaChart,
		variant: "ghost",
		path: "/analytics",
	},
	{
		title: "AI",
		label: "",
		icon: Bot,
		variant: "ghost",
		path: "/ai",
	}
];

export const servicesRoutes: Route[] = [
	{
		title: "Search",
		label: "",
		icon: Search,
		variant: "ghost",
		path: "/search",
	},
	{
		title: "Settings",
		label: "",
		icon: Cog,
		variant: "ghost",
		path: "/settings",
	}
];