import {render, screen} from "@testing-library/react";
import {RecipeInfoImagePreview} from "./recipe-info-image-preview.component";
import {SMALL_IMAGE_PLACEHOLDER} from "../../../constants/placeholders";

describe('Recipe Info Image Preview Component', () => {
    it('should render with default image', () => {
        render(<RecipeInfoImagePreview imageUrl=''/>)

        const image = screen.getByRole('img', {
            name: /recipe preview card image/i
        })

        expect(image).toHaveAttribute('src', SMALL_IMAGE_PLACEHOLDER)
    });

    it('should render with custom image', () => {
        const IMAGE_URL = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

        render(<RecipeInfoImagePreview imageUrl={IMAGE_URL}/>)

        const image = screen.getByRole('img', {
            name: /recipe preview card image/i
        })

        expect(image).toHaveAttribute('src', IMAGE_URL)
    });
})