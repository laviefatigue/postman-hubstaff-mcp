/**
 * Function to retrieve organizations from Hubstaff.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.page_start_id - The ID to start retrieving organizations from.
 * @param {number} args.page_limit - The number of organizations to retrieve per page.
 * @returns {Promise<Array>} - The list of organizations retrieved from Hubstaff.
 */
const executeFunction = async ({ page_start_id, page_limit }) => {
  const baseUrl = ''; // will be provided by the user
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/v2/organizations`);
    url.searchParams.append('page_start_id', page_start_id);
    url.searchParams.append('page_limit', page_limit);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving organizations:', error);
    return { error: 'An error occurred while retrieving organizations.' };
  }
};

/**
 * Tool configuration for retrieving organizations from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_organizations',
      description: 'Retrieve organizations from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          page_start_id: {
            type: 'string',
            description: 'The ID to start retrieving organizations from.'
          },
          page_limit: {
            type: 'integer',
            description: 'The number of organizations to retrieve per page.'
          }
        },
        required: ['page_start_id', 'page_limit']
      }
    }
  }
};

export { apiTool };