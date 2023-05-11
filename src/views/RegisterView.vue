<template>
    <div>
        <label for="account-type">Choose your fighter:</label>
        <select id="account-type">
            <optgroup>
                <option v-for="type in accountType" :key="type.value" :value= "type.value">{{ type.label }}</option>
            </optgroup>

        </select>

        <button @click="login">Login</button>


    </div>
</template>
  
<script>


export default {
    components: {  },
    setup() {

    },
    data() {
        return {
            accountType: [ {label: 'Band', value: 'band' }, {label: 'Bar', value: 'bar' }]
        }
    },
    methods: {
        register() {

        }
    }
}
</script>
  
<style></style>
  