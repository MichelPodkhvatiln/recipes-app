import { generatePath, Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

import { IconButton, Link, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useState } from 'react'
import HeaderLogoNavigationDialogModal
  from '../header-logo-navigation-dialog-modal/header-logo-navigation-dialog-modal.component'

const useStyles = makeStyles((theme) => ({
  logoLink: {
    marginRight: 'auto',
    fontSize: theme.typography.h6.fontSize
  },
  backBtn: {
    marginRight: 'auto'
  }
}))

const HeaderLogoNavigation = () => {
  const classes = useStyles()
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const createRecipePageRouteMatch = useRouteMatch(ROUTES.RECIPES_ROUTES.CREATE_RECIPE_PAGE)
  const editRecipePageRouteMatch = useRouteMatch(ROUTES.RECIPES_ROUTES.EDIT_RECIPE_PAGE)

  const isCreateRecipePage = !!createRecipePageRouteMatch
  const isEditRecipePage = !!editRecipePageRouteMatch

  function toggleOpenConfirmModal() {
    setOpenModal((prevState) => !prevState)
  }

  function onBackBtnClick() {
    toggleOpenConfirmModal()
  }

  function onBackConfirmClick() {
    toggleOpenConfirmModal()

    if (isCreateRecipePage) {
      history.push(ROUTES.RECIPES_ROUTES.RECIPES_PAGE)
      return
    }

    if (isEditRecipePage) {
      const { params: { id } } = editRecipePageRouteMatch

      history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
    }
  }

  function generateLogoPlacementTemplate() {
    if (isCreateRecipePage || isEditRecipePage) {
      return (
        <IconButton
          className={classes.backBtn}
          aria-label='back'
          onClick={onBackBtnClick}
        >
          <ArrowBackIcon />
        </IconButton>
      )
    }

    return (
      <Link
        className={classes.logoLink}
        color='inherit'
        component={RouterLink}
        to={ROUTES.RECIPES_ROUTES.RECIPES_PAGE}
      >
        Logo
      </Link>
    )
  }

  return (
    <>
      {
        generateLogoPlacementTemplate()
      }

      <HeaderLogoNavigationDialogModal
        open={openModal}
        onCancel={toggleOpenConfirmModal}
        onConfirm={onBackConfirmClick}
      />
    </>
  )
}

export default HeaderLogoNavigation
