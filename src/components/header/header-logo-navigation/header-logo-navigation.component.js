import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

import { IconButton, Link, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useState } from 'react'
import HeaderLogoNavigationDialogModal
  from './header-logo-navigation-dialog-modal/header-logo-navigation-dialog-modal.component'

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
  const isCreateRecipePage = !!useRouteMatch(ROUTES.CREATE_RECIPE_PAGE)
  const isEditRecipePage = !!useRouteMatch(ROUTES.EDIT_RECIPE_PAGE)

  function toggleOpenConfirmModal() {
    setOpenModal((prevState) => !prevState)
  }

  function onBackBtnClick() {
    toggleOpenConfirmModal()
  }

  function onBackConfirmClick() {
    toggleOpenConfirmModal()

    if (isCreateRecipePage) {
      history.push(ROUTES.RECIPES_PAGE)
      return
    }

    if (isEditRecipePage) {
      //TODO back to recipe by id
      history.goBack()
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
        to={ROUTES.RECIPES_PAGE}
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
