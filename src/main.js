import './style.css'
import { loginServer } from './login.js'
import { fetchProtectedData } from './protected.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello There!</h1>
    <div class="form-vertical">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <button id="login-button">Login</button>
    </div>

    <hr style="margin: 20px 0;">

    <h1>Protected Area</h1>
    <button id="check-button" type="button">Check Auth</button>
  </div>
`

loginServer(document.querySelector('#login-button'))
fetchProtectedData(document.querySelector('#check-button'))
