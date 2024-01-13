<template>
    <h1>{{ customTitle }}</h1>
    <p>{{ counter }}<sup>2</sup> = {{ counter * counter }}</p>

    <div>
        <button @click="decrease">-1</button>
        <button @click="increase">+1</button>
    </div>
</template>

<script>
export default {
    name: "Counter",
    // props: ["counter-title", "start"],
    props: {
        counterTitle: String,
        start: {
            type: Number,
            required: false,
            default: 1,
            validator: function (value) {
                return value > 0
            },
        },
    },
    data() {
        return {
            counter: this.start,
        }
    },
    methods: {
        getSquareValue() {
            return this.counter * this.counter
        },
        increase() {
            this.counter++
        },
        decrease() {
            this.counter--
        },
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        customTitle() {
            return this.counterTitle || "Counter"
        },
    },
}
</script>

<style>
button {
    background-color: #64bb87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}
</style>