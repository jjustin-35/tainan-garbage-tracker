<script lang="ts">
	export let stopName: string;
	export let arrivalTime: number;
</script>

<div class="mb-4 flex justify-between rounded-lg bg-white p-4 shadow-sm">
	<div>
		<div class="font-bold text-gray-800">{stopName}</div>
		<div class="text-sm text-gray-600">Today's Garbage: Trash</div>
	</div>
	<div class="text-lg font-bold text-yellow-400">{arrivalTime} min</div>
</div>
