/**
 * Function to retrieve a client from Hubstaff by client ID.
 *
 * @param {Object} args - Arguments for the client retrieval.
 * @param {string} args.client_id - The ID of the client to retrieve.
 * @returns {Promise<Object>} - The result of the client retrieval.
 */
const executeFunction = async ({ client_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/clients';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${client_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving client:', error);
    return { error: 'An error occurred while retrieving the client.' };
  }
};

/**
 * Tool configuration for retrieving a client from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_client',
      description: 'Retrieve a client from Hubstaff by client ID.',
      parameters: {
        type: 'object',
        properties: {
          client_id: {
            type: 'string',
            description: 'The ID of the client to retrieve.'
          }
        },
        required: ['client_id']
      }
    }
  }
};

export { apiTool };