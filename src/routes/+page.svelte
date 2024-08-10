<script lang="ts">
	import { onMount } from 'svelte';
	import type { CleaningPoint } from '$constants/types';
	import initMap from '$apis/initMap';
	import getClearPoint from '$apis/getClearPoint';
	import { Button } from '$lib/shadcn/components/ui/button';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';

	let googleMaps: Awaited<ReturnType<typeof initMap>> | null = null;
	let cleaningPoints: CleaningPoint[] = [];
	let selectedPoint: CleaningPoint | null = null;
	let isDrawerOpen = false;

	onMount(async () => {
		try {
			googleMaps = await initMap();
			cleaningPoints = await getClearPoint();
			if (!googleMaps || !cleaningPoints) throw new Error('Map or cleaning points not found');
			displayNearbyPoints();
		} catch (error) {
			console.log(error);
		}
	});

	const displayNearbyPoints = () => {
		cleaningPoints.forEach((point) => {
			const marker = googleMaps?.setMarkers({
				position: { lat: point.lat, lng: point.lng },
				title: point.title
			});
			marker.addListener('click', () => selectPoint(point));
		});
	}

	const selectPoint = (point: CleaningPoint) => {
		selectedPoint = point;
		googleMaps?.map.setCenter({ lat: point.lat, lng: point.lng });
		isDrawerOpen = true;
	}
</script>

<svelte:head>
	<title>台南市垃圾車追蹤</title>
</svelte:head>

<div class="flex h-screen flex-col">
	<div id="map" class="flex-grow"></div>
	<Drawer.Root bind:open={isDrawerOpen}>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} class="w-full">清運點列表</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>附近清運點</Drawer.Title>
			</Drawer.Header>
			<div class="p-4">
				{#if selectedPoint}
					<h2>{selectedPoint.title}</h2>
					<p>地址：{selectedPoint.address}</p>
					<p>每週清運日：{selectedPoint.weeklySchedule}</p>
					<p>每週回收日：{selectedPoint.recyclingSchedule}</p>
					<p>清運時間：{selectedPoint.time}</p>
					<Button href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.lat}%2C${selectedPoint.lng}`} target="_blank">導航到此處</Button>
				{:else}
					<ul>
						{#each cleaningPoints as point}
							<li>
								<Button variant="ghost" on:click={() => selectPoint(point)}>
									{point.title} - {point.weeklySchedule}
								</Button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
