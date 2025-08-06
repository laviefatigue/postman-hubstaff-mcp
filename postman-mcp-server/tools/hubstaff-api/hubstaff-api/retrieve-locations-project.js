/**
 * Function to retrieve locations for a specific project from the Hubstaff API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project to retrieve locations for.
 * @returns {Promise<Array>} - A promise that resolves to an array of locations for the specified project.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.hubstaff.com';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the project ID
    const url = `${baseUrl}/v2/projects/${project_id}/locations`;

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
 * Tool configuration for retrieving project locations from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_project_locations',
      description: 'Retrieve locations for a specific project from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to retrieve locations for.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };