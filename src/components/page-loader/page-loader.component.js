import { CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  loader: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
}))

const PageLoader = () => {
  const classes = useStyles()

  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  )
}

export default PageLoader
