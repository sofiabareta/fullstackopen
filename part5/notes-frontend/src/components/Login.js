const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <fieldset>
          <label>username</label>
          <input type="text"/>
        </fieldset>
        <fieldset>
          <label>password</label>
          <input type="text" />
        </fieldset>
        <button>login</button>
      </form>
    </div>
  )
}

export default Login