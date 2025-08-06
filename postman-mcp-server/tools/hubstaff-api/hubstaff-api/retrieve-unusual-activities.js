/**
 * Function to retrieve unusual activities for an organization using the Hubstaff API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.organization_id - The ID of the organization to retrieve unusual activities for.
 * @returns {Promise<Array>} - A promise that resolves to an array of unusual activities.
 */
const executeFunction = async ({ organization_id }) => {
  const url = `https://api.example.com/v2/organizations/${organization_id}/insights/unusual_activities`;
  const token = process.env.HUBSTAFF_API_API_KEY;

  try {
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
    console.error('Error retrieving unusual activities:', error);
    return { error: 'An error occurred while retrieving unusual activities.' };
  }
};

/**
 * Tool configuration for retrieving unusual activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_unusual_activities',
      description: 'Retrieve unusual activities for an organization.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization to retrieve unusual activities for.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };