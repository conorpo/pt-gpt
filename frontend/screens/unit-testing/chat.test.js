// test('Jest set up properly', () => {
//     expect(true).toBe(true);
// });


test("App rendering specification", () => {
    it('App is rendered', () => {
        const component = renderer.create(
            <App/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});