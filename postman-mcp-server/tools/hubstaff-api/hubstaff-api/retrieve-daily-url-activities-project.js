/**
 * Function to retrieve daily URL activities for a specific project from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project for which to retrieve URL activities.
 * @returns {Promise<Object>} - The result of the URL activities retrieval.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/projects';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${project_id}/url_activities/daily`;

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
      description: 'Retrieve daily URL activities for a specific project from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project for which to retrieve URL activities.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };