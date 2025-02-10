import { apiServerUrl, fingerprint } from './config.js'

export function loginServer(element) {
	const username = document.querySelector('#username')
	const password = document.querySelector('#password')

	element.addEventListener('click', (event) => {
		event.preventDefault()

		if (username.value === '' || password.value === '') {
			alert('Please enter a username and password')
			return
		}

		async function fetchData() {
			try {
				const response = await fetch(apiServerUrl + "/api/auth/login", {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'X-Client-Type': 'web',
						'X-Fingerprint': fingerprint
					},
					body: JSON.stringify({
						username: username.value,
						password: password.value
					})
				})

				if (!response.ok) {
					console.log("error", {
						status: response.status,
						statusText: response.statusText
					})
					return;
				}

				const textResponse = await response.text();
				console.log('Login Raw Response:', textResponse);

				alert('Login Succesful!');
				return;

				// Handle the response data here
			} catch (error) {
				console.error('There has been a problem with your fetch operation:', error)
			}
		}

		fetchData()
	})
}
