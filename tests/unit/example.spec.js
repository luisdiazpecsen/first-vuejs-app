
describe('Example Component', () => {

    // it() or test()

    test('should be greater than 10', () => {

        // arrange
        let value = 9

        // act
        value += 2

        // assert
        expect(value).toBeGreaterThan(10)

    })
})