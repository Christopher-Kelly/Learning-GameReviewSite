import {FirstPage} from '../src/pages/FirstPage';
import {render} from "@testing-library/react";
import {act} from "react";

jest.mock('react-player');

it('renders without crashing', () => {
    render(<FirstPage />);
})

it('Should have the title First Page', () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
        render(<FirstPage />);
        expect(document.title).toEqual("firstPage");
});

