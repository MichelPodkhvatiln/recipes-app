import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { IconButton, ListItem, makeStyles, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { selectActionRecipeProcess } from '../../../../redux/recipes/recipes.selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: theme.spacing(0, 7, 0, 0)
  },
  nameTxtInput: {
    marginRight: theme.spacing(1)
  },
  amountTxtInput: {
    maxWidth: 110
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 0
  }
}))

const RecipeIngredientsFormListItem = ({ index, control, onRemove }) => {
  const classes = useStyles()
  const isActionRecipeProcess = useSelector(selectActionRecipeProcess)

  return (
    <ListItem className={classes.root}>
      <Controller
        render={({ field, fieldState }) => (
          <>
            <TextField
              className={classes.nameTxtInput}
              label='Name'
              type='text'
              variant='outlined'
              margin='dense'
              fullWidth
              error={!!fieldState.error}
              helperText={!!fieldState.error && fieldState.error.message}
              disabled={isActionRecipeProcess}
              {...field}
            />
          </>
        )}
        name={`ingredients.${index}.name`}
        control={control}
        defaultValue=''
      />
      <Controller
        render={({ field, fieldState }) => (
          <>
            <TextField
              className={classes.amountTxtInput}
              label='Amount'
              type='number'
              variant='outlined'
              margin='dense'
              fullWidth
              error={!!fieldState.error}
              helperText={!!fieldState.error && fieldState.error.message}
              disabled={isActionRecipeProcess}
              {...field}
            />
          </>
        )}
        name={`ingredients.${index}.amount`}
        control={control}
        defaultValue={0}
      />

      <IconButton
        className={classes.removeBtn}
        color='secondary'
        aria-label='delete'
        onClick={() => onRemove(index)}
        disabled={isActionRecipeProcess}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

RecipeIngredientsFormListItem.propTypes = {
  index: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default RecipeIngredientsFormListItem
