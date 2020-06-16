<template>
    <div class="input-group color-picker" ref="colorpicker">
    <input type="text" class="form-control" v-model="colorValue" @focus="showPicker()" @input="updateFromInput" />
        <span class="input-group-addon color-picker-container">
      <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"/>
            <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker" />
        </span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
h1 {
	height: 120px;
	line-height: 120px;
	text-align: center;
}
.vc-chrome {
	position: absolute;
	top: 35px;
	right: 0;
	z-index: 9;
}
.current-color {
	display: inline-block;
	width: 16px;
	height: 16px;
	background-color: #000;
	cursor: pointer;
}
.footer {
	margin-top: 20px;
	text-align: center;
}
</style>