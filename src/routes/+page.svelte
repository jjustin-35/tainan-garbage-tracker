<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import type { CleaningPoint } from '$constants/types';
	import { Button } from '$lib/shadcn/components/ui/button';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	
	// just like react state
	let map: google.maps.Map;
	let currentPosition: google.maps.LatLng;
	let cleaningPoints: CleaningPoint[] = [];
	let selectedPoint: CleaningPoint | null = null;
	let isDrawerOpen = false;
	
	onMount(async () => {
		const loader = new Loader({
			apiKey: '您的Google Maps API密鑰',
			version: 'weekly',
		});
	
		await loader.load();
		initMap();
		fetchCleaningPoints();
	});
	
	async function initMap() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					currentPosition = new google.maps.LatLng(
						position.coords.latitude,
						position.coords.longitude
					);
					map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
						center: currentPosition,
						zoom: 15,
					});
					new google.maps.marker.AdvancedMarkerElement({
						position: currentPosition,
						map: map,
						title: '當前位置',
					});
				},
				() => {
					console.error('無法獲取位置');
				}
			);
		}
	}
	
	async function fetchCleaningPoints() {
		const response = await fetch('https://data.tainan.gov.tw/api/3/action/datastore_search_sql?sql=SELECT * FROM "ae3a8531-2ee2-48fb-bb97-05e34d39a7ab"');
		const data = await response.json();
		cleaningPoints = data.result.records.map((record: any) => ({
			id: record.序號,
			title: record.清運點名稱,
			address: record.地址,
			lat: parseFloat(record.緯度),
			lng: parseFloat(record.經度),
			weeklySchedule: record.每週清運日,
			recyclingSchedule: record.每週回收日,
			time: record.清運時間,
		}));
		displayNearbyPoints();
	}
	
	function displayNearbyPoints() {
		cleaningPoints.forEach((point) => {
			const marker = new google.maps.Marker({
				position: { lat: point.lat, lng: point.lng },
				map: map,
				title: point.title,
			});
			marker.addListener('click', () => selectPoint(point));
		});
	}
	
	function selectPoint(point: CleaningPoint) {
		selectedPoint = point;
		map.setCenter({ lat: point.lat, lng: point.lng });
		isDrawerOpen = true;
	}
	
	function openGoogleMapsDirections() {
		if (selectedPoint) {
			const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`;
			window.open(url, '_blank');
		}
	}
	</script>
	
	<svelte:head>
		<title>台南市垃圾車追蹤</title>
	</svelte:head>
	
	<div class="h-screen flex flex-col">
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
						<Button on:click={openGoogleMapsDirections}>導航到此處</Button>
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