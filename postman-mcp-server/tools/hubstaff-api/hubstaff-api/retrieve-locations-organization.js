/**
 * Function to retrieve locations for a specified organization from the Hubstaff API.
 *
 * @param {Object} args - Arguments for the location retrieval.
 * @param {string} args.organization_id - The ID of the organization to retrieve locations for.
 * @returns {Promise<Array>} - A promise that resolves to an array of locations for the specified organization.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/${organization_id}/locations`;

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
    console.error('Error retrieving locations:', error);
    return { error: 'An error occurred while retrieving locations.' };
  }
};

/**
 * Tool configuration for retrieving locations for an organization from the Hubstaff API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_locations',
      description: 'Retrieve locations for a specified organization from the Hubstaff API.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization to retrieve locations for.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };