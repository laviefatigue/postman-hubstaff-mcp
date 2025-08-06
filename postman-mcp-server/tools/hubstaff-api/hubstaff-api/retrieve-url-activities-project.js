/**
 * Function to retrieve URL activities for a specific project from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project to retrieve URL activities for.
 * @returns {Promise<Array>} - The list of URL activities for the specified project.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.hubstaff.com';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the project ID
    const url = `${baseUrl}/v2/projects/${project_id}/url_activities`;

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
    console.error('Error retrieving URL activities:', error);
    return { error: 'An error occurred while retrieving URL activities.' };
  }
};

/**
 * Tool configuration for retrieving URL activities for a project from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_url_activities',
      description: 'Retrieve URL activities for a specific project from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to retrieve URL activities for.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };