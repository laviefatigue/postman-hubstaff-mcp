/**
 * Function to retrieve projects for a specific organization from Hubstaff.
 *
 * @param {Object} args - Arguments for the project retrieval.
 * @param {string} args.organization_id - The ID of the organization whose projects are to be retrieved.
 * @returns {Promise<Object>} - The response containing the projects for the specified organization.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/${organization_id}/projects`;

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
    console.error('Error retrieving projects:', error);
    return { error: 'An error occurred while retrieving projects.' };
  }
};

/**
 * Tool configuration for retrieving projects from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_projects',
      description: 'Retrieve projects for a specific organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization whose projects are to be retrieved.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };