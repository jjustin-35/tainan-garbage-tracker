<script>
	import SearchBar from '$components/SearchBar/index.svelte';
	import Tabs from '$components/Tabs/index.svelte';
	import Cards from '$components/Cards/index.svelte';
	import BottomNavigation from '$components/Navbar/index.svelte';

	let stops = [
		{ stopName: 'Xiaodong Rd', arrivalTime: 15 },
		{ stopName: 'Zhonghua Rd', arrivalTime: 20 },
		{ stopName: 'Xiaozhong Rd', arrivalTime: 25 },
		{ stopName: 'Zhongdong Rd', arrivalTime: 30 },
		{ stopName: 'Dongzhong Rd', arrivalTime: 35 }
	];
</script>

<div class="mx-auto min-h-screen max-w-sm bg-gray-100 pb-24">
	<!-- Search Bar -->
	<SearchBar />

	<!-- Tab Navigation -->
	<Tabs activeTab="Trash" />

	<!-- Garbage Stops List -->
	<div class="p-4">
		{#each stops as stop}
			<Cards stopName={stop.stopName} arrivalTime={stop.arrivalTime} />
		{/each}
	</div>

	<!-- Bottom Navigation -->
	<BottomNavigation />
</div>
