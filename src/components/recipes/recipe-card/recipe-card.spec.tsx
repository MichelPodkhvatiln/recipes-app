import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import {nanoid} from "@reduxjs/toolkit";
import {RecipeCard} from "./recipe-card.component";
import {SMALL_IMAGE_PLACEHOLDER} from "../../../constants/placeholders";
import {IRecipeData} from "../../../interfaces";

describe('Recipe Card Component', () => {
    const RECIPE_ID = nanoid()
    const RECIPE_NAME = 'Testing card name'
    const RECIPE_DESCRIPTION = 'Testing card description'
    const RECIPE_IMAGE_SRC = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    const onClickMock = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render card with custom image', () => {
        const recipeInfoFixture: IRecipeData = {
            id: '',
            author: '',
            name: RECIPE_NAME,
            description: RECIPE_DESCRIPTION,
            imageUrl: RECIPE_IMAGE_SRC,
            ingredients: []
        }

        render(<RecipeCard recipeInfo={recipeInfoFixture} onClick={onClickMock}/>)

        const cardImage = screen.getByRole('img', {
            name: /recipe card image/i
        })
        const cardName = screen.getByText(RECIPE_NAME)
        const cardDescription = screen.getByText(RECIPE_DESCRIPTION)

        expect(cardImage).toHaveAttribute('src', RECIPE_IMAGE_SRC)
        expect(cardName).toBeInTheDocument()
        expect(cardDescription).toBeInTheDocument()
    });

    it('should render card with default image', () => {
        const recipeInfoFixture: IRecipeData = {
            id: '',
            author: '',
            name: RECIPE_NAME,
            description: RECIPE_DESCRIPTION,
            imageUrl: '',
            ingredients: []
        }

        render(<RecipeCard recipeInfo={recipeInfoFixture} onClick={onClickMock}/>)

        const cardImage = screen.getByRole('img', {
            name: /recipe card image/i
        })
        const cardName = screen.getByText(RECIPE_NAME)
        const cardDescription = screen.getByText(RECIPE_DESCRIPTION)

        expect(cardImage).toHaveAttribute('src', SMALL_IMAGE_PLACEHOLDER)
        expect(cardName).toBeInTheDocument()
        expect(cardDescription).toBeInTheDocument()
    });

    it('should call onClick handler if user click on card', () => {
        const recipeInfoFixture: IRecipeData = {
            id: RECIPE_ID,
            author: '',
            name: '',
            description: '',
            imageUrl: '',
            ingredients: []
        }

        render(<RecipeCard recipeInfo={recipeInfoFixture} onClick={onClickMock}/>)

        const cardActionAreaButton = screen.getByRole('button', {
            name: /recipe card/i
        })

        userEvent.click(cardActionAreaButton)

        expect(onClickMock).toHaveBeenCalledWith(RECIPE_ID)
    });
});