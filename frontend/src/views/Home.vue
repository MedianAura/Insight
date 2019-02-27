<template>
	<div class="home">
		<div class="card border-dotted">
			<div class="card-body">
				<h3>Given</h3>
				<div class="form-group">
					<label for="exampleFormControlTextarea1">Example textarea</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
			</div>
		</div>
		
		
		<div class="card border-dotted">
			<div class="card-body">
				<font-awesome-icon icon="plus" />
				Ajouter un critère
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
    }
</script>

<style lang="less" scoped>
	.border-dotted {
		border-style: dashed;
	}
</style>
