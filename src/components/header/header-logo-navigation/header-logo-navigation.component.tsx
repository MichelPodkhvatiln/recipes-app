import { FC, useState } from 'react'
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import { APP_ROUTES } from '../../../constants/routes'

import { IconButton, Link, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { HeaderLogoNavigationDialogModal } from '../header-logo-navigation-dialog-modal/header-logo-navigation-dialog-modal.component'

interface MatchParams {
  id: string
}

const useStyles = makeStyles((theme) => ({
  logoLink: {
    marginRight: 'auto',
    fontSize: theme.typography.h6.fontSize
  },
  backBtn: {
    marginRight: 'auto'
  }
}))

export const HeaderLogoNavigation: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const createRecipePageRouteMatch = useRouteMatch(APP_ROUTES.RECIPES_ROUTES.CREATE_RECIPE_PAGE())
  const editRecipePageRouteMatch = useRouteMatch<MatchParams>(APP_ROUTES.RECIPES_ROUTES.EDIT_RECIPE_PAGE())

  const isCreateRecipePage = !!createRecipePageRouteMatch
  const isEditRecipePage = !!editRecipePageRouteMatch

  function toggleOpenConfirmModal(): void {
    setOpenModal((prevState) => !prevState)
  }

  function onBackBtnClick(): void {
    toggleOpenConfirmModal()
  }

  function onBackConfirmClick(): void {
    toggleOpenConfirmModal()

    if (isCreateRecipePage) {
      history.push(APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE())
      return
    }

    if (isEditRecipePage) {
      if (!editRecipePageRouteMatch) return

      const { params: { id } } = editRecipePageRouteMatch

      history.push(APP_ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE(id))
    }
  }

  return (
    <>
      {
        isCreateRecipePage || isEditRecipePage ?
          (
            <IconButton
              className={classes.backBtn}
              aria-label='back'
              onClick={onBackBtnClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )
          :
          (
            <Link
              className={classes.logoLink}
              color='inherit'
              component={RouterLink}
              to={APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE()}
            >
              Logo
            </Link>
          )
      }

      <HeaderLogoNavigationDialogModal
        open={openModal}
        onCancel={toggleOpenConfirmModal}
        onConfirm={onBackConfirmClick}
      />
    </>
  )
}
