/**
 * Function to retrieve daily URL activities for a specified organization from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.organization_id - The ID of the organization to retrieve URL activities for.
 * @returns {Promise<Array>} - The daily URL activities for the specified organization.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com'; // Base URL for Hubstaff API
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/v2/organizations/${organization_id}/url_activities/daily`;

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
    console.error('Error retrieving daily URL activities:', error);
    return { error: 'An error occurred while retrieving daily URL activities.' };
  }
};

/**
 * Tool configuration for retrieving daily URL activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_daily_url_activities',
      description: 'Retrieve daily URL activities for a specified organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization to retrieve URL activities for.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };