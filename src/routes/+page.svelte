<script lang="ts">
	import { onMount } from 'svelte';
	import type { CleaningPoint } from '$constants/types';
	import { CleaningPointField } from '$constants/types';
	import initMap from '$apis/initMap';
	import getClearPoint from '$apis/getClearPoint';
	import { Button } from '$lib/shadcn/components/ui/button';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';

	let googleMaps: Awaited<ReturnType<typeof initMap>> | null = null;
	let cleaningPoints: CleaningPoint[] = [];
	let selectedPoint: CleaningPoint | null = null;
	let isDrawerOpen = false;

	const { POINT_NAME, AREA, WORK_DAY, RECYCLE_DAY, TIME, LATITUDE, LONGITUDE } = CleaningPointField;

	onMount(async () => {
		try {
			if (!googleMaps) googleMaps = await initMap();
			if (!cleaningPoints?.length) {
				const cleanPointData = await getClearPoint({
					// boundingSearch: {
					// 	lat: googleMaps.currentLocation.latitude,
					// 	lon: googleMaps.currentLocation.longitude,
					// 	distance: 1 //km
					// }
					queries: {
						[CleaningPointField.AREA]: '永康區'
					}
				});
				cleaningPoints = cleanPointData?.records;
			}
			if (!googleMaps || !cleaningPoints) throw new Error('Map or cleaning points not found');
			displayNearbyPoints();
		} catch (error) {
			console.log(error);
		}
	});

	const displayNearbyPoints = () => {
		cleaningPoints.forEach((point) => {
			const marker = googleMaps?.setMarkers({
				position: {
					lat: Number(point[LATITUDE]),
					lng: Number(point[LONGITUDE])
				},
				title: point[POINT_NAME]
			});
			marker?.addListener('click', () => selectPoint(point));
		});
	};

	const selectPoint = (point: CleaningPoint) => {
		selectedPoint = point;
		googleMaps?.map.setCenter({ lat: point[LATITUDE], lng: point[LONGITUDE] });
		isDrawerOpen = true;
	};
</script>

<svelte:head>
	<title>台南市垃圾車追蹤</title>
</svelte:head>

<div class="flex h-screen flex-col">
	<div id="map" class="flex-grow"></div>
	<Drawer.Root bind:open={isDrawerOpen}>
		<Drawer.Trigger>
			<Button class="w-full" variant="outline">清運點列表</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>附近清運點</Drawer.Title>
			</Drawer.Header>
			<div class="max-h-[400px] overflow-scroll p-4">
				{#if selectedPoint}
					<h2>{selectedPoint[POINT_NAME]}</h2>
					<p>地址：{selectedPoint[AREA]}</p>
					<p>每週清運日：{selectedPoint[WORK_DAY]}</p>
					<p>每週回收日：{selectedPoint[RECYCLE_DAY]}</p>
					<p>清運時間：{selectedPoint[TIME]}</p>
					<Button
						href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint[LATITUDE]}%2C${selectedPoint[LONGITUDE]}`}
						target="_blank">導航到此處</Button
					>
				{:else}
					<ul>
						{#each cleaningPoints as point}
							<li>
								<Button variant="ghost" on:click={() => selectPoint(point)}>
									{point[POINT_NAME]} - {point[WORK_DAY]}
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
