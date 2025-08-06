/**
 * Function to retrieve time off requests for a specific organization from the Hubstaff API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.organization_id - The ID of the organization for which to retrieve time off requests.
 * @returns {Promise<Array>} - A promise that resolves to an array of time off requests.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/v2/organizations/${organization_id}/time_off_requests`;

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
    console.error('Error retrieving time off requests:', error);
    return { error: 'An error occurred while retrieving time off requests.' };
  }
};

/**
 * Tool configuration for retrieving time off requests from the Hubstaff API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_time_off_requests',
      description: 'Retrieve time off requests for a specific organization.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization for which to retrieve time off requests.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };