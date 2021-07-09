import PropTypes from 'prop-types'

export const REACT_HOOK_FORM_CONTROLLER_PROPS = {
  field: PropTypes.shape({
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    ref: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ])
  }),
  fieldState: PropTypes.shape({
    invalid: PropTypes.bool,
    isTouched: PropTypes.bool,
    isDirty: PropTypes.bool,
    error: PropTypes.object
  }),
  formState: PropTypes.shape({
    isSubmitSuccessful: PropTypes.bool,
    isDirty: PropTypes.bool,
    isSubmitted: PropTypes.bool,
    dirtyFields: PropTypes.object,
    touchedFields: PropTypes.object,
    isSubmitting: PropTypes.bool,
    submitCount: PropTypes.number,
    isValid: PropTypes.bool,
    isValidating: PropTypes.bool
  }),
}
