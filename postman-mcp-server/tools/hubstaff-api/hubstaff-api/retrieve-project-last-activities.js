/**
 * Function to retrieve the last activities of a project from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project.
 * @param {string} [args.page_start_id] - The page start ID for pagination.
 * @param {number} [args.page_limit] - The number of results per page.
 * @param {boolean} [args.include_removed] - Whether to include removed users.
 * @param {string} [args.include] - Specify related data to side load.
 * @returns {Promise<Object>} - The response from the Hubstaff API.
 */
const executeFunction = async ({ project_id, page_start_id, page_limit, include_removed, include }) => {
  const url = `https://api.hubstaff.com/v2/projects/${project_id}/last_activities`;
  const token = process.env.HUBSTAFF_API_API_KEY;

  try {
    // Construct the URL with query parameters if they are provided
    const params = new URLSearchParams();
    if (page_start_id) params.append('page_start_id', page_start_id);
    if (page_limit) params.append('page_limit', page_limit);
    if (include_removed) params.append('include_removed', include_removed);
    if (include) params.append('include', include);
    
    const finalUrl = `${url}?${params.toString()}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(finalUrl, {
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
    console.error('Error retrieving project last activities:', error);
    return { error: 'An error occurred while retrieving project last activities.' };
  }
};

/**
 * Tool configuration for retrieving project last activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_project_last_activities',
      description: 'Retrieve the last activities of a project from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project.'
          },
          page_start_id: {
            type: 'string',
            description: 'The page start ID for pagination.'
          },
          page_limit: {
            type: 'integer',
            description: 'The number of results per page.'
          },
          include_removed: {
            type: 'boolean',
            description: 'Whether to include removed users.'
          },
          include: {
            type: 'string',
            description: 'Specify related data to side load.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };