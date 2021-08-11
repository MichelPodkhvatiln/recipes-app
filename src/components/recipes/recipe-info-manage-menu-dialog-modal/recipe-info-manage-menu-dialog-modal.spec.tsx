import {render, screen} from "@testing-library/react";
import {RecipeInfoManageMenuDialogModal} from "./recipe-info-manage-menu-dialog-modal.component";
import userEvent from "@testing-library/user-event";

describe('Recipe Info Manage Menu Dialog Modal Component', () => {
    const onCancelMock = jest.fn()
    const onConfirmMock = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Tests with hidden modal', () => {
        beforeEach(() => {
            const open = false

            render(
                <RecipeInfoManageMenuDialogModal
                    open={open}
                    onCancel={onCancelMock}
                    onConfirm={onConfirmMock}/>
            )
        })

        it('should not render modal', () => {
            const modal = screen.queryByRole('presentation')

            expect(modal).toBeNull()
        })
    })

    describe('Tests with open modal', () => {
        beforeEach(() => {
            const open = true

            render(
                <RecipeInfoManageMenuDialogModal
                    open={open}
                    onCancel={onCancelMock}
                    onConfirm={onConfirmMock}/>
            )
        })

        it('should render modal', () => {
            const modal = screen.getByRole('presentation')

            expect(modal).toBeInTheDocument()
        })

        it('should call onCancel if user click on cancel button', () => {
            const cancelBtn = screen.getByRole('button', {
                name: /cancel/i
            })

            userEvent.click(cancelBtn)

            expect(onCancelMock).toBeCalledTimes(1)
        })

        it('should call onConfirm if user click on remove button', () => {
            const removeBtn = screen.getByRole('button', {
                name: /remove/i
            })

            userEvent.click(removeBtn)

            expect(onConfirmMock).toBeCalledTimes(1)
        })
    })
})