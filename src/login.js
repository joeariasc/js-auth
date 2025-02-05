export function loginServer(element) {
	const username = document.querySelector('#username')
	const password = document.querySelector('#password')
	const apiServerUrl = import.meta.env.VITE_API_URL
	console.log('API Server URL:', apiServerUrl)
	element.addEventListener('click', (event) => {
		event.preventDefault()
		if (username.value === '' || password.value === '') {
			alert('Please enter a username and password')
			return
		}

		async function fetchData() {
			// Constructing the clientData object
			const clientData = {
				clientType: "web",
				screenResolution: `${window.screen.width}x${window.screen.height}`,
				colorDepth: `${window.screen.colorDepth}`,
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				language: navigator.language
			};
			try {
				const response = await fetch(apiServerUrl + "/api/auth/login", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: username.value,
						password: password.value,
						clientData: clientData
					})
				})

				if (!response.ok) {
					console.log("error", {
						status: response.status,
						statusText: response.statusText
					})
				}

				const textResponse = await response.text();
				console.log('Raw Response:', textResponse);
				// Handle the response data here
			} catch (error) {
				console.error('There has been a problem with your fetch operation:', error)
			}
		}

		fetchData()
	})
}
