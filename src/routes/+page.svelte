<script lang="ts">
	import SearchBar from '$components/SearchBar/index.svelte';
	import Tabs from '$components/Tabs/index.svelte';
	import Cards from '$components/Cards/index.svelte';
	import BottomNavigation from '$components/Navbar/index.svelte';

	const tabs = ['Recommend', 'Favorite', 'Trash', 'Recycle'];

	let activeTab = tabs[0];

	let stops = [
		{ stopName: 'Xiaodong Rd', arrivalTime: 15 },
		{ stopName: 'Zhonghua Rd', arrivalTime: 20 },
		{ stopName: 'Xiaozhong Rd', arrivalTime: 25 },
		{ stopName: 'Zhongdong Rd', arrivalTime: 30 },
		{ stopName: 'Dongzhong Rd', arrivalTime: 35 }
	];

	const onSearch = (value: string) => {
		console.log(value);
	};

	const onTabChange = (tab: string) => {
		activeTab = tab;
	};
</script>

<div class="mx-auto min-h-screen max-w-sm bg-gray-100 pb-24">
	<div class="sticky top-0 bg-yellow-400">
		<SearchBar {onSearch} />
		<Tabs {activeTab} {tabs} {onTabChange} />
	</div>

	<div class="p-4">
		{#if activeTab === 'Recommend'}
			<p class="text-md mb-4 font-bold">最近清運點</p>
		{/if}
		{#each stops as stop}
			<Cards stopName={stop.stopName} arrivalTime={stop.arrivalTime} />
		{/each}
	</div>

	<BottomNavigation />
</div>
