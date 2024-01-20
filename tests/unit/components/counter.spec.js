import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    // SNAPSHOT
    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })


    // HTML TAG
    test("should have 'Counter' as the h2's default value", () => {
        expect(wrapper.find('h2').exists()).toBeTruthy()

        const hValue = wrapper.find('h2').text()
        expect(hValue).toBe('Counter')
    })


    // FINDALL
    test("should have 1 as the p's default value", () => {
        // const  pTags = wrapper.findAll('p')
        // expect(pTags[1]).not.toBeUndefined()

        // const value = pTags[1].text
        // expect(value).toBe('1')

        const pTag = wrapper.find('[data-testid="counter"]')
        expect(pTag.exists()).toBeTruthy()

        const value = pTag.text()
        expect(value).toBe('1')
    })


    // SIMULATE EVENTS
    test("should increase and decrease the counter's value", async () => {
        // const increaseBtn = wrapper.find('[data-testid="increase"]'),
        //     decreaseBtn = wrapper.find('[data-testid="decrease"]')

        const [decreaseBtn, increaseBtn] = wrapper.findAll('button')

        expect(increaseBtn.exists()).toBeTruthy()
        expect(decreaseBtn.exists()).toBeTruthy()

        // Click the increase button
        await increaseBtn.trigger('click')
        // Click the decrease button
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('0')
    })


    // PROPERTIES
    test('should set the default value', () => {
        const start = wrapper.props('start'),
            value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe(start.toString())
        expect(Number(value)).toBe(start)
    })


    // SEND PROPERTIES
    test('should show the title property', () => {
        const title = 'Hola mundo'
        const wrapper = shallowMount(Counter, {
            props: {
                counterTitle: title
            }
        })
        expect(wrapper.find('h2').text()).toBe(title)
    })
})