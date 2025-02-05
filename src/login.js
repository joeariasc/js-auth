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
				const response = await fetch('https://go-auth-qvic.onrender.com/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: username.value,
						password: password.value,
						clientData:{
							screenResolution: window.screen.width + "x" + window.screen.height,
							colorDepth: window.screen.colorDepth,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							language: navigator.language
						}
					})
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				console.log(data)
				// Handle the response data here
			} catch (error) {
				console.error('There has been a problem with your fetch operation:', error)
			}
		}

		fetchData()
	})
}
