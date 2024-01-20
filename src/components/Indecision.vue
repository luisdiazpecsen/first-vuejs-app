<template>
    <img v-if="img" :src="img" alt="bg" />
    <div class="bg-dark"></div>

    <div class="indecision-container">
        <input v-model="question" type="text" placeholder="Ask me something" />
        <p>Remember using the question mark (?)</p>

        <div v-if="isValidQuestion">
            <h2>{{ question }}</h2>
            <h1>{{ answer }}</h1>
        </div>
    </div>
</template>

<script>
// import axios from "axios"

const ANSWERS = {
    yes: "YES",
    no: "NO",
    maybe: "MAYBE",
    idk: "I DON'T KNOW",
}

export default {
    data: function () {
        return {
            answer: null,
            img: null,
            isValidQuestion: false,
            question: null,
        }
    },
    methods: {
        async getAnswer() {
            try {
                this.answer = "Thinking..."

                // FETCH
                const { answer, image } = await fetch(
                    "https://yesno.wtf/api"
                ).then((r) => r.json())

                // AXIOS
                // const { data } = await axios.get("https://yesno.wtf/api"),
                //     { answer, image } = data

                this.answer = ANSWERS[answer] || ANSWERS.idk
                this.img = image
            } catch (error) {
                console.log("IndecisionComponent: ", error)
                this.answer = "API couldn't be loaded"
                this.img = null
            }
        },
    },
    watch: {
        question: function (value, oldValue) {
            this.isValidQuestion = false
            console.log({ value })

            if (!value.includes("?")) return

            this.isValidQuestion = true
            this.getAnswer()
        },
    },
}
</script>

<style>
img,
.bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
}

.bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
    position: relative;
    z-index: 99;
}

input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
}
input:focus {
    outline: none;
}

p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
}

h1,
h2 {
    color: white;
}

h2 {
    margin-top: 150px;
}

img {
    height: 100vh;
    left: 0;
    object-fit: cover;
    position: fixed;
    top: 0;
    width: 100vw;
}
</style>