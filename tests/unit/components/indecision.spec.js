import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component', () => {
    let wrapper,
        clgSpy

    // Fetch API mock
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision)
        clgSpy = jest.spyOn(console, 'log')
    })

    // SNAPSHOT
    it('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test("Type into the input mustn't trigger 'getAnswer' - (console.log)", async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('Hello World')

        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()
    })

    test("Type the question mark should trigger 'getAnswer'", async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('Is it called?')

        expect(getAnswerSpy).toHaveBeenCalled()
    })

    test("Tests in getAnswer()", async () => {
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif")
        expect(wrapper.vm.answer).toBe('YES')
    })

    test("Tests in getAnswer() - API fail", async () => {

        fetch.mockImplementationOnce(() => Promise.reject('API is down'))
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe("API couldn't be loaded")
    })
})