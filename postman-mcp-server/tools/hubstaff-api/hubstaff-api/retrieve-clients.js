/**
 * Function to retrieve a list of clients for a given organization from Hubstaff.
 *
 * @param {Object} args - Arguments for the client retrieval.
 * @param {string} args.organization_id - The organization ID for which to retrieve clients.
 * @returns {Promise<Object>} - The result of the client retrieval.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/${organization_id}/clients`;

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
    console.error('Error retrieving clients:', error);
    return { error: 'An error occurred while retrieving clients.' };
  }
};

/**
 * Tool configuration for retrieving clients from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_clients',
      description: 'Retrieve a list of clients for a given organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The organization ID for which to retrieve clients.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };