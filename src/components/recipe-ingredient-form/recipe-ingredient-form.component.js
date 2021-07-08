import { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import DeleteIcon from '@material-ui/icons/Delete'
import { Button, IconButton, List, ListItem, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
  textInputsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    [theme.breakpoints.down(350)]: {
      width: '75%',
      flexDirection: 'column'
    }
  },
  nameTextInput: {
    width: '60%',
    [theme.breakpoints.down(350)]: {
      width: '100%'
    }
  },
  amountTextInput: {
    width: '30%',
    [theme.breakpoints.down(350)]: {
      width: '100%'
    }
  }
}))

const nameCheckSchema = yup.string().required('Name is a required field')
const amountCheckSchema = yup.number()
  .typeError('Amount must be a number')
  .positive('Amount must be a positive number')
  .integer()
  .required('Amount is a required field')

const RecipeIngredientForm = (props) => {
  const {
    ingredientsList,
    addNewIngredient,
    removeIngredient,
    updateIngredientValues,
    validateIngredientValues
  } = props

  const classes = useStyles()

  const onChangeField = useCallback(({ target: { name, value } }, ingredientId) => {
    let validationSchema = name === 'name' ? nameCheckSchema : amountCheckSchema

    validationSchema.validate(value).then(() => {
      updateIngredientValues({ name, value, ingredientId })
      validateIngredientValues({ name, value: true, message: '', ingredientId })
    }).catch((err) => {
      updateIngredientValues({ name, value: err.value, ingredientId })
      validateIngredientValues({ name, value: false, message: err.errors[0], ingredientId })
    })
  }, [updateIngredientValues, validateIngredientValues])

  return (
    <div className={classes.root}>
      <List>
        {
          !!ingredientsList.length &&
          ingredientsList.map((listItem) => (
            <ListItem key={listItem.id} className={classes.listItem}>
              <div className={classes.textInputsWrap}>
                <TextField
                  className={classes.nameTextInput}
                  label='Name'
                  type='text'
                  name='name'
                  value={listItem.values.name}
                  onChange={(e) => onChangeField(e, listItem.id)}
                  error={!listItem.errors.name.isValid}
                  helperText={listItem.errors.name.message}
                />
                <TextField
                  className={classes.amountTextInput}
                  label='Amount'
                  type='number'
                  name='amount'
                  value={listItem.values.amount}
                  onChange={(e) => onChangeField(e, listItem.id)}
                  error={!listItem.errors.amount.isValid}
                  helperText={listItem.errors.amount.message}
                />
              </div>

              <IconButton
                color='secondary'
                onClick={() => removeIngredient(listItem.id)}
                aria-label='delete'
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        }
      </List>
      <Button
        type='button'
        variant='outlined'
        fullWidth
        onClick={addNewIngredient}
      >
        Add ingredient
      </Button>
    </div>
  )
}

RecipeIngredientForm.protTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  })),
  addNewIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  updateIngredientValues: PropTypes.func.isRequired,
  validateIngredientValues: PropTypes.func.isRequired
}

export default RecipeIngredientForm
