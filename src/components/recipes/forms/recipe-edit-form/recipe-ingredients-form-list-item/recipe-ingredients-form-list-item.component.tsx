import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { IconButton, ListItem, makeStyles, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

interface IRecipeIngredientsFormListItemProps {
  index: number,
  control: Control,
  disabled: boolean,
  onRemove: (fieldIndex: number) => void
}

type IFormIngredientsField = `${string}`

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

export const RecipeIngredientsFormListItem:
  FC<IRecipeIngredientsFormListItemProps> = (props) => {
  const { index, control, disabled, onRemove } = props

  const classes = useStyles()

  const formIngredientsNameValue = `ingredients.${index}.name` as IFormIngredientsField
  const formIngredientsAmountValue = `ingredients.${index}.amount` as IFormIngredientsField

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
              disabled={disabled}
              {...field}
            />
          </>
        )}
        name={formIngredientsNameValue}
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
              disabled={disabled}
              {...field}
            />
          </>
        )}
        name={formIngredientsAmountValue}
        control={control}
        defaultValue={0}
      />

      <IconButton
        className={classes.removeBtn}
        color='secondary'
        aria-label='delete'
        onClick={() => onRemove(index)}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
