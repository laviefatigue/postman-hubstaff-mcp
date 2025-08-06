/**
 * Function to retrieve a user from Hubstaff by user ID.
 *
 * @param {Object} args - Arguments for the user retrieval.
 * @param {string} args.user_id - The ID of the user to retrieve.
 * @returns {Promise<Object>} - The result of the user retrieval.
 */
const executeFunction = async ({ user_id }) => {
  const baseUrl = '{{base_url}}'; // Base URL for the Hubstaff API
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the user ID
    const url = `${baseUrl}/v2/users/${user_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

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
    console.error('Error retrieving user:', error);
    return { error: 'An error occurred while retrieving the user.' };
  }
};

/**
 * Tool configuration for retrieving a user from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_user',
      description: 'Retrieve a user from Hubstaff by user ID.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'The ID of the user to retrieve.'
          }
        },
        required: ['user_id']
      }
    }
  }
};

export { apiTool };