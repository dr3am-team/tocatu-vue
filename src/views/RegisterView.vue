<template>
    <div>
        <label for="account-type">Choose your fighter:</label>
        <select id="account-type" v-model="typeSelected" @click="select"> 
                <option selected disable hidden>Choose your fighter</option>
                <option v-for="type in accountType" :key="type.value" :value="type.value">{{ type.label }}</option>

        </select>

        <div v-if="typeSelected == 'band'">
            <label for="bandName">Name of your band <input type="text" v-model="band.name"></label>
            <label for="style">Style of your band <input type="text" v-model="band.style"></label>
        </div>

        <div v-if="typeSelected == 'bar'">
             <label for="barName">Name of your bar <input type="text" v-model="bar.name"></label>
            <label for="style"> Location of your bar <input type="text" v-model="bar.location"></label>
        </div>
        <button @click="register">Register</button>
    </div>
</template>

<script>
export default {
    components: {},
    setup() {

    },
    data() {
        return {
            accountType: [{ label: 'Band', value: 'band' }, { label: 'Bar', value: 'bar' }],
            typeSelected: '',
            band: {name: '', style: ''},
            bar: {name: '', location: ''}
        }
    },
    methods: {
        register() {
            //TODO
        },
        select(e) {
            this.typeSelected = e.target.value
        }
    }
}
</script>
  
<style></style>
  