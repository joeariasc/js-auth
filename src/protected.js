import { apiServerUrl, fingerprint } from './config.js'

export function fetchProtectedData(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()

        async function fetchData() {
            try {
                const response = await fetch(apiServerUrl + "/api/auth/verify", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        'X-Fingerprint': fingerprint
                    }
                })

                if (!response.ok) {
                    console.log("error", {
                        status: response.status,
                        statusText: response.statusText
                    })

                    alert('The operation failed. Please check the console for more information.')
                    return
                }

                const textResponse = await response.text();
                console.log('Protected Area Raw Response:', textResponse);

                alert('Authenticated & Authorized!');
                return;

                // Handle the response data here
            } catch (error) {
                alert('There has been a problem with your fetch operation:')
                console.error('There has been a problem with your fetch operation:', error)
            }
        }

        fetchData()
    });
}