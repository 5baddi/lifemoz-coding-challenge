import SecureLS from 'secure-ls'

let ls = new SecureLS()

/**
 * Return if user is logged in
 */
export const isUserLoggedIn = () => {
  return typeof ls.get('user') !== 'undefined' && ls.get('user') !== '' && typeof ls.get('token') !== 'undefined' && ls.get('token') !== ''
}

/**
 * Return authenticated user
 */
export const getUser = () => {
  if(isUserLoggedIn()){
    return ls.get('user')
  }

  return null
}