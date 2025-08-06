/**
 * Function to retrieve project members from Hubstaff.
 *
 * @param {Object} args - Arguments for retrieving project members.
 * @param {string} args.project_id - The ID of the project.
 * @returns {Promise<Object>} - The result of the project members retrieval.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/projects';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${project_id}/members`;

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
    console.error('Error retrieving project members:', error);
    return { error: 'An error occurred while retrieving project members.' };
  }
};

/**
 * Tool configuration for retrieving project members from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_project_members',
      description: 'Retrieve members of a specific project in Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };