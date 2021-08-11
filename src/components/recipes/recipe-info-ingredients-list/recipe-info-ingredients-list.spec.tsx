import {render, screen} from "@testing-library/react";
import {RecipeInfoIngredientsList} from "./recipe-info-ingredients-list.component";
import {IRecipeIngredients} from "../../../interfaces";

describe('Recipe Info Infredients List Component', () => {
    it('should render with empty ingredients list', () => {
       render(<RecipeInfoIngredientsList ingredients={[]}/>)

        const list = screen.getByRole('list')
        const listItems = screen.queryAllByRole('listitem')

        expect(list).toBeInTheDocument()
        expect(listItems).toHaveLength(0)
    })

    it('should render with filled ingredients list by 5 items', () => {
        const ingredients: IRecipeIngredients[] = [
            {name: 'test1', amount: 1},
            {name: 'test2', amount: 2},
            {name: 'test3', amount: 3},
            {name: 'test4', amount: 4},
            {name: 'test5', amount: 5},
        ]

        render(<RecipeInfoIngredientsList ingredients={ingredients}/>)

        const list = screen.getByRole('list')
        const listItems = screen.queryAllByRole('listitem')

        expect(list).toBeInTheDocument()
        expect(listItems).toHaveLength(5)
    })
})